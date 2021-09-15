import React, { useState } from 'react';
import { faCamera, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import Input from '../../components/auth/Input';
import Button from '../../components/auth/Button';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const Form = styled.form`
  margin-top: 30px;
  @media screen and (min-width: 1280px) {
    margin-top: 100px;
  }
`;

const AvatarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  #imageUpload {
    display: none;
  }
`;

const AvatarLayer = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  svg {
    font-size: 110px;
  }
  @media screen and (max-width: 1024px) {
    svg {
      margin: 0;
      font-size: 100px;
    }
  }
`;

const Avatar = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;

const UserNameWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const UserNameInput = styled(Input)`
  width: 80%;
  width: 330px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  &::placeholder {
    font-size: 16px;
    font-weight: 400;
  }
`;
const ImageChangeBtn = styled.label`
  position: absolute;
  right: -15px;
  bottom: -5px;
  cursor: pointer;
  svg {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const SuccessBtn = styled(Button)`
  display: block;
  width: 200px;
  margin: 30px auto 0;
  /* background-color: ${props => props.theme.bgColor}; */
  /* color: #555; */

  @media screen and (min-width: 1280px) {
    &:hover {
      background-color: #333;
      color: #fff;
    }
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      id
      error
    }
  }
`;

const Modify = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });
  const [previewPhoto, setPreviewPhoto] = useState();
  const location = useLocation();
  const history = useHistory();

  const onUpdateFn = (cache, result) => {
    const {
      data: {
        editProfile: { ok },
      },
    } = result;

    // User:jake:
    // avatar: "https://hwamoak.s3.ap-northeast-2.amazonaws.com/avatars/2-1631673404160-1-1624258057821-c968f651252dd479b6e68f4dd4ec8615.jpeg"
    // id: 2
    // username: "jake"
    // __typename: "User"

    if (ok) {
      cache.modify({
        id: `User:${location?.state?.username}`,
        fields: {
          avatar(prev) {
            console.log(prev);
          },
        },
      });
    }

    history.goBack();
  };
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    update: onUpdateFn,
  });

  const onFileChange = e => {
    const {
      target: { files },
    } = e;

    //미리보기 이미지

    let reader = new FileReader();
    reader.onload = () => {
      setPreviewPhoto(reader.result);
    };
    reader.readAsDataURL(files[0]);

    return null;
  };

  const onValid = data => {
    console.log(formState);
    editProfile({
      variables: {
        username: data.username,
        avatar: data.image[0],
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <AvatarWrap>
        <AvatarLayer>
          {location?.state?.avatar || previewPhoto ? (
            <Avatar src={previewPhoto || location?.state?.avatar} />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} color="#8c8c82" />
          )}

          <ImageChangeBtn htmlFor="imageUpload">
            <FontAwesomeIcon icon={faCamera} />
          </ImageChangeBtn>
          <input
            id="imageUpload"
            ref={register({
              required: 'Image is required.',
            })}
            name="image"
            type="file"
            accept=" .jpg, .png"
            multiple
            onChange={onFileChange}
          />
        </AvatarLayer>
      </AvatarWrap>
      <UserNameWrap>
        <UserNameInput
          ref={register({ required: false })}
          name="username"
          type="text"
          placeholder="닉네임"
          defaultValue={location?.state?.username}
        />
      </UserNameWrap>
      <SuccessBtn
        type="submit"
        value={loading ? 'Loading...' : '완료'}
        disabled={!formState.isValid || loading}
      />
    </Form>
  );
};

export default Modify;
