import Like from './Like';
import Favorite from './Favorite';
import ArrowBack from './ArrowBack';
import ArrowFront from './ArrowFront';
import Edit from './Edit';
import Delete from './Delete';
import Person from './Person';
import Add from './Add';
import styled from '@emotion/styled';
import Common from '@styles';

const Container = styled.div`
  display: flex;
  background-color: transparent;
  &:hover {
    background-color: none;
  }

  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.small};
  }
  @media ${Common.media.md} {
    font-size: ${Common.fontSize.medium};
  }
  @media ${Common.media.lg} {
    font-size: ${Common.fontSize.large};
  }
`;

const Icons = ({ children, backgroundColor, ...props }) => {
  return (
    <Container
      backgroundColor={backgroundColor}
      style={{ ...props.style }}
      {...props}>
      {children}
    </Container>
  );
};

Icons.ArrowBack = ArrowBack;
Icons.ArrowFront = ArrowFront;
Icons.Edit = Edit;
Icons.Delete = Delete;
Icons.Favorite = Favorite;
Icons.Like = Like;
Icons.Person = Person;
Icons.Add = Add;

export default Icons;
