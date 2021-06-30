import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  /* background-color: #fafafa; */
  background-color: ${props => props.theme.beige2};
  border: 0.5px solid
    ${props => (props.hasError ? 'tomato' : props.theme.borderColor2)};
  margin-top: 5px;
  box-sizing: border-box;
  transition: border-color 0.5s;

  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgba(38, 38, 38);
  }
`;

export default Input;
