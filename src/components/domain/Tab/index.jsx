import React from 'react';
import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TabItem from './TabItem';
import { rgba } from 'polished';
import { Common } from '../../../style/common';

const TabItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 740px;
  border-radius: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  box-shadow: ${({ shadowStyle }) => shadowStyle};
`;

const TabItemPointer = styled.div`
  position: absolute;
  top: 0;
  transform: ${({ activeItemIndex }) =>
    activeItemIndex && `translate(${activeItemIndex * 100}%, 0)`};
  width: calc(100% / 3);
  height: 47px;
  border: ${({ pointColor }) => `1px solid ${pointColor}`};
  border-radius: 50px;
  background-color: ${({ backgroundColor }) => rgba(backgroundColor, 0.2)};
  box-shadow: ${({ shadowStyle }) => shadowStyle};
  transition: transform 0.2s ease-out;
`;

const childrenToArray = (children, types) => {
  return React.Children.toArray(children).filter(element => {
    if (React.isValidElement(element) && types.includes(element.props.__TYPE)) {
      return true;
    } else {
      console.warn(
        `Only accepts ${
          Array.isArray(types) ? types.join(', ') : types
        } as it's children.`,
      );
      return false;
    }
  });
};

const Tab = ({
  children,
  activeItemIndex,
  backgroundColor,
  pointColor,
  shadowStyle,
  fontSize = Common.fontSize.medium,
  ...props
}) => {
  const [currentActive, setCurrentActive] = useState(() => {
    if (activeItemIndex) {
      return activeItemIndex;
    } else {
      const index = childrenToArray(children, 'Tab.Item')[0].props.index;
      return index;
    }
  });

  const items = useMemo(() => {
    return childrenToArray(children, 'Tab.Item').map(element => {
      return React.cloneElement(element, {
        ...element.props,
        key: element.props.index,
        active: element.props.index === currentActive,
        pointColor,
        fontSize,
        onClick: () => {
          setCurrentActive(element.props.index);
        },
      });
    });
  }, [children, currentActive, fontSize, pointColor]);

  return (
    <TabItemContainer
      backgroundColor={backgroundColor}
      shadowStyle={shadowStyle}>
      {items}
      <TabItemPointer
        activeItemIndex={currentActive}
        backgroundColor={backgroundColor}
        shadowStyle={shadowStyle}
        pointColor={pointColor}></TabItemPointer>
    </TabItemContainer>
  );
};

Tab.Item = TabItem;

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  activeItemIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  backgroundColor: PropTypes.string.isRequired,
  pointColor: PropTypes.string.isRequired,
  shadowStyle: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Tab;
