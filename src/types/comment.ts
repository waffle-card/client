export type CommentType = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  waffleCardId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};
