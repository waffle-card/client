import { useCallback } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  children,
  size = 'small',
  color = 'yellow',
  onClick,
  ...props
}) => {
  const handleClick = useCallback(() => {
    onClick && onClick();
  }, [onClick]);

  return (
    <button {...props} className={`${size} ${color}`} onClick={handleClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Button;
