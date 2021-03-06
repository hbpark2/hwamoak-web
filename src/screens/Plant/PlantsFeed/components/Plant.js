import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FatText } from 'components/common/shared';
import { Link } from 'react-router-dom';
import { FadeInTopToBottom } from '../../../../styles';

const Container = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f5e8;
  min-height: 235px;
  /* min-height: 350px; */
  border: 1px solid ${props => props.theme.borderColor1};
  border-radius: 4px;
  padding: 20px 10px;
  /* margin: 0 10px; */
  width: ${props => (props.iswholefeed ? '31%' : 'auto')};
  height: ${props => (props.iswholefeed ? '250px' : 'auto')};
  margin: ${props => (props.iswholefeed ? '30px 1.15%' : ' 0 10px')};
  animation-name: ${FadeInTopToBottom};
  animation-duration: 1.5s;

  @media screen and (max-width: 1279px) {
    width: ${props => (props.iswholefeed ? '48%' : 'auto')};
    height: ${props => (props.iswholefeed ? '250px' : 'auto')};
    margin: ${props => (props.iswholefeed ? '15px 1%' : ' 0 10px')};
  }
`;

const Title = styled.div`
  width: ${props => (props.iswholefeed ? '100%' : '140px')};
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
  min-height: 100%;
  /* height:100%; */
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
`;

const Plant = ({
  id,
  user,
  images,
  title,
  caption,
  isLiked,
  plantLikes,
  iswholefeed,
}) => {
  return (
    <Container key={id} to={`/plants/${id}`} iswholefeed={iswholefeed}>
      <Title iswholefeed={iswholefeed}>{title}</Title>
      <PhotoWrap>
        <PhotoFile src={images[0]?.file} alt="" />
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
  iswholefeed: PropTypes.string,
};

export default Plant;
