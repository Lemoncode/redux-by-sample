import { UserProfile, createEmptyUserProfile } from './userProfile';

export interface LoginResponse {
  succeeded: boolean;
  userProfile: UserProfile;
}

export const createEmptyLoginResponse = (): LoginResponse => ({
  succeeded: false,
  userProfile: createEmptyUserProfile(),
});
