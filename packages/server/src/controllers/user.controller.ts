import * as UserModels from '../models/user';
import { User } from '../models/user';

export const findAll = (): Promise<User[]> => {
  return UserModels.User.scope().findAll();
};
