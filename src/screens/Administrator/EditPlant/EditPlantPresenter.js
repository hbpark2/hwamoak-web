/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
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
import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/auth/Button';
import WaterIcon from 'assets/water-drop.png';
import TemperatureIcon from 'assets/temperature.png';
import SunriseIcon from 'assets/sunrise.png';
import { useHistory, useLocation, useParams } from 'react-router';
import Gauge from '../UploadPlant/components/Gauge';

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
    width: 150px;
    margin: 10px;
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

const ImageItem = styled.div``;

const DeleteButton = styled.button`
  padding: 5px;
  cursor: pointer;
`;

const UPLOAD_FILE_MUTATION = gql`
  mutation uploadFile($images: [Upload]!) {
    uploadFile(images: $images) {
      ok
      error
      file
      id
    }
  }
`;

const EDIT_PLANT_MUTATION = gql`
  mutation editPlant(
    $id: Int!
    $title: String!
    $caption: String
    $images: [String]!
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
    editPlant(
      id: $id
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
      ok
      error
    }
  }
`;
const DELETE_PLANTIMAGE_MUTATION = gql`
  mutation deletePlantImage($id: Int!) {
    deletePlantImage(id: $id) {
      ok
      error
    }
  }
`;

const EditPlantPresenter = ({
  id,
  user,
  images,
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
  isLiked,
  plantLikes,
}) => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [awater, setWater] = useState(water);
  const [asunlight, setSunlight] = useState(sunlight);
  // const [atemperature, setTemperature] = useState(temperature);
  const history = useHistory();

  useEffect(() => {
    let fileListArr = [];
    let previewArr = [];

    // eslint-disable-next-line array-callback-return
    images.map(item => {
      fileListArr.push(item.file);
      previewArr.push({ src: item.file, id: item.id });

      setFileList(fileListArr);
      setPreviewPhotos(previewArr);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //CAPTION 만들기
  const defaultCaptionArr = caption.split('<br />').map((line, index) => {
    return `${line} \n`;
  });
  const defaultCaption = defaultCaptionArr.join().replaceAll(',', '');
  const onCompleted = data => {
    console.log(data);
  };

  const onUploadFileComplete = data => {
    setFileList([...fileList, data.uploadFile.file]);
    setPreviewPhotos([
      ...previewPhotos,
      { src: data.uploadFile.file, id: data.uploadFile.id },
    ]);
  };

  const [editPlant, { loading }] = useMutation(EDIT_PLANT_MUTATION, {
    onCompleted,
  });

  const [deletePlantImage] = useMutation(DELETE_PLANTIMAGE_MUTATION, {
    onCompleted,
  });

  const [uploadFile] = useMutation(UPLOAD_FILE_MUTATION, {
    onCompleted: onUploadFileComplete,
  });

  const onFileChange = async e => {
    const {
      target: { files },
    } = e;
    if (files.length > 0) {
      //  파일 확장자 && 용량 체크
      const file = files[0];
      if (Utils.checkImageFile(file) && Utils.checkFileSize(file, 2)) {
        uploadFile({ variables: { images: file } });
      }
    }

    return null;
  };

  const onDeleteButtonClick = (e, idx, imageId) => {
    e.preventDefault();
    // deletePlantImage({ variables: { id: imageId } });
    setPreviewPhotos(prev => prev.filter((_, index) => index !== idx));
    setFileList(prev => prev.filter((_, index) => index !== idx));
    console.log(imageId);
  };

  const onValid = data => {
    let str = data.caption;
    let captionRemake = str.replace(/(?:\r\n|\r|\n)/g, '<br />');

    editPlant({
      variables: {
        id: id,
        title: data.title,
        caption: captionRemake,
        images: fileList,
        water: awater,
        sunlight: asunlight,
        $temperatureMin: data.temperatureMin,
        $temperatureMax: data.temperatureMax,
        plantDivision: data.plantDivision,
        plantClass: data.plantClass,
        plantOrder: data.plantOrder,
        plantFamily: data.plantFamily,
        plantGenus: data.plantGenus,
        plantSpecies: data.plantSpecies,
        plantHome: data.plantHome,
        plantHabitat: data.plantHabitat,
      },
    });
    history.push('/');
  };

  console.log(previewPhotos);
  console.log(fileList);
  console.log(fileList.length);

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
              defaultValue={title}
            />
            <CaptionInput
              ref={register({
                required: 'caption is required.',
              })}
              name="caption"
              type="text"
              placeholder="Caption"
              defaultValue={defaultCaption}
            />
            <UploadPlantWrap>
              <PlantImagesWrap>
                {previewPhotos.map((item, index) => {
                  let makeKey = index;
                  return (
                    <ImageItem key={makeKey}>
                      <img src={item.src} alt="" />
                      <DeleteButton
                        onClick={e => onDeleteButtonClick(e, index, item.id)}
                      >
                        삭제
                      </DeleteButton>
                    </ImageItem>
                  );
                })}
              </PlantImagesWrap>
              <UploadPlantLabel htmlFor="imageUpload">
                <FontAwesomeIcon icon={faPlus} />
                {console.log(fileList.length)}
                <input
                  ref={register(
                    images.length > 0
                      ? null
                      : {
                          required: 'Image is required.',
                        },
                  )}
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
                    <Percentage>{awater}%</Percentage>
                  </Icon>
                  <Gauge
                    bgColor={props => props.theme.waterColor}
                    accentColor={props => props.theme.waterAccentColor}
                    background={props => props.theme.waterGradient}
                    percentage={awater}
                    setGauge={setWater}
                  />
                </Details>
                <Details>
                  <Icon>
                    <img src={SunriseIcon} alt="" />
                    <Percentage>{asunlight}%</Percentage>
                  </Icon>
                  <Gauge
                    bgColor={props => props.theme.sunlightColor}
                    accentColor={props => props.theme.sunlightAccentColor}
                    background={props => props.theme.sunlightGradient}
                    percentage={asunlight}
                    setGauge={setSunlight}
                  />
                </Details>
                {/* <Details>
                  <Icon>
                    <img src={TemperatureIcon} alt="" />
                    <Percentage>{atemperature}%</Percentage>
                  </Icon>
                  <Gauge
                    bgColor={props => props.theme.temperatureColor}
                    accentColor={props => props.theme.temperatureAccentColor}
                    background={props => props.theme.temperatureGradient}
                    percentage={atemperature}
                    setGauge={setTemperature}
                  />
                </Details> */}
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

export default EditPlantPresenter;
