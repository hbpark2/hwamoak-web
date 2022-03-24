import React from 'react';
import styled from 'styled-components';

const SelectBox = styled.select`
  display: block;
`;

const Select = ({ register, name, placeholder, options }) => {
  return (
    <SelectBox
      ref={register({
        required: `${name} is required.`,
      })}
      name={name}
    >
      <option value={options[0].value}>{placeholder}</option>
      {options.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <option value={item.value}>{item.text}</option>
          </React.Fragment>
        );
      })}
    </SelectBox>
  );
};

export default Select;
