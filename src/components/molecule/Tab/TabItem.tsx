import styled from '@emotion/styled';
import type { HTMLAttributes, ReactElement } from 'react';
import Common from '@/styles';
import { rgba } from 'polished';
import { tabItemSize } from '@/styles/mixin';

interface TabItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  children: string;
  name: string;
  activeItem?: string;
  onClick?: (tabName: string) => void;
}

const TabItem = ({
  children,
  name,
  activeItem = '',
  onClick,
  ...props
}: TabItemProps): ReactElement => {
  const handleClickTabItem = () => {
    onClick && onClick(name);
  };

  return (
    <TabItemWrapper onClick={handleClickTabItem} {...props}>
      <LinkBox>
        <TabItemTitle name={name} activeItem={activeItem} {...props}>
          {children}
        </TabItemTitle>
      </LinkBox>
    </TabItemWrapper>
  );
};

const TabItemWrapper = styled.div`
  ${tabItemSize}
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabItemTitle = styled.span<TabItemProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: ${Common.fontSize.medium};
  @media ${Common.media.sm} {
    font-size: ${Common.fontSize.micro};
  }
  font-weight: ${({ name, activeItem }) =>
    name === activeItem ? Common.fontWeight.bold : Common.fontWeight.regular};
  color: ${({ name, activeItem }) =>
    name === activeItem ? Common.colors.primary : rgba(255, 255, 255, 0.35)};
  transition: color 0.2s ease-out;
  z-index: 1;
`;

const LinkBox = styled.div`
  display: block;
  width: 100%;
`;

export default TabItem;
