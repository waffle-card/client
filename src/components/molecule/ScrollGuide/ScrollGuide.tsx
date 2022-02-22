import React from 'react';
import type { HTMLAttributes, ReactElement } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import useToggle from '@/hooks/useToggle';
import { scrollGuideArrow } from '@/images';
import * as S from './ScrollGuide.style';
import Common from '@/styles';

const ScrollGuide = ({
  ...props
}: HTMLAttributes<HTMLDivElement>): ReactElement => {
  const [isDelete, toggle] = useToggle(false);

  return (
    <S.Container isDelete={isDelete} {...props}>
      <S.DelButton onClick={toggle}>
        <ClearIcon />
      </S.DelButton>
      <S.ImgBox>
        <img src={scrollGuideArrow} alt="scrollguide" />
      </S.ImgBox>
      <S.StyledText weight={Common.fontWeight.regular}>
        Shift+스크롤로 카드들을 둘러보세요!
      </S.StyledText>
    </S.Container>
  );
};

export default ScrollGuide;
