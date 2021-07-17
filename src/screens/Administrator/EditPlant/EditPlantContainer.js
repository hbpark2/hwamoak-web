import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import EditPlantPresenter from './EditPlantPresenter';

const SEE_PLANT_QUERY = gql`
  query seePlant($id: Int!) {
    seePlant(id: $id) {
      id
      title
      caption
      water
      sunlight
      temperatureMax
      temperatureMin
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
        id
        file
      }
    }
  }
`;

const EditPlantContainer = () => {
  const { plantId } = useParams();

  const id = parseInt(plantId);

  const { data: plantData, loading } = useQuery(SEE_PLANT_QUERY, {
    variables: {
      id: id,
    },
  });

  return !loading && <EditPlantPresenter {...plantData.seePlant} />;
};

export default EditPlantContainer;
