import styled from 'styled-components';

const SNotification = styled.p`
  color: #2ecc71;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

const Notification = ({ message }) => {
  return message === '' || !message ? null : (
    <SNotification>{message}</SNotification>
  );
};
export default Notification;
