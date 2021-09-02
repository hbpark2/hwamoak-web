import { gql, useMutation } from '@apollo/client';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from 'components/auth/AuthLayout';
import BottomBox from 'components/auth/BottomBox';
import Button from 'components/auth/Button';
import FormBox from 'components/auth/FormBox';
import Input from 'components/auth/Input';
import { PageTitle } from 'components/PageTitle';
import routes from 'components/Routes/routes';
import Logo from 'assets/hwamoak_logo.png';

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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SingUp() {
  const history = useHistory();
  const onCompleted = data => {
    const { email, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: 'Account created. Please log in.',
      email,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
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
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <SLogo src={Logo} alt="logo" />
          <Subtitle>화목에 오신 것을 환영합니다 :)</Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: 'First Name is required.',
            })}
            name="firstName"
            type="text"
            placeholder="이름"
          />
          <Input ref={register} type="text" placeholder="성" name="lastName" />
          <Input
            ref={register({
              required: 'Email is required.',
            })}
            name="email"
            type="text"
            placeholder="이메일"
          />
          <Input
            ref={register({
              required: 'Username is required.',
            })}
            name="username"
            type="text"
            placeholder="별명"
          />
          <Input
            ref={register({
              required: 'Password is required.',
            })}
            name="password"
            type="password"
            placeholder="비밀번호"
          />
          <Button
            type="submit"
            value={loading ? 'Loading...' : '회원가입'}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="이미 계정이 있으신가요?" linkText="로그인" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;
