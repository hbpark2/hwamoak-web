import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  background: ${props => props.theme.bgColor};
`;

const SHashLoader = ({ size, color, screen }) => {
  const override = {
    display: 'block',
    margin: '50px auto',
    // borderColor: '#000',
  };

  return screen ? (
    <Container>
      <HashLoader css={override} size={50} color={color ? color : '#204a23'} />
    </Container>
  ) : (
    <HashLoader css={override} size={size} color={color ? color : '#204a23'} />
  );
};

export default SHashLoader;
