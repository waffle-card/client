import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';

const Text = ({
  children,
  block = true,
  paragraph = false,
  size = Common.fontSize.base,
  weight = Common.fontWeight.medium,
  color = Common.colors.primary,
  underline = false,
  del = false,
  ...props
}) => {
  if (!underline && del) {
    children = <del>{children}</del>;
  }

  if ((typeof weight === 'number' && weight < 100) || weight > 900) {
    console.warn('Text only accept`100~900` as `weight` value');
    weight = weight < 100 ? 100 : weight > 900 ? 900 : weight;
  }

  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  const StyledTag = styled(Tag)`
    font-size: ${({ size }) => (typeof size === 'number' ? `${size}px` : size)};
    font-weight: ${({ weight }) => weight};
    color: ${({ color }) => color};
    text-decoration: ${({ underline, del }) =>
      !del && underline ? 'underline' : undefined};
  `;

  return (
    <StyledTag
      size={size}
      weight={weight}
      color={color}
      underline={underline}
      del={del}
      {...props}>
      {children}
    </StyledTag>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  block: PropTypes.bool,
  paragraph: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  underline: PropTypes.bool,
  del: PropTypes.bool,
};

export default Text;
