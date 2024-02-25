import Order from '../../domain/entities/Order';

export default interface OrderRepository {
  save: (order: Order) => Promise<void>;
  update: (order: Order) => Promise<void>;
  findById: (id: string) => Promise<Order>;
}
