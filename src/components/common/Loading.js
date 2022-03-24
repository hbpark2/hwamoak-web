import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 30px 0;
`;

const Loading = () => {
  return (
    <Container>
      <ReactLoading type="spinningBubbles" color="#333" />
    </Container>
  );
};

export default Loading;
