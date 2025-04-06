import React from 'react'

const InputButton = (type,name,value,onChange,placeholder) => {
  return (
    <div>
        <label className="w-full input input-bordered input-secondary flex items-center gap-2">
        <input
            type={type}
            name={name}
            className="grow"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
        />
        </label>
  </div>
  )
}

export default InputButton
