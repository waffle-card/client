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
      <StyledCommentList />
      <StyledCommentEditor />
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 92vh;

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

const StyledCommentList = styled(CommentList)`
  margin: 1rem 1rem 116px 1rem;
`;

const StyledCommentEditor = styled(CommentEditor)`
  position: absolute;
  width: 100%;
  bottom: 0px;
`;

ChattingCard.propTypes = {
  visible: PropTypes.bool,
};

ChattingCard.defaultProps = {
  visible: false,
};

export default ChattingCard;
