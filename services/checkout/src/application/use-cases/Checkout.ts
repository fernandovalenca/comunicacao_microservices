import Order from '../../domain/entities/Order';
import Queue from '../../infra/queue/Queue';
import PaymentGateway from '../gateways/PaymentGateway';
import CourseRepository from '../repositories/CourseRepository';
import OrderRepository from '../repositories/OrderRepository';

export default class Checkout {
  constructor(
    private orderRepository: OrderRepository,
    private courseRepository: CourseRepository,
    private paymentGateway: PaymentGateway,
    private queue: Queue
  ) {}

  async execute(input: Input): Promise<Output> {
    const course = await this.courseRepository.findById(input.courseId);
    const order = Order.create(
      input.courseId,
      input.name,
      input.email,
      course.amount
    );
    await this.orderRepository.save(order);

    // Start synchronous communication with the payment gateway
    const inputProcessPayment = {
      orderId: order.orderId,
      amount: order.amount,
      creditCardToken: input.creditCardToken,
    };
    const outputProcessPayment = await this.paymentGateway.processPayment(
      inputProcessPayment
    );
    if (outputProcessPayment.status === 'approved') {
      order.confirm();
      await this.orderRepository.update(order);
    }
    // End synchronous communication with the payment gateway

    // Start asynchronous communication with the queue
    const inputOrderPlaced = {
      orderId: order.orderId,
      amount: order.amount,
      creditCardToken: input.creditCardToken,
    };
    await this.queue.publish('order_placed', inputOrderPlaced);
    // End asynchronous communication with the queue

    return { orderId: order.orderId };
  }
}

type Input = {
  courseId: string;
  name: string;
  email: string;
  creditCardToken: string;
};

type Output = {
  orderId: string;
};
