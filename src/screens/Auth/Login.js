import { gql, useMutation } from '@apollo/client';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { logUserIn } from 'apollo';
import AuthLayout from 'components/auth/AuthLayout';
import BottomBox from 'components/auth/BottomBox';
import Button from 'components/auth/Button';
import FormBox from 'components/auth/FormBox';
import FormError from 'components/auth/FormError';
import Input from 'components/auth/Input';
import Notification from 'components/auth/Notification';
import Separator from 'components/auth/Separator';
import { PageTitle } from 'components/PageTitle';
// import Logo from 'assets/flower-pot.png';
import Logo from 'assets/hwamoak_logo.png';
import routes from 'components/Routes/routes';

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

const FacebookLogin = styled.div`
  color: #385285;
  display: flex;
  justify-content: center;
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();
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
  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <SLogo src={Logo} alt="화목" />
        </div>
        <Notification message={location?.state?.message} />
        <form onSubmit={handleSubmit(onSubmitValid)}>
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
          <SNSTitle>SNS 계정으로 간편로그인</SNSTitle>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebook} />
          </FacebookLogin>
        </SNSContainer>
      </FormBox>
      <BottomBox
        cta="계정이 아직 없으신가요?"
        linkText="회원가입"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
