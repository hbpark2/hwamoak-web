import styled from 'styled-components';

const Button = styled.input`
  width: 100%;
  border-radius: 3px;
  border: none;
  margin-top: 12px;
  /* background-color: ${props => props.theme.accent}; */
  border: 1px solid ${props => props.theme.borderColor2};
  background-color: ${props => (props.disabled ? 'transparent' : '#333')};
  color: ${props => (props.disabled ? '#333' : props.theme.bgColor)};
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  cursor: pointer;
  opacity: ${props => (props.disabled ? '0.7' : '1')};
  transition: 0.5s;
`;

export default Button;
