import styled from '@emotion/styled';
import Common from '@/styles';
import type { TextProps } from './Text.type';

const Text = ({
  children,
  block = false,
  paragraph = true,
  size = Common.fontSize.base,
  weight = Common.fontWeight.medium,
  color = Common.colors.primary,
  underline = false,
  del = false,
  ...props
}: TextProps): JSX.Element => {
  if (!underline && del) {
    children = <del>{children}</del>;
  }

  if ((typeof weight === 'number' && weight < 100) || weight > 900) {
    console.warn('Text only accept`100~900` as `weight` value');
    weight = weight < 100 ? 100 : weight > 900 ? 900 : weight;
  }

  const Tag = block ? 'div' : paragraph ? 'p' : 'span';

  const StyledTag = styled(Tag)<TextProps>`
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
      {...props}
    >
      {children}
    </StyledTag>
  );
};

export default Text;
