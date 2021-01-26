import styled from 'styled-components';
import logo from '../../../assets/images/logo.jpeg'

import React from 'react';
import PropTypes from 'prop-types';

export const Image = styled.img`
    width: 120px;
    border-radius: 100px;
`

function Logo() {
  return (
    <div>
      <Image src={logo} />
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;