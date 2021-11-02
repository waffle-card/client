import styled from '@emotion/styled';
import Common from '@styles';

const Input = styled.input`
  display: block;
  padding: 0 16px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid white;
  color: white;
  background-color: transparent;
  @media ${Common.media.sm} {
    height: 46px;
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    height: 52px;
    font-size: ${Common.fontSize.medium};
  }
  @media ${Common.media.lg} {
    height: 56px;
    font-size: ${Common.fontSize.large};
  }

  &:focus {
    border: 2px solid;
    border-color: ${Common.colors.point};
    outline-width: 0;
  }
`;

export default Input;
