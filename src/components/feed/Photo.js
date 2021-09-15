import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FatText } from 'components/shared';
import Avatar from 'components/Avatar';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { FadeIn } from '../../styles';

SwiperCore.use([Navigation, Pagination]);

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: #f6f5e8;
  max-width: 615px;
  border: 1px solid ${props => props.theme.borderColor1};
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 60px;
  animation-name: ${FadeIn};
  animation-duration: 0.5s;

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 16px;
    color: #fff;
  }
  .swiper-pagination-bullet {
    background: #fff;
  }

  @media screen and (max-width: 640px) {
    border-left: none;
    border-right: none;
  }
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.div`
  min-width: 100%;
  max-width: 100%;
  padding-bottom: 100%;
  background: ${props => `url(${props.background})`};
  background-size: cover;
  background-position: center;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Photo = ({
  id,
  user,
  images,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const updateToggleLike = (cache, result) => {
    // console.log(cache, result);
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      // console.log('time to update the cache ');

      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar lg url={user?.avatar} />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>

      <Swiper
        navigation={images.length > 1 ? true : false}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {images.map((item, index) => {
          let makeKey = index;
          return (
            <SwiperSlide key={makeKey}>
              <PhotoFile background={item.file} alt="image" key={makeKey} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? '#ff7479' : 'inherit' }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? '1 like' : `${likes} like`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  images: PropTypes.array.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  commentNumber: PropTypes.number.isRequired,
};

export default Photo;
