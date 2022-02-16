import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Common from '@/styles';
import { rgba } from 'polished';
import { tabItemSize } from '@/styles/mixin';

const TabItem = ({ title, name, activeItem, onClick, ...props }) => {
  const handleClickTabItem = () => {
    onClick && onClick(name);
  };
  return (
    <TabItemWrapper onClick={handleClickTabItem} {...props}>
      <LinkBox>
        <TabItemTitle name={name} activeItem={activeItem} {...props}>
          {title}
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

const TabItemTitle = styled.span`
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

TabItem.defaultProps = {
  activeItem: '',
  onClick: () => {},
};

TabItem.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  activeItem: PropTypes.string,
  onClick: PropTypes.func,
};

export default TabItem;
