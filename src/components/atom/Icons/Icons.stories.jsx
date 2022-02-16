import Icons from '@/components';

export default {
  title: 'Component/Base/Icons',
  component: Icons,
  argTypes: {
    color: {
      defaultValue: 'white',
      control: 'color',
    },
  },
};

export const Add = args => {
  return (
    <Icons>
      <Icons.Add {...args} />
    </Icons>
  );
};

export const ArrowBack = args => {
  return (
    <Icons>
      <Icons.ArrowBack {...args} />
    </Icons>
  );
};

export const ArrowFront = args => {
  return (
    <Icons>
      <Icons.ArrowFront {...args} />
    </Icons>
  );
};

export const Delete = args => {
  return (
    <Icons>
      <Icons.Delete {...args} />
    </Icons>
  );
};

export const Edit = args => {
  return (
    <Icons>
      <Icons.Edit {...args} />
    </Icons>
  );
};

export const Bookmark = args => {
  return (
    <>
      <Icons>
        <Icons.Bookmark {...args} />
      </Icons>
      <Icons>
        <Icons.Bookmark active {...args} />
      </Icons>
    </>
  );
};

export const Like = args => {
  return (
    <>
      <Icons>
        <Icons.Like {...args} />
      </Icons>
      <Icons>
        <Icons.Like active {...args} />
      </Icons>
    </>
  );
};

export const Person = args => {
  return (
    <Icons>
      <Icons.Person {...args} />
    </Icons>
  );
};
