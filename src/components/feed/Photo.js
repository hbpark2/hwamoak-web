import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useState } from 'react';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as SolidHeart,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FatText } from 'components/common/shared';
import Avatar from 'components/common/Avatar';

import { gql, useMutation } from '@apollo/client';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { FadeIn } from '../../styles';
import {
  DELETE_PHOTO_MUTATION,
  TOGGLE_LIKE_MUTATION,
} from '../../Scheme/photoScheme';

SwiperCore.use([Navigation, Pagination]);

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
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
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

const EditBox = styled.div`
  position: relative;
`;

const EditBtn = styled.button`
  cursor: pointer;
  font-size: 20px;
  padding: 5px 10px;
`;

const EditModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: -37px;
  top: 32px;
  width: 100px;
  overflow: hidden;

  background: ${props => props.theme.bgColor};
  border-radius: 10px;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2), -3px -3px 4px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const ModalLqyer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const ModifyWrap = styled.ul`
  li {
    width: 100%;
  }
`;

const ActionBtn = styled.button`
  display: block;
  text-align: center;
  width: 100%;
  padding: 10px 0;
  /* color: ${props => (props.red ? props.theme.red : props.theme.green)}; */

  font-weight: 600;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffe;
  }
`;

const Photo = ({
  id,
  user,
  images,
  isLiked,
  isMine,
  likes,
  caption,
  commentNumber,
  comments,
  refetch,
}) => {
  const [modal, setModal] = useState(false);

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

  const [deletePhoto] = useMutation(DELETE_PHOTO_MUTATION, {
    variables: {
      id,
    },
    onCompleted: async () => await refetch(),
  });

  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  const onDeleteBtnClick = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      deletePhoto({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <UserBox>
          <Link to={`/users/${user.username}`}>
            <Avatar lg url={user?.avatar} />
          </Link>
          <Link to={`/users/${user.username}`}>
            <Username>{user?.username}</Username>
          </Link>
        </UserBox>
        {isMine && (
          <EditBox>
            <EditBtn onClick={() => setModal(!modal)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </EditBtn>
            {modal && (
              <>
                <EditModal>
                  <ModifyWrap>
                    <li>
                      <ActionBtn>수 정</ActionBtn>
                    </li>
                    <li>
                      <ActionBtn red onClick={onDeleteBtnClick}>
                        삭 제
                      </ActionBtn>
                    </li>
                  </ModifyWrap>
                </EditModal>
                <ModalLqyer onClick={() => setModal(false)} />
              </>
            )}
          </EditBox>
        )}
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
