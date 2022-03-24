import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from 'components/common/shared';
import KakaoBtnImg from 'assets/kakao_login_medium_narrow.png';
import { useHistory } from 'react-router';

const SignUpText = styled.span`
  display: block;
`;

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${props => props.theme.accent};
  }
`;
const SnsBottomBox = styled(SBottomBox)`
  a {
    display: block;
  }
`;

const KakaoBtn = styled.button`
  cursor: pointer;
`;

const BottomBox = ({ cta, link, linkText, isSignup }) => {
  const { Kakao } = window;
  const history = useHistory();

  const onKakaobtnClick = async () => {
    await Kakao.API.request({
      url: '/v2/user/me',
      data: {
        property_keys: [
          'kakao_account.email',
          'kakao_account.profile.nickname',
        ],
      },
      success: function (response) {
        console.log(response);
        history.push({
          pathname: '/sign-up',
          state: {
            username: response.kakao_account.profile.nickname,
            email: response.kakao_account.email,
          },
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  return isSignup ? (
    <SnsBottomBox>
      <SignUpText>{cta}</SignUpText>
      <Link to={link}>{linkText}</Link>
      <KakaoBtn onClick={onKakaobtnClick}>
        <img src={KakaoBtnImg} alt="kakao" />
      </KakaoBtn>
    </SnsBottomBox>
  ) : (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

export default BottomBox;
