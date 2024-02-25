import OrderRepository from '../repositories/OrderRepository';

export default class ConfirmOrder {
  constructor(private orderRepository: OrderRepository) {}

  async execute(input: Input): Promise<void> {
    const order = await this.orderRepository.findById(input.orderId);
    if (order.status === 'approved') {
      order.confirm();
      await this.orderRepository.update(order);
    }
  }
}

type Input = {
  orderId: string;
  status: string;
};
