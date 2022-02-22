import React, { useCallback } from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { rgba } from 'polished';
import Common from '@/styles';
import TabItem from './TabItem';
import { TAB_MENU } from '@/constants';
import { tabItemSize } from '@/styles/mixin';

interface TabProps extends Omit<React.ComponentProps<'div'>, 'onClick'> {
  currentActiveTabItem?: string;
  onClick?: (tabName: string) => void;
}

const Tab = ({
  currentActiveTabItem,
  onClick,
  ...props
}: TabProps): JSX.Element => {
  const [activeItem, setActiveItem] = useState(currentActiveTabItem);

  const handleClickTabItem = useCallback(
    tabName => {
      setActiveItem(tabName);
      onClick && onClick(tabName);
    },
    [onClick],
  );

  return (
    <TabItemContainer {...props}>
      {Object.entries(TAB_MENU).map(([key, value]) => (
        <TabItem
          key={key}
          name={key}
          activeItem={activeItem}
          onClick={handleClickTabItem}
        >
          {value}
        </TabItem>
      ))}
      <TabItemPointer
        currentActiveTabItem={activeItem}
        {...props}
      ></TabItemPointer>
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

const TabItemPointer = styled.div<TabProps>`
  ${tabItemSize}
  position: absolute;
  top: 0;
  transform: ${({ currentActiveTabItem }) =>
    currentActiveTabItem &&
    `translate(${
      Object.keys(TAB_MENU).indexOf(currentActiveTabItem) * 100
    }%, 0)`};
  border: 1px solid ${Common.colors.primary};
  border-radius: 50px;
  background-color: ${rgba(Common.colors.background_menu, 0.2)};
  box-shadow: ${Common.shadow.menu};
  transition: transform 0.2s ease-out;
`;

export default Tab;
