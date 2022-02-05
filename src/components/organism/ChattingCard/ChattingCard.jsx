import styled from '@emotion/styled';
import { Modal } from '@components';
import Common from '@styles';
import PropTypes from 'prop-types';

const ChattingCard = ({ children, visible, ...props }) => {
  return <StyledModal></StyledModal>;
};

const StyledModal = styled(Modal)`
  height: 92vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media ${Common.media.sm} {
    width: 290px;
  }

  @media ${Common.media.md} {
    width: 688px;
  }

  @media ${Common.media.lg} {
    width: 740px;
  }
`;

ChattingCard.propTypes = {
  visible: PropTypes.bool,
};

ChattingCard.defaultProps = {
  visible: false,
};

export default ChattingCard;
