/* eslint-disable react/prop-types */
// RadioButton.js
import React from "react";

const RadioButton = ({ value, selectedValue, onSelect }) => {
  return (
    <div className="flex ai-center">
      <input
        type="radio"
        value={value}
        checked={value === selectedValue}
        onChange={() => onSelect(value)}
      />
      <label>
        <p className="text">{value}</p>
      </label>
    </div>
  );
};

export default RadioButton;
