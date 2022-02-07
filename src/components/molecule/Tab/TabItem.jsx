import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { rgba } from 'polished';

const TabItem = ({
  title,
  name,
  active,
  height,
  pointColor,
  fontSize,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    onClick && onClick(name);
  };
  return (
    <TabItemWrapper active={active} onClick={handleClick} {...props}>
      <LinkBox>
        <TabItemTitle
          active={active}
          pointColor={pointColor}
          fontSize={fontSize}
          height={height}
          {...props}>
          {title}
        </TabItemTitle>
      </LinkBox>
    </TabItemWrapper>
  );
};

TabItem.defaultProps = {
  active: false,
  onClick: () => {},
};

TabItem.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

const TabItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 3);
  min-height: 25px;
  cursor: pointer;
`;

const TabItemTitle = styled.span`
  display: flex;
  width: 100%;
  height: ${({ height }) => `${height}px`};
  @media ${Common.media.sm} {
    height: ${({ height }) => `${height * 0.68}px`};
  }
  justify-content: center;
  align-items: center;
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : fontSize};
  font-weight: ${({ active }) =>
    active ? Common.fontWeight.bold : Common.fontWeight.regular};
  color: ${({ active, pointColor }) =>
    active ? pointColor : rgba(255, 205, 100, 0.75)};
  transition: color 0.2s ease-out;
  z-index: 1;
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
  }
`;

const LinkBox = styled.div`
  display: block;
  width: 100%;
`;

export default TabItem;
