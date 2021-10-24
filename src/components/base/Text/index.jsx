import PropTypes from 'prop-types';

const Text = ({
  children,
  block,
  paragraph,
  size,
  weight,
  underline,
  delete: del,
  color,
  ...props
}) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  if ((typeof weight === 'number' && weight < 100) || weight > 900) {
    console.warn('Text only accept`100~900` as `weight` value');
    weight = weight < 100 ? 100 : weight > 900 ? 900 : weight;
  }

  if (del) {
    children = <del>{children}</del>;
  }

  const fontStyle = {
    fontSize: typeof size === 'number' ? `${size}px` : size,
    fontWeight: weight,
    textDecoration: underline ? 'underline' : undefined,
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
