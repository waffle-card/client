import { useNavigate } from 'react-router-dom';
import { Text } from '@/components';
import * as S from './BackButton.style';

type BackButtonProps = typeof S.Container;

const BackButton = ({ ...props }: BackButtonProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <S.Container
      onClick={() => {
        navigate(-1);
      }}
      {...props}
    >
      <S.BackIcon />
      <Text>뒤로가기</Text>
    </S.Container>
  );
};

export default BackButton;
