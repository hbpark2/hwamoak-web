import styled from 'styled-components';

const SFormError = styled.p`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 15px 0px 10px 0px;
`;

const FormError = ({ message }) => {
  return message === '' || !message ? null : <SFormError>{message}</SFormError>;
};
export default FormError;
