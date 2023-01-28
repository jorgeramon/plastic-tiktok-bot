import { FollowRole } from '../enums/follow-role.enum';

export interface ITiktokChat {
  comment: string;
  uniqueId: string;
  nickname: string;
  followRole: FollowRole;
}
