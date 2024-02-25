import Checkout from '../src/application/use-cases/Checkout';
import GetOrderById from '../src/application/use-cases/GetOrderById';
import PaymentGatewayHttp from '../src/infra/gateways/PaymentGatewayHttp';
import RabbitMQAdapter from '../src/infra/queue/RabbitMQAdapter';
import CourseRepositoryInMemory from '../src/infra/repositories/CourseRepositoryInMemory';
import OrderRepositoryInMemory from '../src/infra/repositories/OrderRepositoryInMemory';

test('Deve fazer um checkout', async function () {
  const orderRepository = new OrderRepositoryInMemory();
  const courseRepository = new CourseRepositoryInMemory();
  const paymentGateway = new PaymentGatewayHttp();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const checkout = new Checkout(
    orderRepository,
    courseRepository,
    paymentGateway,
    queue
  );
  const input = {
    courseId: '83e88f3a-49a5-43e0-a07a-8dd9e64c0915',
    name: 'John Doe',
    email: 'example@example.com',
    creditCardToken: 'token_123456',
  };
  const outputCheckout = await checkout.execute(input);

  expect(outputCheckout.orderId).toBeDefined();

  const getOrderById = new GetOrderById(orderRepository);
  const outputGetOrder = await getOrderById.execute(outputCheckout.orderId);

  expect(outputGetOrder.orderId).toBeDefined();
  expect(outputGetOrder.name).toBe(input.name);
  expect(outputGetOrder.email).toBe(input.email);
  expect(outputGetOrder.amount).toBe(1199);
  // expect(outputGetOrder.status).toBe('confirmed');
});
