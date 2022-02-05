import styled from '@emotion/styled';
import useHover from './useHover';

export default {
  title: 'Hook/useHover',
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: royalblue;
`;

export const Default = () => {
  const [ref, hover] = useHover();

  return (
    <>
      <Box ref={ref} />
      {hover ? <div>TooTip!</div> : null}
    </>
  );
};
