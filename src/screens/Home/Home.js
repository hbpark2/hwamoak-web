import { useQuery } from '@apollo/client';

import gql from 'graphql-tag';
import { logUserOut } from 'apollo';
import Photo from 'components/feed/Photo';
import Plant from 'components/feed/Plant';

import { PageTitle } from 'components/PageTitle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from 'fragments';
import styled from 'styled-components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SHashLoader from '../../components/HashLoader';

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
`;

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const PLANTS_FEED_QUERY = gql`
  query seePlantsFeed {
    seePlantsFeed {
      id
      title
      caption
      water
      sunlight
      temperatureMin
      temperatureMax
      plantLikes
      isLiked
      user {
        username
        avatar
      }
      images {
        file
      }
    }
  }
`;

const Home = () => {
  const { data: photosData, loading: photoLoading } = useQuery(FEED_QUERY, {
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

  useEffect(() => {
    refetch();

    return () => {
      refetch();
    };
  }, [refetch]);

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
      {!photoLoading &&
        photosData?.seeFeed?.map(photo => <Photo key={photo.id} {...photo} />)}
      <button onClick={() => logUserOut()}> Log out now !</button>
    </Container>
  );
};

export default Home;
