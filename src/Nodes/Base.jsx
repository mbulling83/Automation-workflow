/* eslint-disable default-case */
import * as colors from "@contactlab/ds-tokens/constants/colors";
import {
  DatabaseOutlined,
  MailOutlined,
  CommentOutlined,
  CheckCircleOutlined,
  FlagOutlined,
  CloseOutlined,
  RobotOutlined
} from "@ant-design/icons";

import "./Style.scss";

export const BaseNode = ({
  id,
  type,
  data,
  selected,
  disabled,
  onNodeClick,
  onCloseIconClick,
  additionalClassName,
}) => {
  const content = (
    <>
      {getIconSrc(type)}
      <div className="NodeContent">
        <div className="NodeTitle">{data.title}</div>
        <p className="NodeDesc">{data.description}</p>
      </div>
    </>
  );
  return (
    <div
      data-selected={selected}
      aria-disabled={disabled}
      className={`NodeInnerWrapper ${additionalClassName}`}
      style={{ color: getColor(type) }}
      onClick={() => data.onNodeClickCallback(id)}
    >
      {content}
      <CloseOutlined className="closeIcon" onClick={onCloseIconClick} />
    </div>
  );
};

export const EmptyBaseNode = () => {
  return <div className="EmptyNodeInnerWrapper"></div>;
};

// --- Helpers
const getColor = (type) => {
  switch (type) {
    case "source":
      return colors.success;
    case "email":
      return colors.accent;
    case "sms":
      return colors.accent;
    case "waitThenCheck":
      return colors.warning;
    case "end":
      return colors.base;
    case "aiAgent":
      return colors.accent;
    default:
      return colors.base;
  }
};

const getIconSrc = (type) => {
  const color = getColor(type);

  switch (type) {
    case "source":
      return <DatabaseOutlined className="NodeIcon" style={{ color }} />;
    case "email":
      return <MailOutlined className="NodeIcon" style={{ color }} />;
    case "sms":
      return <CommentOutlined className="NodeIcon" style={{ color }} />;
    case "waitThenCheck":
      return <CheckCircleOutlined className="NodeIcon" style={{ color }} />;
    case "end":
      return <FlagOutlined className="NodeIcon" style={{ color }} />;
  }
};
