import React from 'react';
import { Form, Input, Select } from 'antd';

const AIAgentConfig = ({ properties, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...properties,
      [field]: value
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Model">
        <Select
          value={properties.model}
          onChange={value => handleChange('model', value)}
          options={[
            { value: 'gpt-4', label: 'GPT-4' },
            { value: 'gpt-3.5', label: 'GPT-3.5' },
            { value: 'claude', label: 'Claude' }
          ]}
        />
      </Form.Item>
      <Form.Item label="Prompt">
        <Input.TextArea 
          value={properties.prompt} 
          onChange={e => handleChange('prompt', e.target.value)}
          placeholder="Enter your prompt"
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Temperature">
        <Input 
          type="number" 
          min={0} 
          max={1} 
          step={0.1}
          value={properties.temperature} 
          onChange={e => handleChange('temperature', parseFloat(e.target.value))}
        />
      </Form.Item>
    </Form>
  );
};

export default AIAgentConfig; 