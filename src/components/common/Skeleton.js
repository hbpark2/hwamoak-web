import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  to {
    background-position:
      100% 0,
      200px 0;
  }
`;

const Skeleton = styled.div`
  &:empty {
    border-radius: 15px;
    background-repeat: repeat-x;
    background-image: linear-gradient(
        100deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 80%
      ),
      linear-gradient(#eeeeee 20px, transparent 0);
    background-size: 200px 70px, 200px 300px;
    background-position: 0 0, 200px 0;
    animation: ${shine} 1s infinite;
  }
`;

export default Skeleton;
