import axios from 'axios';
import PaymentGateway, {
  Input,
  Output,
} from '../../application/gateways/PaymentGateway';

export default class PaymentGatewayHttp implements PaymentGateway {
  constructor() {}

  async processPayment(input: Input): Promise<Output> {
    const response = await axios.post<Output>(
      'http://localhost:3001/process_payment',
      input
    );

    return response.data;
  }
}
