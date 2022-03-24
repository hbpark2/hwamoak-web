import styled from 'styled-components';

const SAvatar = styled.div`
  width: ${props => (props.lg ? '35px' : '25px')};
  height: ${props => (props.lg ? '35px' : '25px')};
  border-radius: 50%;
  /* background-color: #2c2c2c; */
  overflow: hidden;
  background: ${props => `url(${props.background})`};
  background-size: cover;
  background-position: center;
`;
// const Img = styled.img`
//   max-width: 100%;
// `;

const Avatar = ({ url = '', lg = false }) => {
  return <SAvatar lg={lg} background={url} />;
};

export default Avatar;
