import Like from './Like';
import Favorite from './Favorite';
import ArrowBack from './ArrowBack';
import ArrowFront from './ArrowFront';
import Edit from './Edit';
import Delete from './Delete';
import Person from './Person';
import Add from './Add';
import styled from '@emotion/styled';

const Container = styled.div`
  display: inline-flex;
  cursor: pointer;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : `transparent`};
  margin: 10px;
  &:hover {
    background-color: none;
  }
`;

const Icons = ({ children, backgroundColor, ...props }) => {
  return (
    <Container backgroundColor={backgroundColor} {...props}>
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
