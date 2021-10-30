import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyleIcon = styled(Icon)`
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : { fontSize }};
  color: ${({ color }) => color};
`;

const Person = ({ fontSize = '24px', color = 'white', ...props }) => {
  return (
    <StyleIcon
      fontSize={fontSize}
      color={color}
      style={{ ...props.style }}
      {...props}>
      person
    </StyleIcon>
  );
};

Person.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

export default Person;
