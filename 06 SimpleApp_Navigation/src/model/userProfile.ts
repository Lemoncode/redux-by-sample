export interface UserProfile {
  fullname: string;
  role: string;
}

export const createEmptyUserProfile = (): UserProfile => ({
  fullname: '',
  role: '',
});
