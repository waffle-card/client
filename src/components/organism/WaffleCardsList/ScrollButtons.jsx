import React from 'react';
import styled from '@emotion/styled';
// import PropTypes from 'prop-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ScrollButtons = ({ onClickFrontButton, onClickBackButton, ...props }) => {
  return (
    <ButtonsWrap {...props}>
      <ArrowBackIosNewIcon onClick={onClickFrontButton}>
        ← 처음으로
      </ArrowBackIosNewIcon>
      <ArrowForwardIosIcon onClick={onClickBackButton}>
        맨끝으로 →
      </ArrowForwardIosIcon>
    </ButtonsWrap>
  );
};

export default ScrollButtons;

const ButtonsWrap = styled.div`
  position: relative;
  top: 3.5rem;
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
`;

// const StyledButton = styled.button`
//   color: rgba(255, 255, 255, 0.9);
//   font-size: 1rem;
//   border: none;
//   border-radius: 0.5rem;
//   outline: none;
//   padding: 0.5rem 1rem;
//   background-color: rgba(255, 255, 255, 0.07);
//   transition: all 0.3s ease;
//   &:hover {
//     background-color: rgba(255, 255, 255, 0.15);
//   }
// `;
