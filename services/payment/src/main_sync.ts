import express from 'express';

const app = express();
app.use(express.json());

app.post('/process_payment', async (request, response) => {
  console.log('Processing payment', request.body);

  return response
    .status(200)
    .json({ status: 'approved', orderId: request.body.orderId });
});

app.listen(3001, () => console.log('Server is running')); 
