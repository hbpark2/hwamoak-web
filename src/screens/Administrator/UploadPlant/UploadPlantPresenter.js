import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout/Layout';
import { PageTitle } from 'components/PageTitle';
import Logo from 'assets/hwamoak_logo.png';
import Input from 'components/auth/Input';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Utils from 'utils/Utils';
import { getBase64Format } from 'utils/base64';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Button from 'components/auth/Button';
import WaterIcon from 'assets/water-drop.png';
import TemperatureIcon from 'assets/temperature.png';
import SunriseIcon from 'assets/sunrise.png';
import Gauge from './components/Gauge';

const Container = styled.div`
  padding-bottom: 30px;
`;
const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid ${props => props.theme.borderColor2};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled.span`
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const SLogo = styled.img`
  display: block;
  /* width: 40px; */
  width: 115px;
  margin: 0 auto;
`;

const UploadPlantWrap = styled.div`
  margin: 30px;
  input {
    display: none;
  }
`;

const UploadPlantLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.borderColor2};
  border-radius: 35px;
  cursor: pointer;
`;

const Form = styled.form`
  margin: 30px 0;
`;

const PlantImagesWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  img {
    display: block;
    width: 300px;
  }
`;

const CaptionInput = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 3px;
  padding: 7px;
  /* background-color: #fafafa; */
  background-color: ${props => props.theme.beige2};
  border: 0.5px solid
    ${props => (props.hasError ? 'tomato' : props.theme.borderColor2)};
  margin-top: 5px;
  box-sizing: border-box;
  transition: border-color 0.5s;
  resize: none;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    outline: none;
    border-color: rgba(38, 38, 38);
  }
`;

const IconWrap = styled.ul`
  /* width: 80%; */
  margin: 30px auto;
  img {
    display: block;
    width: 80px;
  }
`;

const Details = styled.li`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Icon = styled.div``;
const Percentage = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 700;
`;

const UPLOAD_PLANT_MUTATION = gql`
  mutation uploadPlants(
    $title: String!
    $caption: String
    $images: [Upload]!
    $sunlight: Int
    $temperature: Int
    $water: Int
  ) {
    uploadPlants(
      title: $title
      caption: $caption
      images: $images
      sunlight: $sunlight
      temperature: $temperature
      water: $water
    ) {
      title
      caption
      images {
        file
      }
    }
  }
`;

const UploadPlantPresenter = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });
  const onCompleted = data => {
    console.log(data);
  };
  const [uploadPlants, { loading }] = useMutation(UPLOAD_PLANT_MUTATION, {
    onCompleted,
  });

  const [previewPhoto, setPreviewPhoto] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [water, setWater] = useState(20);
  const [sunlight, setSunlight] = useState(20);
  const [temperature, setTemperature] = useState(20);

  const onFileChange = async e => {
    const {
      target: { files },
    } = e;
    if (files.length > 0) {
      //  파일 확장자 && 용량 체크

      const file = files[0];

      if (Utils.checkImageFile(file) && Utils.checkFileSize(file, 2)) {
        const theFile = files[0];
        const src = await getBase64Format(theFile);
        setPreviewPhoto(src);
        setPreviewPhotos([...previewPhotos, src]);

        setFileList([...fileList, file]);
      }
    }

    return null;
  };

  const onValid = data => {
    let str = data.caption;

    let captionRemake = str.replace(/(?:\r\n|\r|\n)/g, '<br />');
    // console.log(data);
    // console.log(captionRemake);
    // console.log(water, sunlight, temperature);

    uploadPlants({
      variables: {
        title: data.title,
        caption: captionRemake,
        images: fileList,
        water: water,
        sunlight: sunlight,
        temperature: temperature,
      },
    });
  };

  console.log(previewPhoto);
  console.log(water, sunlight, temperature);

  return (
    <Container>
      <PageTitle title="Upload Plant" />

      <Layout>
        <FormWrapper>
          <HeaderContainer>
            <SLogo src={Logo} alt="logo" />
            <Subtitle>
              Upload Plant for see photos and videos from your friends.
            </Subtitle>
          </HeaderContainer>

          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              ref={register({
                required: 'Title is required.',
              })}
              name="title"
              type="text"
              placeholder="Title"
            />
            <CaptionInput
              ref={register({
                required: 'caption is required.',
              })}
              name="caption"
              type="text"
              placeholder="Caption"
            />
            <UploadPlantWrap>
              <PlantImagesWrap>
                {/* <img src={previewPhoto} alt="" /> */}
              </PlantImagesWrap>
              {previewPhotos.map((item, index) => {
                let makeKey = index;
                return (
                  <PlantImagesWrap key={makeKey}>
                    <img src={item} alt="" />
                  </PlantImagesWrap>
                );
              })}
              <UploadPlantLabel htmlFor="imageUpload">
                <FontAwesomeIcon icon={faPlus} />
                <input
                  ref={register({
                    required: 'Image is required.',
                  })}
                  name="image"
                  type="file"
                  accept=" .jpg, .png"
                  multiple
                  onChange={onFileChange}
                  id="imageUpload"
                />
              </UploadPlantLabel>

              <IconWrap>
                <Details>
                  <Icon>
                    <img src={WaterIcon} alt="" />
                    <Percentage>{water}%</Percentage>
                  </Icon>
                  <Gauge
                    bgColor={props => props.theme.waterColor}
                    accentColor={props => props.theme.waterAccentColor}
                    background={props => props.theme.waterGradient}
                    setGauge={setWater}
                  />
                </Details>
                <Details>
                  <Icon>
                    <img src={SunriseIcon} alt="" />
                    <Percentage>{sunlight}%</Percentage>
                  </Icon>
                  <Gauge
                    bgColor={props => props.theme.sunlightColor}
                    accentColor={props => props.theme.sunlightAccentColor}
                    background={props => props.theme.sunlightGradient}
                    setGauge={setSunlight}
                  />
                </Details>
                <Details>
                  <Icon>
                    <img src={TemperatureIcon} alt="" />
                    <Percentage>{temperature}%</Percentage>
                  </Icon>
                  <Gauge
                    bgColor={props => props.theme.temperatureColor}
                    accentColor={props => props.theme.temperatureAccentColor}
                    background={props => props.theme.temperatureGradient}
                    setGauge={setTemperature}
                  />
                </Details>
              </IconWrap>
            </UploadPlantWrap>
            <Button
              type="submit"
              value={loading ? 'Loading...' : 'POST'}
              disabled={!formState.isValid || loading}
            />
          </Form>
        </FormWrapper>
      </Layout>
    </Container>
  );
};

export default UploadPlantPresenter;
