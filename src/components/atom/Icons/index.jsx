import Like from './Like';
import Bookmark from './Bookmark';
import ArrowBack from './ArrowBack';
import ArrowFront from './ArrowFront';
import Edit from './Edit';
import Delete from './Delete';
import Person from './Person';
import Add from './Add';
import Send from './Send';
import styled from '@emotion/styled';
import Common from '@/styles';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  background-color: transparent;
  &:hover {
    background-color: none;
  }

  @media ${Common.media.sm} {
    font-size: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 0.875}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 0.875}px`
        : Common.fontSize.small};
    width: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 0.875}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 0.875}px`
        : Common.fontSize.small};
    height: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 0.875}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 0.875}px`
        : Common.fontSize.small};
  }

  @media ${Common.media.md} {
    font-size: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 1.125}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 1.125}px`
        : Common.fontSize.medium};
    width: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 1.125}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 1.125}px`
        : Common.fontSize.small};
    height: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 1.125}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 1.125}px`
        : Common.fontSize.small};
  }

  @media ${Common.media.lg} {
    font-size: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 1.5}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 1.5}px`
        : Common.fontSize.large};
    width: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 1.5}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 1.5}px`
        : Common.fontSize.small};
    height: ${({ fontSize }) =>
      typeof fontSize === 'number'
        ? `${fontSize * 1.5}px`
        : typeof fontSize === 'string'
        ? `${parseInt(fontSize) * 1.5}px`
        : Common.fontSize.small};
  }
`;

const Icons = ({ children, fontSize, backgroundColor, ...props }) => {
  return (
    <Container
      fontSize={fontSize}
      backgroundColor={backgroundColor}
      style={{ ...props.style }}
      {...props}
    >
      {children}
    </Container>
  );
};

Icons.ArrowBack = ArrowBack;
Icons.ArrowFront = ArrowFront;
Icons.Edit = Edit;
Icons.Delete = Delete;
Icons.Bookmark = Bookmark;
Icons.Like = Like;
Icons.Person = Person;
Icons.Add = Add;
Icons.Send = Send;

Icons.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
};

export default Icons;
