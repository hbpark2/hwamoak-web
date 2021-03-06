import { gql, useMutation } from '@apollo/client';
import FormError from 'components/auth/FormError';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from 'components/auth/AuthLayout';
import BottomBox from 'components/auth/BottomBox';
import Button from 'components/auth/Button';
import FormBox from 'components/auth/FormBox';
import Input from 'components/auth/Input';
import { PageTitle } from 'components/common/PageTitle';
import routes from 'Routes/routes';
import Logo from 'assets/hwamoak_logo.png';

import { useEffect } from 'react';
import { logUserIn } from '../../apollo';
import {
  LOGIN_MUTATION,
  CREATE_ACCOUNT_MUTATION,
} from '../../Scheme/userScheme';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled.h2`
  font-weight: 600;
  color: rgb(142, 142, 142);
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SLogo = styled.img`
  display: block;
  /* width: 40px; */
  width: 115px;
  margin: 0 auto;
`;

const InputBox = styled.div`
  display: ${props => props.disable && 'none'};
  width: 100%;
  margin-bottom: 10px;
`;
const SInput = styled(Input)``;

function SingUp() {
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    errors,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
  });
  const onCompleted = data => {
    const { lastName, email, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError('result', {
        message: error,
      });
    }

    if (password === '1234' && lastName === '') {
      console.log('kakao login');
      login({
        variables: {
          email,
          password: '1234',
        },
      });
    } else {
      history.push(routes.home, {
        message: 'Account created. Please log in.',
        email,
        password,
      });
    }
  };

  const onLoginCompleted = data => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError('result', {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
      history.push('/');
    }
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: onLoginCompleted,
  });

  const onSubmitValid = data => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (location?.state?.username) {
      if (location?.state?.username && location?.state?.email) {
        createAccount({
          variables: {
            firstName: '',
            lastName: '',
            username: location?.state?.username,
            email: location?.state?.email,
            password: '1234',
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <SLogo src={Logo} alt="??????" />
          <Subtitle>????????? ?????? ?????? ??????????????? :)</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputBox disable={location?.state?.username}>
            <SInput
              ref={register({
                required: false,
              })}
              name="firstName"
              type="text"
              placeholder="??????"
            />
          </InputBox>
          <InputBox disable={location?.state?.username}>
            <SInput
              ref={register({
                required: false,
              })}
              type="text"
              placeholder="???"
              name="lastName"
            />
          </InputBox>

          <InputBox>
            <SInput
              ref={register({
                required: 'Email is required.',
              })}
              name="email"
              type="text"
              placeholder="?????????"
              defaultValue={location?.state?.email}
              readOnly={location?.state?.email}
            />
          </InputBox>
          <InputBox>
            <SInput
              ref={register({
                required: 'Username is required.',
              })}
              name="username"
              type="text"
              placeholder="?????????"
              defaultValue={location?.state?.username}
              onChange={() => clearErrors()}
            />
          </InputBox>

          <InputBox disable={location?.state?.username}>
            <SInput
              ref={register({
                required: location?.state?.username
                  ? false
                  : 'Password is required.',
              })}
              defaultValue={location?.state?.username ? '1234' : ''}
              name="password"
              type="password"
              autoComplete="false"
              placeholder="????????????"
            />
          </InputBox>

          <Button
            type="submit"
            value={loading ? 'Loading...' : '????????????'}
            disabled={!formState.isValid || loading}
          />
          {/* <Separator />
          <SNSContainer>
            <SNSTitle>SNS ???????????? ?????? ????????????</SNSTitle>
            <KaKaoBtn
              style={{
                background: 'none',
                width: 'auto',
              }}
              token={'262a66aa6a22631cd2aed750d572fa37'}
              onSuccess={onKakaoLoginSuccess}
              onFail={error => console.log(error)}
              // onLogout={}
            >
              <img src={KakaoBtnImg} alt="kakao" />
            </KaKaoBtn>
          </SNSContainer> */}
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>

      <BottomBox
        cta="?????? ????????? ????????????????"
        linkText="?????????"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SingUp;
