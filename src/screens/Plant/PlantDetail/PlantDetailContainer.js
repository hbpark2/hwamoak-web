import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';
import PlantDetailPresenter from './PlantDetailPresenter';

const SEE_PLANT_QUERY = gql`
  query seePlant($id: Int!) {
    seePlant(id: $id) {
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

const TOGGLE_PLANT_LIKE_MUTATION = gql`
  mutation togglePlantLike($id: Int!) {
    togglePlantLike(id: $id) {
      ok
      error
    }
  }
`;

const PlantDetailContainer = () => {
  const { plantId } = useParams();
  const id = parseInt(plantId);
  const { data: plantData, loading } = useQuery(SEE_PLANT_QUERY, {
    variables: {
      id: id,
    },
  });

  const updateToggleLike = (cache, result) => {
    console.log(cache, result);
    const {
      data: {
        togglePlantLike: { ok },
      },
    } = result;
    if (ok) {
      console.log('time to update the cache ');

      const plantId = `Plants:${id}`;
      cache.modify({
        id: plantId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          plantLikes(prev) {
            if (plantData.seePlant.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [togglePlantLikeMutation] = useMutation(TOGGLE_PLANT_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  console.log(plantData);
  return loading ? (
    'loadin'
  ) : (
    <PlantDetailPresenter
      {...plantData.seePlant}
      togglePlantLikeMutation={togglePlantLikeMutation}
    />
  );
};

export default PlantDetailContainer;
