import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@styles';
import { rgba } from 'polished';

const TabItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 3);
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height};
  min-height: 25px;
  cursor: pointer;
`;

const TabItemTitle = styled.span`
  font-size: ${({ fontSize }) =>
    typeof fontSize === 'number' ? `${fontSize}px` : fontSize};
  font-weight: ${({ active }) =>
    active ? Common.fontWeight.bold : Common.fontWeight.regular};
  color: ${({ active, pointColor }) =>
    active ? pointColor : rgba(pointColor, 0.35)};
  transition: color 0.2s ease-out;
  z-index: 1;
`;

const TabItem = ({
  title,
  index,
  active,
  height,
  pointColor,
  fontSize,
  ...props
}) => {
  return (
    // 여기에 클릭 이벤트로 메뉴 별 페이지 라우터 달면 된다
    <TabItemWrapper active={active} {...props} height={height}>
      <TabItemTitle active={active} pointColor={pointColor} fontSize={fontSize}>
        {title}
      </TabItemTitle>
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
