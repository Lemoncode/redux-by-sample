import {UserProfile} from './userProfile';

export class LoginResponse {
  succeeded : boolean;
  userProfile : UserProfile;

  constructor() {
    this.succeeded = false;
    this.userProfile = new UserProfile();
  }
}
