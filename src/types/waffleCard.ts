import { UserType } from './user';

type hashTag = string;

export type WaffleCardType = {
  id: string;
  user: UserType;
  emoji: string;
  color: string;
  hashTags: hashTag[];
  likeUserIds: string[];
  createdAt: string;
  updatedAt: string;
};
