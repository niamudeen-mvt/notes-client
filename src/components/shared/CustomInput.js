import React from 'react'

const CustomInput = ({ mb = 0, label, type = "text", name, value, handleChange, errors }) => {
  console.log(errors);
  return (
    <>
      <div className={`mb-${mb}`}>
        <label className='mb-3 common_grey text-capitalize'>{label}</label>
        <br />
        <input type={type} className='border-0 border-bottom'
          name={name}
          value={value}
          onChange={handleChange}
          spellCheck="off"
          autoComplete='off'
        />
        <p className="text-danger mt-4">{errors[name] ? errors[name] : ""}</p>
      </div>
    </>
  )
}

export default CustomInput