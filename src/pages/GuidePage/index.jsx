import React from 'react';
import { Portal, GuideSlider } from '@components';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { GUIDE_SLIDE_DATA } from '@constants';

const GuidePage = () => {
  const navigate = useNavigate();

  const handleClickClose = () => {
    console.log('close');
    navigate(-1);
  };

  return (
    <Portal>
      <BackgroundDim>
        <StyledClearIcon onClick={handleClickClose} style={{ color: '#fff' }} />
        <GuideSlider
          slideData={GUIDE_SLIDE_DATA}
          maxLength={Object.keys(GUIDE_SLIDE_DATA).length}></GuideSlider>
      </BackgroundDim>
    </Portal>
  );
};

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  flex-direction: column;
`;

const StyledClearIcon = styled(ClearIcon)`
  position: absolute;
  top: 10%;
  right: 4%;
  z-index: 1;
`;

export default GuidePage;
