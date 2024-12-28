import React from 'react';
import { Form, Input } from 'antd';

const SMSConfig = ({ properties, onChange }) => {
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
          placeholder="+1234567890"
        />
      </Form.Item>
      <Form.Item label="Message">
        <Input.TextArea 
          value={properties.message} 
          onChange={e => handleChange('message', e.target.value)}
          placeholder="SMS content"
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default SMSConfig; 