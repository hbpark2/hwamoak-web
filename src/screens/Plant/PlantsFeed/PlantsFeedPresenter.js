import React from 'react';
import styled from 'styled-components';
import Layout from '../../../components/Layout/Layout';
import Plant from './components/Plant';

const Container = styled.div`
  padding-bottom: 20px;
`;
const Grid = styled.div`
  margin: 0 auto;
  display: grid;
  /* grid-auto-rows: 290px; */
  /**haha */
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
`;
const PlantsFeedPresenter = ({ plantsData }) => {
  return (
    <Container>
      <Layout>
        <Grid>
          {plantsData?.map(plant => {
            return <Plant key={plant.id} {...plant} />;
          })}
        </Grid>
      </Layout>
    </Container>
  );
};

export default PlantsFeedPresenter;
