import { useQuery } from '@apollo/client';

import gql from 'graphql-tag';
import { logUserOut } from 'apollo';
import Photo from 'components/feed/Photo';
import Plant from 'components/feed/Plant';

import { PageTitle } from 'components/PageTitle';
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from 'fragments';
import styled from 'styled-components';

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
  margin-bottom: 20px;
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

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
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
      temperature
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
  const { data: photosData } = useQuery(FEED_QUERY);
  const { data: plantsData } = useQuery(PLANTS_FEED_QUERY);
  // console.log(plantsData);
  return (
    <Container>
      <PageTitle title="Home" />
      {plantsData && (
        <PlantsContainer>
          {plantsData?.seePlantsFeed?.map(plant => {
            return <Plant key={plant.id} {...plant} />;
          })}
        </PlantsContainer>
      )}
      {photosData?.seeFeed?.map(photo => (
        <Photo key={photo.id} {...photo} />
      ))}
      <button onClick={() => logUserOut()}> Log out now !</button>
    </Container>
  );
};

export default Home;
