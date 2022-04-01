import { useReactiveVar } from '@apollo/client';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar, logUserOut } from 'apollo';
import useUser from 'hooks/useUser';
import routes from 'Routes/routes';
import Avatar from '../common/Avatar';
import Logo from 'assets/hwamoak_logo.png';
import addPlantImg from 'assets/addPlant.png';

import { useContext, useEffect, useState } from 'react';
import { CurrentContext } from 'Context/ContextStore';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor2};
  background-color: ${props => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  padding: 0 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${props => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

const SLogo = styled.img`
  display: block;
  width: 40px;
  margin: 0 auto;
`;

const ProfileIcon = styled(Icon)`
  position: relative;
`;

const ProfileMenu = styled.ul`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100px;
  padding: 5px 10px;
  border-radius: 5px;
  background: ${props => props.theme.beige2};
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  li {
    margin: 5px 0;
  }
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const { seedLoggedIn } = useContext(CurrentContext);
  const [profileMenu, setProfileMenu] = useState(false);
  useEffect(() => {
    window.addEventListener('click', e => {
      if (
        e.target.parentElement?.classList[4] !== 'profile-icon' &&
        profileMenu
      ) {
        setProfileMenu(false);
      }
    });
  }, [profileMenu]);

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to="/">
            <h1>
              <SLogo src={Logo} alt="화목" />
            </h1>
          </Link>
        </Column>
        <Column>
          {
            isLoggedIn ? (
              <IconContainer>
                <Icon>
                  <Link to="/photo/upload">
                    <FontAwesomeIcon icon={faCamera} size="lg" />
                  </Link>
                </Icon>
                {seedLoggedIn && (
                  <Icon>
                    <Link to="/plant/upload">
                      <img src={addPlantImg} alt="addPlant" />
                    </Link>
                  </Icon>
                )}
                <ProfileIcon
                  onClick={() => setProfileMenu(!profileMenu)}
                  className="profile-icon"
                >
                  {data?.me?.avatar ? (
                    <Avatar url={data?.me?.avatar} />
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                  {profileMenu && (
                    <ProfileMenu>
                      <li>
                        <Link to={`/users/${data?.me?.username}`}>
                          프로필 보기
                        </Link>
                      </li>
                      <li>
                        <button onClick={() => logUserOut()}>
                          로그아웃
                        </button>
                      </li>
                    </ProfileMenu>
                  )}
                </ProfileIcon>
              </IconContainer>
            ) : null
            // <Link to={routes.home}>
            //   <Button>로그인</Button>
            // </Link>
          }
        </Column>
      </Wrapper>
    </SHeader>
  );
};
export default Header;
