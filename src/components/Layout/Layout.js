import styled from 'styled-components';

const Content = styled.main`
  margin: 0 auto;
  /* margin-top: 45px; */
  padding-top: 45px;
  max-width: 930px;
  width: 100%;
`;

const Layout = ({ children }) => {
  return <Content>{children}</Content>;
};

export default Layout;
