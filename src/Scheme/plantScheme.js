import { gql } from '@apollo/client';

export const PLANTS_FEED_QUERY = gql`
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

export const WHOLE_PLANTS_FEED_QUERY = gql`
  query seeWholePlantsFeed($offset: Int) {
    seeWholePlantsFeed(offset: $offset) {
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

export const SEE_PLANT_QUERY = gql`
  query seePlant($id: Int!) {
    seePlant(id: $id) {
      id
      category
      pot
      soil
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

export const DELETE_PLANT_MUTATION = gql`
  mutation deletePlant($id: Int!) {
    deletePlant(id: $id) {
      ok
      error
    }
  }
`;

export const TOGGLE_PLANT_LIKE_MUTATION = gql`
  mutation togglePlantLike($id: Int!) {
    togglePlantLike(id: $id) {
      ok
      error
    }
  }
`;

export const UPLOAD_PLANT_MUTATION = gql`
  mutation uploadPlants(
    $category: String!
    $pot: String!
    $soil: String!
    $title: String!
    $caption: String
    $images: [Upload]!
    $sunlight: Int
    $temperatureMin: Int
    $temperatureMax: Int
    $water: Int
    $plantDivision: String
    $plantClass: String
    $plantOrder: String
    $plantFamily: String
    $plantGenus: String
    $plantSpecies: String
    $plantHome: String
    $plantHabitat: String
  ) {
    uploadPlants(
      category: $category
      pot: $pot
      soil: $soil
      title: $title
      caption: $caption
      images: $images
      sunlight: $sunlight
      temperatureMin: $temperatureMin
      temperatureMax: $temperatureMax
      water: $water
      plantDivision: $plantDivision
      plantClass: $plantClass
      plantOrder: $plantOrder
      plantFamily: $plantFamily
      plantGenus: $plantGenus
      plantSpecies: $plantSpecies
      plantHome: $plantHome
      plantHabitat: $plantHabitat
    ) {
      title
      caption
      images {
        file
      }
    }
  }
`;
