export default interface Queue {
  connect(): Promise<void>;
  consumer(queueName: string, callback: Function): Promise<void>;
  publish(queueName: string, data: any): Promise<void>;
}
