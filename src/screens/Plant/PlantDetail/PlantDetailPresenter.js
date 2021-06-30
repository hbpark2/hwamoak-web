import React from 'react';
import styled from 'styled-components';
import Layout from '../../../components/Layout/Layout';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WaterIcon from 'assets/water-drop.png';
import TemperatureIcon from 'assets/temperature.png';
import SunriseIcon from 'assets/sunrise.png';
import Gauge from '../../Administrator/UploadPlant/components/Gauge';

const Container = styled.div`
  padding-bottom: 20px;
`;
const Wrap = styled.div`
  background-color: #f6f5e8;
  max-width: 655px;
  border: 1px solid ${props => props.theme.borderColor1};
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 60px;
  padding: 20px;
`;
const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 22px;
  font-weight: 700;
`;
const ImageWrap = styled.div`
  margin-bottom: 20px;
  img {
    display: block;
    /* max-width: 80%; */
    width: 80%;
    margin: 0 auto;
  }
`;
const Caption = styled.div`
  width: 80%;
  margin: 0 auto 20px;
`;

const IconWrap = styled.ul`
  width: 80%;
  margin: 0 auto 30px;
  img {
    display: block;
    width: 60px;
  }
`;

const ObjectOfPlant = styled.li`
  margin: 30px 0;
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Icon = styled.div``;

const Percentage = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  font-weight: 700;
`;

const PhotoData = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 12px 0;
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

const PlantDetailPresenter = ({
  id,
  title,
  caption,
  water,
  sunlight,
  temperature,
  images,
  user,
  plantLikes,
  isLiked,
  togglePlantLikeMutation,
}) => {
  console.log(water, sunlight, temperature);
  // const remakeWater = water / 20;
  // const remakeSunlight = sunlight / 20;
  // const remakeTemperature = temperature / 20;

  // const waterArr = [];
  // const sunlightArr = [];
  // const temperatureArr = [];

  // const onMakeArr = (item, arr) => {
  //   for (let i = 0; i < item; i++) {
  //     arr.push(0);
  //   }
  // };

  // const onCheckOddNumber = item => {
  //   if (item % 2 === 1) {
  //     return true;
  //   }
  // };

  // useEffect(() => {
  //   onMakeArr(remakeWater, waterArr);
  //   onMakeArr(remakeSunlight, sunlightArr);
  //   onMakeArr(remakeTemperature, temperatureArr);
  // }, []);

  // console.log(onCheckOddNumber(remakeWater));
  // console.log(remakeWater);
  // console.log(Math.round(remakeWater));

  return (
    <Container>
      <Layout>
        <Wrap>
          <Title>{title}</Title>
          <ImageWrap>
            {images.map((item, index) => {
              let imgKey = `plantImg${index}`;
              return <img key={imgKey} src={item.file} alt="" />;
            })}
          </ImageWrap>
          <Caption>
            {caption.split('<br />').map((line, index) => {
              let makeSpanKey = `line${index}`;
              return (
                <span key={makeSpanKey}>
                  {line}
                  <br />
                </span>
              );
            })}
          </Caption>
          <IconWrap>
            <ObjectOfPlant>
              <Details>
                <Icon>
                  <img src={WaterIcon} alt="" />
                  <Percentage>{water}%</Percentage>
                </Icon>

                <Gauge
                  bgColor={props => props.theme.waterColor}
                  accentColor={props => props.theme.waterAccentColor}
                  background={props => props.theme.waterGradient}
                  percentage={water}
                />
              </Details>
            </ObjectOfPlant>
            <ObjectOfPlant>
              <Details>
                <Icon>
                  <img src={SunriseIcon} alt="" />
                  <Percentage>{sunlight}%</Percentage>
                </Icon>

                <Gauge
                  bgColor={props => props.theme.sunlightColor}
                  accentColor={props => props.theme.sunlightAccentColor}
                  background={props => props.theme.sunlightGradient}
                  percentage={sunlight}
                />
              </Details>
            </ObjectOfPlant>
            <ObjectOfPlant>
              <Details>
                <Icon>
                  <img src={TemperatureIcon} alt="" />
                  <Percentage>{temperature}%</Percentage>
                </Icon>

                <Gauge
                  bgColor={props => props.theme.temperatureColor}
                  accentColor={props => props.theme.temperatureAccentColor}
                  background={props => props.theme.temperatureGradient}
                  percentage={temperature}
                />
              </Details>
            </ObjectOfPlant>
          </IconWrap>
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction onClick={togglePlantLikeMutation}>
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
          </PhotoData>
        </Wrap>
      </Layout>
    </Container>
  );
};

export default PlantDetailPresenter;
