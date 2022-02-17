import React from 'react';
import Common from '@/styles';
import * as S from './EmptyCard.style';
import { Text } from '@/components';

// TODO(윤호): S.Container 컴포넌트의 props 타입을 확장하도록 변경하기
interface EmptyCardProps extends React.ComponentProps<'div'> {
  fontSize?: number | string;
  iconSize?: number | string;
  backgroundColor?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const EmptyCard = ({
  fontSize,
  iconSize,
  onClick,
  ...props
}: EmptyCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick && onClick(e);
  };

  return (
    <S.Container onClick={handleClick} {...props}>
      <S.Text size={'75px'} color={Common.colors.secondary}>
        +
      </S.Text>
      <Text size={fontSize} color={Common.colors.secondary}>
        카드 만들기
      </Text>
    </S.Container>
  );
};

EmptyCard.defaultProps = {
  iconSize: '4rem',
};

export default EmptyCard;
