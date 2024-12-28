import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Button } from 'antd';
import EmailConfig from '../NodeConfigs/EmailConfig';
import SMSConfig from '../NodeConfigs/SMSConfig';
import AIAgentConfig from '../NodeConfigs/AIAgentConfig';
import RuleConfig from '../NodeConfigs/RuleConfig';
import './NodeSidebar.scss';

const NodeSidebar = ({ node, onClose, onSave }) => {
  const [properties, setProperties] = React.useState(node.data.properties || {});

  const handleSave = () => {
    onSave(node.id, properties);
  };

  const renderConfig = () => {
    switch (node.type) {
      case 'email':
        return <EmailConfig properties={properties} onChange={setProperties} />;
      case 'sms':
        return <SMSConfig properties={properties} onChange={setProperties} />;
      case 'aiAgent':
        return <AIAgentConfig properties={properties} onChange={setProperties} />;
      case 'waitThenCheck':
        return <RuleConfig properties={properties} onChange={setProperties} />;
      default:
        return null;
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="node-sidebar"
    >
      <div className="node-sidebar">
        <div className="node-sidebar-header">
          <h3>{node.data.title} Settings</h3>
          <button onClick={onClose}>×</button>
        </div>
        
        <div className="node-sidebar-content">
          {renderConfig()}
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default NodeSidebar;