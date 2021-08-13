import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import PlantsFeedPresenter from './PlantsFeedPresenter';
const PLANTS_FEED_QUERY = gql`
  query seeWholePlantsFeed($lastId: Int) {
    seeWholePlantsFeed(lastId: $lastId) {
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
    // skip: 0,
    variables: {
      lastId: 3,
    },
  });

  console.log(plantsData?.seeWholePlantsFeed);

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
