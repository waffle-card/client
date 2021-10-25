import PropTypes from 'prop-types';
import { Common } from '../../../style/common';

const Text = ({
  children,
  block = false,
  paragraph = true,
  size = Common.fontSize.base,
  weight = Common.fontWeight.medium,
  underline = false,
  delete: del = false,
  color = Common.colors.primary,
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  if ((typeof weight === 'number' && weight < 100) || weight > 900) {
    console.warn('Text only accept`100~900` as `weight` value');
    weight = weight < 100 ? 100 : weight > 900 ? 900 : weight;
  }

  if (!underline && del) {
    children = <del>{children}</del>;
  }

  const fontStyle = {
    fontSize: typeof size === 'number' ? `${size}px` : size,
    fontWeight: weight,
    textDecoration: !del && underline ? 'underline' : undefined,
    color,
  };

  return (
    <Tag style={{ ...props.style, ...fontStyle }} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  delete: PropTypes.bool,
  underline: PropTypes.bool,
  color: PropTypes.string,
};

export default Text;
