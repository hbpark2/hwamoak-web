import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import PlantsFeedPresenter from './PlantsFeedPresenter';
const PLANTS_FEED_QUERY = gql`
  query seeWholePlantsFeed {
    seeWholePlantsFeed {
      id
      title
      caption
      water
      sunlight
      temperatureMin
      temperatureMax
      plantDivision
      plantClass
      plantOrder
      plantFamily
      plantGenus
      plantSpecies
      plantHome
      plantHabitat
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

const PlantsFeedContainer = () => {
  const {
    data: plantsData,
    loading,
    refetch,
  } = useQuery(PLANTS_FEED_QUERY, {
    skip: 0,
    variables: {
      lastId: 0,
    },
  });

  // const infiniteScroll = useCallback(() => {
  //   const { documentElement, body } = document;

  //   const scrollHeight = Math.max(
  //     documentElement.scrollHeight,
  //     body.scrollHeight,
  //   );
  //   const scrollTop = Math.max(documentElement.scrollTop, body.scrollTop);
  //   const { clientHeight } = documentElement;

  //   if (scrollTop + clientHeight + 200 >= scrollHeight) {
  //     // perPage += pageLimit;
  //     console.log('aa');
  //   }
  // }, []);

  // useEffect(() => {
  //   window.addEventListener('scroll', infiniteScroll);
  //   return () => {
  //     window.removeEventListener('scroll', infiniteScroll);
  //   };
  // }, [plantsData, infiniteScroll]);

  useEffect(() => {
    refetch();
    return () => {
      refetch();
    };
  }, [refetch]);

  return loading ? (
    'loading'
  ) : (
    <PlantsFeedPresenter plantsData={plantsData?.seeWholePlantsFeed} />
  );
};

export default PlantsFeedContainer;
