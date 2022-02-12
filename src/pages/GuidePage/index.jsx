import React from 'react';
import { Portal, GuideSlider } from '@components';
import styled from '@emotion/styled';
// import Common from '@styles';
import { GUIDE_SLIDE_DATA } from '@constants';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

const GuidePage = () => {
  const navigate = useNavigate();
  // const [slideIndex, setSlideIndex] = useState(1);

  // const handleClickPrev = () => {};
  // const handleClickNext = () => {};
  const handleClickClose = () => {
    navigate(-1);
    console.log(GUIDE_SLIDE_DATA);
  };

  return (
    <Portal>
      <BackgroundDim>
        <StyledClearIcon
          onClick={handleClickClose}
          style={{ color: '#fff' }}></StyledClearIcon>
        <GuideSlider></GuideSlider>
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
`;

const StyledClearIcon = styled(ClearIcon)`
  position: absolute;
  top: 10%;
  right: 4%;
`;

export default GuidePage;
