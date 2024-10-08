import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';

const Transaction = ({ wallet }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // In a real application, you would sign the transaction here using the wallet
      // For this example, we'll just send a dummy signature
      const dummySignature = Buffer.from('dummy_signature').toString('base64');

      const response = await fetch('http://localhost:3001/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromPubkey: wallet.publicKey.toString(),
          toPubkey: values.recipient,
          amount: parseFloat(values.amount),
          signature: dummySignature,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(`Transaction sent! TxID: ${data.txid}`);
        form.resetFields();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      message.error(`Transaction failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="recipient"
        label="Recipient Address"
        rules={[{ required: true, message: 'Please input the recipient address!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="amount"
        label="Amount (SOL)"
        rules={[{ required: true, message: 'Please input the amount!' }]}
      >
        <Input type="number" step="0.000000001" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Send Transaction
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Transaction;