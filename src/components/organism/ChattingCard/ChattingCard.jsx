import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { Modal } from '@components';
import Header from './Header';
import CommentEditor from './CommentEditor';
import CommentList from './CommentList';

const ChattingCard = ({ children, visible, ...props }) => {
  return (
    <StyledModal visible>
      <Header />
      <CommentList />
      <CommentEditor />
    </StyledModal>
  );
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
