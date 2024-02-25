import crypto from 'crypto';

export default class Order {
  constructor(
    readonly orderId: string,
    readonly courseId: string,
    readonly name: string,
    readonly email: string,
    readonly amount: number,
    private _status: string
  ) {}

  get status() {
    return this._status;
  }

  confirm() {
    this._status = 'confirmed';
  }

  static create(courseId: string, name: string, email: string, amount: number) {
    const orderId = crypto.randomUUID();
    const status = 'waiting_payment';
    return new Order(orderId, courseId, name, email, amount, status);
  }
}
