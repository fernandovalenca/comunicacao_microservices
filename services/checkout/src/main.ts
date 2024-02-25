import ConfirmOrder from './application/use-cases/ConfirmOrder';
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter';
import OrderRepositoryInMemory from './infra/repositories/OrderRepositoryInMemory';

async function main() {
  const orderRepository = new OrderRepositoryInMemory();
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const confirmOrder = new ConfirmOrder(orderRepository);

  queue.consumer('payment_processed', async function (input: any) {
    await confirmOrder.execute(input);
  });
}

main();
