import { PropTypes } from 'prop-types';
const { Helmet } = require('react-helmet-async');

export const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title> 화목 | {title} </title>
    </Helmet>
  );
};

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
