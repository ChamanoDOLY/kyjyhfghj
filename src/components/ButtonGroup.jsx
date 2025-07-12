import React from 'react';

const ButtonGroup = ({ buttons }) => {
  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div className="message-buttons">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="message-button"
          disabled={button.disabled}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;