import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import SHashLoader from '../../../Components/common/HashLoader';
import Layout from '../../../Components/Layout/Layout';
import { PageTitle } from '../../../Components/common/PageTitle';
import Plant from './components/Plant';

const Container = styled.div`
  padding-bottom: 20px;
`;

// const Grid = styled.div`
//   margin: 0 auto;
//   display: grid;
//   /* grid-auto-rows: 290px; */
//   grid-template-columns: repeat(3, 1fr);
//   gap: 30px;
// `;

const Wrap = styled.div``;

const PlantsFeedPresenter = ({
  plantsData,
  onLoadMore,
  loading,
  hasMore,
  update,
}) => {
  return loading ? (
    <SHashLoader size={34} screen={true} />
  ) : (
    <Container>
      <PageTitle title="Plants List" />

      <Layout id="scrollArea">
        {/* <Grid> */}
        <Wrap>
          {!loading && plantsData?.seeWholePlantsFeed?.length > 0 && (
            <InfiniteScroll
              dataLength={plantsData?.seeWholePlantsFeed?.length}
              next={onLoadMore}
              hasMore={true}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                // justifyContent: 'center',
              }}
            >
              {plantsData?.seeWholePlantsFeed?.map(plant => {
                return <Plant key={plant.id} {...plant} iswholefeed={'true'} />;
              })}
            </InfiniteScroll>
          )}
        </Wrap>
        {update && <SHashLoader size={34} />}
        {/* {!hasMore && (
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        )} */}
      </Layout>
    </Container>
  );
};

export default PlantsFeedPresenter;
