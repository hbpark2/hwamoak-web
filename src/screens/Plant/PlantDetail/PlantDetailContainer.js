import { gql, useMutation, useQuery } from '@apollo/client';

import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { CurrentContext } from '../../../Context/ContextStore';
import {
  DELETE_PLANT_MUTATION,
  SEE_PLANT_QUERY,
  TOGGLE_PLANT_LIKE_MUTATION,
} from '../../../Scheme/plantScheme';
import PlantDetailPresenter from './PlantDetailPresenter';

const PlantDetailContainer = () => {
  const history = useHistory();
  const { seedLoggedIn } = useContext(CurrentContext);
  const { plantId } = useParams();
  const id = parseInt(plantId);
  const {
    data: plantData,
    loading,
    refetch,
  } = useQuery(SEE_PLANT_QUERY, {
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

  const [deletePlant] = useMutation(DELETE_PLANT_MUTATION, {
    variables: {
      id,
    },
  });

  const onDeletePlant = id => {
    deletePlant();

    setTimeout(() => {
      history.goBack();
    }, 500);
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantData]);

  return loading ? (
    'loading'
  ) : (
    <PlantDetailPresenter
      {...plantData?.seePlant}
      togglePlantLikeMutation={togglePlantLikeMutation}
      onDeletePlant={onDeletePlant}
      seedLoggedIn={seedLoggedIn}
    />
  );
};

export default PlantDetailContainer;
