import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from 'components/shared';
import { Link } from 'react-router-dom';

const Container = styled(Link)`
  display: block;
  background-color: #f6f5e8;
  max-width: 615px;
  height: 205px;
  border: 1px solid ${props => props.theme.borderColor1};
  border-radius: 4px;
  margin: 0 10px;
  padding: 10px;
`;

const Title = styled.div`
  width: 140px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PhotoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
`;
const PhotoFile = styled.img`
  display: block;
  min-width: 100%;
  max-width: 100%;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
`;

const Plant = ({ id, user, images, title, caption, isLiked, plantLikes }) => {
  return (
    <Container key={id} to={`/plants/${id}`}>
      <Title>{title}</Title>
      <PhotoWrap>
        <PhotoFile src={images[0].file} alt="" />
      </PhotoWrap>
      <Likes>{plantLikes === 1 ? '1 like' : `${plantLikes} like`}</Likes>
    </Container>
  );
};

Plant.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  isLiked: PropTypes.bool.isRequired,
  plantLikes: PropTypes.number.isRequired,
};

export default Plant;
