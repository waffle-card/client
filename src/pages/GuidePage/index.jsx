import { Portal, GuideSlider } from '@/components';
import styled from '@emotion/styled';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import Common from '@/styles';

const GuidePage = () => {
  const navigate = useNavigate();

  const handleClickClose = () => {
    navigate(-1);
  };

  return (
    <Portal>
      <BackgroundDim>
        <StyledClearIcon onClick={handleClickClose} />
        <GuideSlider />
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
  top: 12.5%;
  right: 6.5%;
  box-sizing: content-box;
  font-size: 1.5rem;
  border-radius: 50px;
  padding: 0.4rem;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 1;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.43);
  }
  @media ${Common.media.md} {
    top: 15%;
  }
  @media ${Common.media.sm} {
    top: 15%;
    right: 1rem;
    font-size: 0.9rem;
    padding: 0.25rem;
  }
`;

export default GuidePage;
