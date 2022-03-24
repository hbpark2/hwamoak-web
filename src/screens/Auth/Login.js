import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import KaKaoLogin from 'react-kakao-login';
import { logUserIn } from 'apollo';
import AuthLayout from 'components/auth/AuthLayout';
import BottomBox from 'components/auth/BottomBox';
import Button from 'components/auth/Button';
import FormBox from 'components/auth/FormBox';
import FormError from 'components/auth/FormError';
import Input from 'components/auth/Input';
import Notification from 'components/auth/Notification';
import Separator from 'components/auth/Separator';
import { PageTitle } from 'components/common/PageTitle';
import Logo from 'assets/hwamoak_logo.png';
import routes from 'Routes/routes';
import KakaoBtnImg from 'assets/kakao_login_btn.png';
import { LOGIN_MUTATION } from '../../Scheme/userScheme';

const SLogo = styled.img`
  display: block;
  /* width: 40px; */
  width: 115px;
  margin: 0 auto;
`;

const SNSContainer = styled.div`
  svg {
    font-size: 35px;
  }
`;
const SNSTitle = styled.span`
  display: block;
  margin-bottom: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  opacity: 0.7;
`;

const IconContainer = styled.div`
  padding: 5px 0;
`;

// const FacebookLogin = styled.div`
//   color: #385285;
//   display: flex;
//   justify-content: center;
//   margin-bottom: 10px;
// `;

const KaKaoBtn = styled(KaKaoLogin)`
  all: none !important;
  cursor: pointer;
`;

function Login() {
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: location?.state?.email || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = data => {
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
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = data => {
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    login({
      variables: { email, password },
    });
  };

  const clearLoginError = () => {
    clearErrors('result');
  };

  // 카카오 로그인
  const onKakaoLoginSuccess = async response => {
    console.log(response);
    if (errors?.result?.message === '일치하는 가입정보가 없습니다.') {
      history.push({
        pathname: '/sign-up',
        state: {
          username: response?.profile?.kakao_account?.profile?.nickname,
          email: response?.profile?.kakao_account?.email,
        },
      });
    }

    // already have same email
    await login({
      variables: {
        email: response?.profile?.kakao_account?.email,
        password: '1234',
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <SLogo src={Logo} alt="화목" />
        </div>

        {/** Notification when do SignUp successfuly */}
        <Notification message={location?.state?.message} />
        <form onSubmit={handleSubmit(onSubmitValid)} method="post">
          <Input
            ref={register({
              required: 'email is required',
              minLength: {
                value: 3,
                message: 'email should be longer than 5 chars.',
              },
            })}
            onChange={clearLoginError}
            name="email"
            type="text"
            placeholder="이메일"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              required: 'Password is required.',
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="비밀번호"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? 'Loading...' : '로그인'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <SNSContainer>
          <SNSTitle>SNS 계정으로 간편로그인 / 회원가입</SNSTitle>
          <IconContainer>
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
          </IconContainer>
        </SNSContainer>
      </FormBox>
      <BottomBox
        cta="계정이 아직 없으신가요?"
        linkText="회원가입"
        link={routes.signUp}
        // isSignup={true}
      />
    </AuthLayout>
  );
}
export default Login;
