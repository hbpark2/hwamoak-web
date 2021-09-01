import styled from 'styled-components';

const Content = styled.main`
  margin: 0 auto;
  /* margin-top: 45px; */
  padding-top: 45px;
  max-width: 930px;
  width: 100%;
  @media screen and (max-width: 1279px) {
    padding-top: 25px;
  }
`;

const Layout = ({ children }) => {
  return <Content>{children}</Content>;
};

export default Layout;
