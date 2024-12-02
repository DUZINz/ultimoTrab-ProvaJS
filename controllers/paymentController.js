const Payment = require('../models/payment');

const processCreditCardPayment = async (req, res) => {
  try {
    const { userId, valorTotal } = req.body;
    const payment = await Payment.create({
      userId: userId,
      valorTotal: valorTotal,
      metodoPagamento: 'cartão de crédito'
    });
    // Simula a lógica de processamento de pagamento
    payment.status = 'concluído';
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const processPixPayment = async (req, res) => {
  try {
    const { userId, valorTotal } = req.body;
    const payment = await Payment.create({
      userId: userId,
      valorTotal: valorTotal,
      metodoPagamento: 'PIX'
    });
    // Simula a lógica de processamento de pagamento
    payment.status = 'concluído';
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactionStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const payment = await Payment.findByPk(transactionId);
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  processCreditCardPayment,
  processPixPayment,
  getTransactionStatus
};
