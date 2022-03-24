import { gql, useMutation } from '@apollo/client';
import FormError from 'Components/auth/FormError';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from 'Components/auth/AuthLayout';
import BottomBox from 'Components/auth/BottomBox';
import Button from 'Components/auth/Button';
import FormBox from 'Components/auth/FormBox';
import Input from 'Components/auth/Input';
import { PageTitle } from 'Components/common/PageTitle';
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
          <SLogo src={Logo} alt="화목" />
          <Subtitle>화목에 오신 것을 환영합니다 :)</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputBox disable={location?.state?.username}>
            <SInput
              ref={register({
                required: false,
              })}
              name="firstName"
              type="text"
              placeholder="이름"
            />
          </InputBox>
          <InputBox disable={location?.state?.username}>
            <SInput
              ref={register({
                required: false,
              })}
              type="text"
              placeholder="성"
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
              placeholder="이메일"
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
              placeholder="아이디"
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
              placeholder="비밀번호"
            />
          </InputBox>

          <Button
            type="submit"
            value={loading ? 'Loading...' : '회원가입'}
            disabled={!formState.isValid || loading}
          />
          {/* <Separator />
          <SNSContainer>
            <SNSTitle>SNS 계정으로 간편 회원가입</SNSTitle>
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
        cta="이미 계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
}
export default SingUp;
