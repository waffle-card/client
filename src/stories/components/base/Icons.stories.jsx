import Icons from '@components/base/Icons';

export default {
  title: 'component/Icons',
  component: Icons,
};

export const ArrowBack = () => {
  return <Icons.ArrowBack />;
};

export const Edit = args => {
  return <Icons.Edit {...args} />;
};

export const Delete = args => {
  return <Icons.Delete {...args} />;
};

export const Person = args => {
  return <Icons.Person {...args} />;
};

export const Favorite = args => {
  return (
    <>
      <Icons.Favorite {...args} />
      <Icons.Favorite {...args} active />
    </>
  );
};

export const Like = args => {
  return (
    <>
      <Icons.Like {...args} />
      <Icons.Like {...args} active />
    </>
  );
};
