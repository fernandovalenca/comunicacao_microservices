import OrderRepository from '../../application/repositories/OrderRepository';
import Order from '../../domain/entities/Order';

export default class OrderRepositoryInMemory implements OrderRepository {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async update(order: Order): Promise<void> {
    this.orders = this.orders.map((o) => {
      if (o.orderId === order.orderId) {
        return order;
      }
      return o;
    });
  }

  async findById(orderId: string): Promise<Order> {
    const order = this.orders.find((order) => order.orderId === orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return new Order(
      order.courseId,
      order.courseId,
      order.name,
      order.email,
      order.amount,
      order.status
    );
  }
}
