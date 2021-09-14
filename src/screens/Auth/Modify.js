import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Input from '../../components/auth/Input';

const Container = styled.form`
  margin-top: 30px;
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

const Modify = () => {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });
  // const [imgLoading, setImgLoading] = useState(false);

  const onValid = () => {};

  const location = useLocation();

  return (
    <Container onSubmit={handleSubmit(onValid)}>
      <AvatarWrap>
        <AvatarLayer>
          <Avatar src={location?.state?.avatar} />

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
            // onChange={onFileChange}
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
    </Container>
  );
};

export default Modify;
