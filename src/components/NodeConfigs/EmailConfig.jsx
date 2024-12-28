import React from 'react';
import { Form, Input } from 'antd';

const EmailConfig = ({ properties, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...properties,
      [field]: value
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="To">
        <Input 
          value={properties.to} 
          onChange={e => handleChange('to', e.target.value)}
          placeholder="recipient@example.com"
        />
      </Form.Item>
      <Form.Item label="Subject">
        <Input 
          value={properties.subject} 
          onChange={e => handleChange('subject', e.target.value)}
          placeholder="Email subject"
        />
      </Form.Item>
      <Form.Item label="Message">
        <Input.TextArea 
          value={properties.message} 
          onChange={e => handleChange('message', e.target.value)}
          placeholder="Email content"
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default EmailConfig; 