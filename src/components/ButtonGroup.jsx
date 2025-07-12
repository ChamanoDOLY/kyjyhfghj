import React from 'react';

const ButtonGroup = ({ buttons }) => {
  if (!buttons || buttons.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs text-gray-700 transition-colors focus-visible:focus-visible"
          disabled={button.disabled}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;