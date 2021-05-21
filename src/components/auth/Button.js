import styled from 'styled-components';

const Button = styled.input`
  width: 100%;
  border-radius: 3px;
  border: none;
  margin-top: 12px;
  background-color: ${props => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
`;

export default Button;
