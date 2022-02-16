import React, { useCallback } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { rgba } from 'polished';
import Common from '@/styles';
import TabItem from './TabItem';
import { TAB_MENU } from '@/constants';
import { tabItemSize } from '@/styles/mixin';

const Tab = ({ currentActive, onClick, ...props }) => {
  const [activeItem, setActiveItem] = useState(currentActive);

  const handleClickTabItem = useCallback(
    name => {
      setActiveItem(name);
      onClick && onClick(name);
    },
    [onClick],
  );

  return (
    <TabItemContainer {...props}>
      {Object.entries(TAB_MENU).map(([key, value]) => (
        <TabItem
          key={key}
          title={value}
          name={key}
          activeItem={activeItem}
          onClick={handleClickTabItem}
        />
      ))}
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
  ${tabItemSize}
  position: absolute;
  top: 0;
  transform: ${({ currentActive }) =>
    currentActive &&
    `translate(${Object.keys(TAB_MENU).indexOf(currentActive) * 100}%, 0)`};
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
