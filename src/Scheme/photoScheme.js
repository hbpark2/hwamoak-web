import { gql, useQuery } from '@apollo/client';
import { FEED_PHOTO } from '../fragments';

export const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($images: [Upload]!, $caption: String) {
    uploadPhoto(images: $images, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

export const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
      error
    }
  }
`;
