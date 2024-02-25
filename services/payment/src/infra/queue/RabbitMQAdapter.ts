import * as amqp from 'amqplib';
import Queue from './Queue';

export default class RabbitMQAdapter implements Queue {
  private _connection!: amqp.Connection;
  private _channel!: amqp.Channel;
  private _url = process.env.RABBITMQ_URL || 'amqp://localhost';

  async connect(): Promise<void> {
    this._connection = await amqp.connect(this._url);
    this._channel = await this._connection.createChannel();
  }

  async publish(queueName: string, data: any): Promise<void> {
    this._channel.assertQueue(queueName, { durable: true });
    this._channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
  }

  async consumer(queueName: string, callback: Function): Promise<void> {
    await this._channel.assertQueue(queueName, { durable: true });
    this._channel.consume(queueName, async (message) => {
      if (message) {
        callback(JSON.parse(message.content.toString()));
        this._channel.ack(message);
      }
    });
  }
}
