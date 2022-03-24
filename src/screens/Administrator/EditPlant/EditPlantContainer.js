import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import { SEE_PLANT_QUERY } from '../../../Scheme/plantScheme';
import EditPlantPresenter from './EditPlantPresenter';

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
