import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import useToggle from '@hooks/useToggle';
import styled from '@emotion/styled';

const StyleIcon = styled(Icon)`
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : { fontSize }};
  color: ${({ color }) => color};
`;

const Like = ({
  fontSize = '24px',
  color = 'white',
  active = false,
  onClick,
  ...props
}) => {
  const [liked, toggle] = useToggle(active);

  const handleClick = e => {
    toggle();
    onClick && onClick(e);
  };

  return (
    <StyleIcon
      fontSize={fontSize}
      color={color}
      style={{ ...props.style }}
      onClick={handleClick}
      {...props}>
      {liked ? `favorite` : `favorite_border`}
    </StyleIcon>
  );
};

Like.propTypes = {
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Like;
