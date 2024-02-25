import Queue from '@/infra/queue/Queue';

export default class ProcessPayment {
  constructor(private queue: Queue) {}

  async execute(input: Input): Promise<void> {
    const inputPaymentProcessed = {
      orderId: input.orderId,
      status: 'approved',
    };
    this.queue.publish('payment_processed', inputPaymentProcessed);
  }
}

export type Input = {
  orderId: string;
  amount: number;
  creditCardToken: string;
};
