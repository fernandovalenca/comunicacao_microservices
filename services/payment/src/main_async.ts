import ProcessPayment from './application/use-cases/ProcessPayment';
import RabbitMQAdapter from './infra/queue/RabbitMQAdapter';

async function main() {
  const queue = new RabbitMQAdapter();
  await queue.connect();
  const processPayment = new ProcessPayment(queue);

  queue.consumer("order_placed", async (input: any) => {
    await processPayment.execute(input)
  });
}

main();
