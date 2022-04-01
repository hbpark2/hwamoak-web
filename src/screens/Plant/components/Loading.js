import React from 'react';
import styled from 'styled-components';
import SHashLoader from '../../../components/common/SHashLoader';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Loading = () => {
  return (
    <Container>
      <SHashLoader />
    </Container>
  );
};

export default Loading;
