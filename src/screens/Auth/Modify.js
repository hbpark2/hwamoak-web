/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { faCamera, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';
import Input from '../../components/auth/Input';
import Button from '../../components/auth/Button';
import { useMutation, gql } from '@apollo/client';
import FormError from '../../components/auth/FormError';

import Asset from 'assets/sakura.png';
import { EDIT_PROFILE_MUTATION } from '../../Scheme/userScheme';

const Form = styled.form`
  margin: 25px auto;
  margin-top: 30px;
  max-width: 930px;
  @media screen and (min-width: 1280px) {
    margin-top: 100px;
  }
`;

const AvatarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 40px;
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

const ImageDeleteBtn = styled.button`
  display: block;
  padding: 10px;
  margin: 0 auto 20px;
  cursor: pointer;
  font-weight: 600;
`;

const Modify = () => {
  const { register, handleSubmit, errors, setError, clearErrors, formState } =
    useForm({
      mode: 'onChange',
    });
  const [avatarReset, setAvatarReset] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState();
  const [username, setUsername] = useState();
  const location = useLocation();
  const history = useHistory();

  const onUpdateFn = (cache, result) => {
    const {
      data: {
        editProfile: { ok, error },
      },
    } = result;

    if (!ok) {
      return setError('result', {
        message: error,
      });
    }

    if (ok) {
      cache.modify({
        id: `User:${location?.state?.username}`,
        fields: {
          avatar(prev) {
            console.log(prev);
          },
          username(prev) {
            console.log(prev);
          },
        },
      });
      history.push(`/users/${username}`);
    } else {
      console.log(ok);
      console.log(error);
    }
  };

  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    update: onUpdateFn,
  });

  const onFileChange = (e, reset) => {
    const {
      target: { files },
    } = e;

    if (reset) {
      setAvatarReset(true);
      return null;
    }

    //미리보기 이미지

    let reader = new FileReader();
    reader.onload = () => {
      setPreviewPhoto(reader.result);
    };

    reader.readAsDataURL(files[0]);

    return null;
  };

  const onValid = data => {
    console.log(data.image[0]);
    setUsername(data.username);
    editProfile({
      variables: {
        username: data.username,
        avatar: avatarReset ? null : data.image[0],
      },
    });
  };

  const onDeleteBtn = e => {
    e.preventDefault();
    setPreviewPhoto(Asset);
    onFileChange(e, true);
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
              required: false,
              // required: 'Image is required.',
            })}
            name="image"
            type="file"
            accept=" .jpg, .png"
            multiple
            onChange={onFileChange}
          />
        </AvatarLayer>
      </AvatarWrap>
      {/* <ImageDeleteBtn onClick={onDeleteBtn}>기본이미지로 변경</ImageDeleteBtn> */}
      <UserNameWrap>
        <UserNameInput
          ref={register({ required: false })}
          name="username"
          type="text"
          placeholder="닉네임"
          defaultValue={location?.state?.username}
          onChange={() => clearErrors()}
        />
      </UserNameWrap>

      <FormError message={errors?.result?.message} />

      <SuccessBtn
        type="submit"
        value={loading ? 'Loading...' : '완료'}
        disabled={!formState.isValid || loading}
      />
    </Form>
  );
};

export default Modify;
