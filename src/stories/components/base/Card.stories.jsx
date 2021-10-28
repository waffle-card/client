import Card from '@components/base/Card';
import styled from '@emotion/styled';

export default {
  title: 'Component/Base/Card',
};

export const EmptyCard = args => {
  return <Card.Empty {...args} />;
};
EmptyCard.argTypes = {
  onClick: { action: 'onClick' },
};

const StyledCard = styled(Card)`
  margin: 8px;
`;

export const FilledCard = args => {
  return (
    <div style={{ display: 'inline-flex' }}>
      <StyledCard width="265px" backgroundColor="blue" {...args} />
      <StyledCard width="265px" backgroundColor="red" {...args} />
      <StyledCard width="265px" backgroundColor="royalblue" {...args} />
    </div>
  );
};
FilledCard.argTypes = {
  backgroundColor: {
    control: 'color',
  },
  onClick: { action: 'onClick' },
};
