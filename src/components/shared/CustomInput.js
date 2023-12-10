import React from "react";
import { config } from "../../config";

const CustomInput = ({
  mb = 0,
  label,
  type = "text",
  name,
  value,
  handleChange,
  errors,
  isDisable = false,
  textStyle = "lowercase",
}) => {
  return (
    <>
      <div className={`mb-${mb}`}>
        <label
          className="mb-3  text-capitalize"
          style={{ color: config.theme.light_grey_clr }}
        >
          {label}
        </label>
        <br />
        <input
          type={type}
          className={`border-0 border-bottom text-${textStyle}`}
          name={name}
          value={value}
          onChange={handleChange}
          spellCheck={false}
          autoCorrect="off" // Add autoCorrect attribute
          autoComplete="off"
          disabled={isDisable}
        />
        {errors ? (
          <p className="text-danger mt-4">{errors[name] ? errors[name] : ""}</p>
        ) : null}
      </div>
    </>
  );
};

export default CustomInput;
