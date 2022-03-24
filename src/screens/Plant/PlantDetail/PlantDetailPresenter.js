import React from 'react';
import styled from 'styled-components';
import Layout from '../../../Components/Layout/Layout';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WaterIcon from 'assets/water-drop.png';
import TemperatureIcon from 'assets/temperature.png';
import SunriseIcon from 'assets/sunrise.png';
import Gauge from '../../Administrator/UploadPlant/components/Gauge';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
SwiperCore.use([Navigation, Pagination]);

const Container = styled.div`
  padding-bottom: 20px;
  /* background: url(${props => props.background}); */

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 24px;
    color: ${props => props.theme.beige2};
  }
  .swiper-pagination-bullet {
    background: ${props => props.theme.beige2};
  }
`;
const Wrap = styled.div`
  position: relative;
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
  line-height: 1.3em;
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

const EditWrap = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  ul {
    display: flex;
    a,
    button {
      display: block;
      padding: 5px 10px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const Modify = styled(Link)`
  color: #a9c7ab;
`;
const Delete = styled.button`
  color: #db9393;
`;
const TemperatureWrap = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  i {
    display: block;
    margin: 0 5px;
  }
`;

const DetailWrap = styled.div`
  width: 60%;
  margin: 0 auto 30px;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  dl {
    display: flex;
    margin: 7px 0;
    dt {
      margin-right: 5px;
      font-weight: 600;
      width: 50px;
      /* text-align: center; */
    }
  }
`;

const Username = styled.span`
  font-size: 12px;
  display: block;
  margin-left: 10px;
  margin-top: 10px;
`;
const PhotoFile = styled.div`
  min-width: 100%;
  max-width: 100%;
  padding-bottom: 100%;
  background: ${props => `url(${props.background})`};
  background-size: cover;
  background-position: center center;
`;

const PlantDetailPresenter = ({
  id,
  category,
  pot,
  soil,
  title,
  caption,
  water,
  sunlight,
  temperatureMin,
  temperatureMax,
  plantDivision,
  plantClass,
  plantOrder,
  plantFamily,
  plantGenus,
  plantSpecies,
  plantHome,
  plantHabitat,
  images,
  user,
  plantLikes,
  isLiked,
  togglePlantLikeMutation,
  onDeletePlant,
  seedLoggedIn,
}) => {
  console.log(user?.username);
  return (
    <Container background={images[0]?.file}>
      <Layout>
        <Wrap>
          {seedLoggedIn && (
            <EditWrap>
              <ul>
                <li>
                  <Modify to={`/plant/edit/${id}`}>수정</Modify>
                </li>
                <li>
                  <Delete onClick={() => onDeletePlant(id)}>삭제</Delete>
                </li>
              </ul>
            </EditWrap>
          )}

          <Title>
            {title} <Username> - {user?.username}</Username>
          </Title>

          <ImageWrap>
            {/* {images?.map((item, index) => {
              let imgKey = `plantImg${index}`;
              return <img key={imgKey} src={item.file} alt="" />;
            })} */}

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
                    <PhotoFile
                      background={item.file}
                      alt="image"
                      key={makeKey}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
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
                  <Percentage>적정온도</Percentage>
                </Icon>
                <TemperatureWrap>
                  <span>{temperatureMin}℃</span>
                  <i>~</i>
                  <span>{temperatureMax}℃</span>
                </TemperatureWrap>
                {/* <Gauge
                  bgColor={props => props.theme.temperatureColor}
                  accentColor={props => props.theme.temperatureAccentColor}
                  background={props => props.theme.temperatureGradient}
                  percentage={temperature}
                /> */}
              </Details>
            </ObjectOfPlant>
          </IconWrap>
          <DetailWrap>
            <dl>
              <dt>카테고리</dt>
              <dd> {category}</dd>
            </dl>
            <dl>
              <dt>화분</dt>
              <dd> {pot}</dd>
            </dl>
            <dl>
              <dt>흙</dt>
              <dd> {soil}</dd>
            </dl>
            <dl>
              <dt>문</dt>
              <dd> {plantDivision}</dd>
            </dl>
            <dl>
              <dt>강</dt>
              <dd> {plantClass}</dd>
            </dl>
            <dl>
              <dt>목</dt>
              <dd> {plantOrder}</dd>
            </dl>
            <dl>
              <dt>과</dt>
              <dd> {plantFamily}</dd>
            </dl>
            <dl>
              <dt>속</dt>
              <dd> {plantGenus}</dd>
            </dl>
            <dl>
              <dt>종</dt>
              <dd> {plantSpecies}</dd>
            </dl>
            <dl>
              <dt>원산지</dt>
              <dd> {plantHome}</dd>
            </dl>
            <dl>
              <dt>서식지</dt>
              <dd> {plantHabitat}</dd>
            </dl>
          </DetailWrap>
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction onClick={togglePlantLikeMutation}>
                  <FontAwesomeIcon
                    style={{ color: isLiked ? '#ff7479' : 'inherit' }}
                    icon={isLiked ? SolidHeart : faHeart}
                  />
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
