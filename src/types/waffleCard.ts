import { UserType } from './user';

type hashTag = string;

export interface WaffleCardType {
  id: string;
  user: UserType;
  emoji: string;
  color: string;
  hashTags: hashTag[];
  likeUserIds: Pick<UserType, 'id'>[];
  createdAt: string;
  updatedAt: string;
}
