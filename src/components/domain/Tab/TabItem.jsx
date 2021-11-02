import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { rgba } from 'polished';
import { Link, useHistory } from 'react-router-dom';

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
    active ? pointColor : rgba(pointColor, 0.35)};
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

const TabItem = ({
  title,
  index,
  param,
  active,
  height,
  pointColor,
  fontSize,
  ...props
}) => {
  const history = useHistory();
  return (
    <TabItemWrapper active={active} {...props}>
      <LinkBox
        onClick={() => {
          history.push(`/cards/${param}`);
        }}>
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
  __TYPE: 'Tab.Item',
};

TabItem.propTypes = {
  __TYPE: PropTypes.oneOf(['Tab.Item']),
  title: PropTypes.string.isRequired,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  active: PropTypes.bool,
};

export default TabItem;
