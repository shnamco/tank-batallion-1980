import * as UserModels from '../models/users';
import { Users } from '../models/users';

export const findAll = (): Promise<Users[]> => {
  return UserModels.Users.scope().findAll();
};
