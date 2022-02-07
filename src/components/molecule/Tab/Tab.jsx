import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { rgba } from 'polished';
import Common from '@styles';
import TabItem from './TabItem';
import { TAB_MENU } from '@constants';
import { tebItemSize } from '@styles/mixin';

const Tab = ({ currentActive, onClick, ...props }) => {
  const [activeItem, setActiveItem] = useState(currentActive);

  const handleClickTabItem = name => {
    setActiveItem(name);
    onClick && onClick(name);
  };

  return (
    <TabItemContainer {...props}>
      <TabItem
        title={TAB_MENU[0].title}
        name={TAB_MENU[0].name}
        activeItem={activeItem}
        onClick={handleClickTabItem}></TabItem>
      <TabItem
        title={TAB_MENU[1].title}
        name={TAB_MENU[1].name}
        activeItem={activeItem}
        onClick={handleClickTabItem}></TabItem>
      <TabItem
        title={TAB_MENU[2].title}
        name={TAB_MENU[2].name}
        activeItem={activeItem}
        onClick={handleClickTabItem}></TabItem>
      <TabItemPointer currentActive={activeItem} {...props}></TabItemPointer>
    </TabItemContainer>
  );
};

const TabItemContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 740px;
  min-width: 280px;
  margin: 0 auto;
  border-radius: 50px;
  background-color: ${Common.colors.background_menu};
  box-shadow: ${Common.shadow.menu};
`;

const TabItemPointer = styled.div`
  ${tebItemSize}
  position: absolute;
  top: 0;
  transform: ${({ currentActive }) =>
    currentActive &&
    `translate(${
      TAB_MENU.findIndex(obj => obj.name === currentActive) * 100
    }%, 0)`};
  border: 1px solid ${Common.colors.primary};
  border-radius: 50px;
  background-color: ${rgba(Common.colors.background_menu, 0.2)};
  box-shadow: ${Common.shadow.menu};
  transition: transform 0.2s ease-out;
`;

Tab.defaultProps = {
  currentActive: '',
  onClick: () => {},
};

Tab.propTypes = {
  currentActive: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tab;
