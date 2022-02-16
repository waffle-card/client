import styled from '@emotion/styled';
import Common from '@/styles';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background-color: ${Common.colors.background};
`;

export const BackIcon = styled(ArrowBackIosRoundedIcon)`
  color: ${Common.colors.primary};
`;
