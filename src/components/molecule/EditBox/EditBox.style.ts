import styled from '@emotion/styled';
import { EditRounded, DeleteRounded } from '@mui/icons-material';
import Common from '@/styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3e4857;
  border-radius: 8px;
  opacity: 0.8;
  gap: 4px;

  @media ${Common.media.sm} {
    width: 40px;
    height: 20px;
  }
  @media ${Common.media.md} {
    width: 50px;
    height: 25px;
  }
  @media ${Common.media.lg} {
    width: 60px;
    height: 30px;
  }
`;

export const EditIcon = styled(EditRounded)`
  font-size: 1.5rem;
  color: ${Common.colors.primary};
  cursor: pointer;
`;

export const DeleteIcon = styled(DeleteRounded)`
  font-size: 1.5rem;
  color: ${Common.colors.primary};
  cursor: pointer;
`;
