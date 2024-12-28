import React from 'react';
import { Form, Input, InputNumber } from 'antd';

const RuleConfig = ({ properties, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...properties,
      [field]: value
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Wait Duration (hours)">
        <InputNumber
          min={0}
          value={properties.waitDuration}
          onChange={value => handleChange('waitDuration', value)}
          placeholder="Enter wait duration"
        />
      </Form.Item>
      <Form.Item label="Condition">
        <Input.TextArea
          value={properties.condition}
          onChange={e => handleChange('condition', e.target.value)}
          placeholder="Enter condition logic"
          rows={4}
        />
      </Form.Item>
    </Form>
  );
};

export default RuleConfig; 