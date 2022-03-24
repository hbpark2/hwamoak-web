/* eslint-disable no-unused-vars */
import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import Logo from 'assets/hwamoak_logo.png';
import styled from 'styled-components';
import { PageTitle } from '../../../components/common/PageTitle';
import Button from '../../../components/auth/Button';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.css';
import { UPLOAD_PHOTO_MUTATION } from '../../../Scheme/photoScheme';

const Container = styled.div`
  padding-bottom: 30px;
`;

const Layout = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  max-width: 930px;
  width: 100%;
`;

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 30px auto 0;
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

const Form = styled.form`
  margin: 30px 0;
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
const UploadPlantWrap = styled.div`
  margin: 30px;
  input {
    display: none;
  }
`;

const PlantImagesWrap = styled.div`
  margin: 30px auto;
  img {
    display: block;
    margin: 0 auto;
    width: 300px;
  }
  .swiper-button-prev::after,
  .swiper-button-next::after {
    color: #333;
    /* font-size: 16px !important; */
  }
  .swiper-pagination-bullet {
    background: #333;
    width: 7px;
    height: 7px;
  }
  .swiper-slide {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 300px;
    }
  }
  .swiper-wrapper {
    align-items: center;
  }
`;

const UploadPlantLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  margin: 0 auto;
  border: 1px solid ${props => props.theme.borderColor2};
  border-radius: 10px;
  cursor: pointer;
  color: #555;
  transition: 0.3s;
  span {
    font-weight: 600;
  }
  @media screen and (min-width: 1280px) {
    &:hover {
      background-color: #555;
      color: #ffe;
    }
  }
`;

const DeleteButton = styled.button`
  display: block;
  width: 100px;
  text-align: center;
  padding: 5px;
  margin: 20px auto;
  cursor: pointer;
`;

const PostButton = styled(Button)`
  height: 35px;
`;

const UploadPhotoPresenter = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [fileList, setFileList] = useState([]);

  const history = useHistory();

  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;

    if (uploadPhoto.id) {
      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev];
          },
        },
      });
    }
    history.push('/');
  };

  const [uploadPhoto, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION, {
    update: updateUploadPhoto,
  });

  // const onFileChange = e => {
  //   const {
  //     target: { files },
  //   } = e;

  //   //미리보기 이미지

  //   let reader = new FileReader();
  //   reader.onload = () => {
  //     setPreviewPhoto(reader.result);
  //   };
  //   reader.readAsDataURL(files[0]);

  //   return null;
  // };

  const onFileChange = async e => {
    const {
      target: { files },
    } = e;

    //미리보기 이미지
    let fileURLs = [];

    let file;
    let filesLength = files.length > 10 ? 10 : files.length;

    for (let i = 0; i < filesLength; i++) {
      file = files[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setPreviewPhotos([...previewPhotos, { src: fileURLs }]);
      };
      reader.readAsDataURL(file);
    }

    if (files.length > 0) {
      //  파일 확장자 && 용량 체크
      const file = files[0];
      setFileList([...fileList, file]);
    }
    // setImgLoading(true);
    return null;
  };

  const onValid = data => {
    uploadPhoto({
      variables: {
        caption: data.caption,
        images: fileList,
      },
    });
  };

  const onDeleteButtonClick = (e, idx, imageId) => {
    e.preventDefault();
    setPreviewPhotos(prev => prev.filter((_, index) => index !== idx));
    setFileList(prev => prev.filter((_, index) => index !== idx));
  };

  return (
    <Container>
      <PageTitle title="Upload Photo" />
      <FormWrapper>
        <Layout>
          <HeaderContainer>
            <SLogo src={Logo} alt="화목" />
            <Subtitle>
              Upload photo for see photos and videos from your friends.
            </Subtitle>
          </HeaderContainer>

          <Form onSubmit={handleSubmit(onValid)}>
            <UploadPlantWrap>
              {previewPhotos && (
                <PlantImagesWrap>
                  <Swiper
                    navigation
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                  >
                    {previewPhotos.map((item, index) => {
                      let makeKey = index;
                      return (
                        <SwiperSlide key={makeKey}>
                          {/* <ImageItem> */}
                          <img src={item.src} alt="" />
                          <DeleteButton
                            onClick={e =>
                              onDeleteButtonClick(e, index, item.id)
                            }
                          >
                            삭제
                          </DeleteButton>
                          {/* </ImageItem> */}
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>{' '}
                </PlantImagesWrap>
              )}
              <UploadPlantLabel htmlFor="imageUpload">
                {/* <FontAwesomeIcon icon={faPlus} /> */}
                <span>사진 추가</span>
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
            </UploadPlantWrap>
            <CaptionInput
              ref={register({
                required: 'caption is required.',
              })}
              name="caption"
              type="text"
              placeholder="Caption"
            />
            <PostButton
              type="submit"
              value={loading ? 'Loading...' : '사진 올리기'}
              disabled={!formState.isValid || loading}
            />
          </Form>
        </Layout>
      </FormWrapper>
    </Container>
  );
};

export default UploadPhotoPresenter;
