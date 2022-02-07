import React from 'react';
// import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
// import { rgba } from 'polished';
import Common from '@styles';
import TabItem from './TabItem';

// const childrenToArray = (children, types) => {
//   return React.Children.toArray(children).filter(element => {
//     if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
//       return true;
//     } else {
//       console.warn(
//         `Only accepts ${
//           Array.isArray(types) ? types.join(', ') : types
//         } as it's children.`,
//       );
//       return false;
//     }
//   });
// };

const Tab = ({
  height = 47,
  backgroundColor = Common.colors.background_menu,
  pointColor = Common.colors.primary,
  shadowStyle = Common.shadow.menu,
  fontSize = Common.fontSize.medium,
  onClick,
  ...props
}) => {
  // const currentUrlArr = window.location.pathname.split('/');

  // const [currentActive, setCurrentActive] = useState(() => {
  //   if (
  //     currentUrlArr.includes('today') ||
  //     currentUrlArr.includes('my') ||
  //     currentUrlArr.includes('like')
  //   ) {
  //     const currentActiveElement = childrenToArray(children, 'Tab.Item').filter(
  //       element => currentUrlArr.includes(element.props.param),
  //     );
  //     return currentActiveElement[0].props.index;
  //   } else {
  //     const index = childrenToArray(children, 'Tab.Item')[0].props.index;
  //     return index;
  //   }
  // });

  // const items = useMemo(() => {
  //   return childrenToArray(children, 'Tab.Item').map(element => {
  //     return React.cloneElement(element, {
  //       ...props,
  //       ...element.props,
  //       key: element.props.index,
  //       active: element.props.index === currentActive,
  //       height,
  //       pointColor,
  //       fontSize,
  //       onClick: () => {
  //         setCurrentActive(element.props.index);
  //       },
  //     });
  //   });
  // }, [children, currentActive, fontSize, height, pointColor, props]);

  return (
    <TabItemContainer
      backgroundColor={backgroundColor}
      shadowStyle={shadowStyle}
      {...props}>
      <TabItem title="오늘의 카드" name="total" onClick={onClick}></TabItem>
      <TabItem title="나의 카드" name="my" onClick={onClick}></TabItem>
      <TabItem title="관심 카드" name="like" onClick={onClick}></TabItem>
      {/* <TabItemPointer
        currentActive={currentActive}
        height={height}
        backgroundColor={backgroundColor}
        shadowStyle={shadowStyle}
        pointColor={pointColor}
        {...props}></TabItemPointer> */}
    </TabItemContainer>
  );
};

Tab.propTypes = {
  activeItemIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  pointColor: PropTypes.string,
  shadowStyle: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
};

const TabItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 740px;
  min-width: 280px;
  margin: 0 auto;
  border-radius: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: ${({ shadowStyle }) => shadowStyle};
`;

// const TabItemPointer = styled.div`
//   position: absolute;
//   top: 0;
//   transform: ${({ currentActive }) =>
//     currentActive && `translate(${currentActive * 100}%, 0)`};
//   width: calc(100% / 3);
//   height: ${({ height }) => `${height}px`};
//   min-height: 25px;
//   border: ${({ pointColor }) => `1px solid ${pointColor}`};
//   border-radius: 50px;
//   background-color: ${({ backgroundColor }) => rgba(backgroundColor, 0.2)};
//   box-shadow: ${({ shadowStyle }) => shadowStyle};
//   transition: transform 0.2s ease-out;
//   @media ${Common.media.sm} {
//     height: ${({ height }) => `${height * 0.68}px`};
//   }
// `;

export default Tab;
