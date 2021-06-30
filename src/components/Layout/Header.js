import { useReactiveVar } from '@apollo/client';
import { faCompass } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar } from 'apollo';
import useUser from 'hooks/useUser';
import routes from 'components/Routes/routes';
import Avatar from '../Avatar';
// import Logo from 'assets/flower-pot.png';
import Logo from 'assets/hwamoak_logo.png';

import { useContext } from 'react';
import { CurrentContext } from 'Context/ContextStore';

//

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  background-color: ${props => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
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

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const { seedLoggedIn } = useContext(CurrentContext);

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to="/">
            <SLogo src={Logo} alt="logo" />
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconContainer>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
              {seedLoggedIn && (
                <Icon>
                  <Link to="/upload_plant">uploadPlants</Link>
                </Icon>
              )}
            </IconContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};
export default Header;