import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../../assets/images/logoCallBlack.jpeg';

export const Image = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 100px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Logo() {
  return (
    <Container>
      <Image src={logo} />
    </Container>
  );
}

Logo.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
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
