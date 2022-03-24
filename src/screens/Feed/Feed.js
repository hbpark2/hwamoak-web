import { useQuery } from '@apollo/client';
import { logUserOut } from 'apollo';
import Photo from 'Components/feed/Photo';
import Plant from 'Components/feed/Plant';
import { PageTitle } from 'Components/common/PageTitle';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SHashLoader from '../../Components/common/HashLoader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PLANTS_FEED_QUERY } from '../../Scheme/plantScheme';
import { FEED_QUERY } from '../../Scheme/feedScheme';

const Container = styled.div`
  margin: 25px auto;
  max-width: 930px;
  width: 100%;
`;

const PlantsContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  padding: 10px 0;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${props => props.theme.beige2};
  }
`;

const MoreButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0 20px;
  padding-right: 10px;
`;

const Feed = () => {
  const {
    data: photosData,
    loading: photoLoading,
    fetchMore,
    refetch: photoRefetch,
  } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const {
    data: plantsData,
    loading: plantLoading,
    refetch,
  } = useQuery(PLANTS_FEED_QUERY, {
    skip: 0,
  });

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

  const onLoadMore = async () => {
    setUpdate(true);
    await fetchMore({
      variables: {
        offset: photosData?.seeFeed?.length,
      },
    });
    setUpdate(false);
  };

  return (
    <Container>
      <PageTitle title="Home" />
      {plantLoading ? (
        <SHashLoader size={34} screen={true} />
      ) : (
        plantsData && (
          <>
            <PlantsContainer>
              {plantsData?.seePlantsFeed?.map(plant => {
                return <Plant key={plant.id} {...plant} />;
              })}
            </PlantsContainer>
            <MoreButtonWrap>
              <Link to="/plant_feed">더보기</Link>
            </MoreButtonWrap>
          </>
        )
      )}

      {!photoLoading && photosData?.seeFeed?.length > 0 && (
        <InfiniteScroll
          dataLength={photosData?.seeFeed?.length}
          next={onLoadMore}
          hasMore={true}
        >
          {photosData?.seeFeed?.map(photo => (
            <Photo key={photo.id} refetch={photoRefetch} {...photo} />
          ))}
        </InfiniteScroll>
      )}

      {update && <SHashLoader size={34} />}

      <button onClick={() => logUserOut()}> Log out now !</button>
    </Container>
  );
};

export default Feed;
