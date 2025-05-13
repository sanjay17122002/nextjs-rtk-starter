import { User } from './user';

export interface UserState {
  isAuthenticated: boolean;
  currentUser: User | null;
}
