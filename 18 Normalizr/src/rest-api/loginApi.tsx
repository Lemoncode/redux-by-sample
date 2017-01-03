import {LoginEntity} from '../model/view/login';
import {UserProfile} from '../model/view/userProfile';
import {LoginResponse} from '../model/view/loginResponse';

class LoginApi {
  login(loginInfo : LoginEntity) : Promise<LoginResponse> {
      let loginResponse = new LoginResponse();

      if(loginInfo.login === 'admin' && loginInfo.password === 'test') {
        loginResponse.succeeded = true;
        loginResponse.userProfile = {fullname: "John Doe", role: 'admin' };
      } else {
        loginResponse.succeeded = false;
        loginResponse.userProfile = new UserProfile();
      }

      return Promise.resolve(loginResponse);
  }
}

export const loginApi = new LoginApi();
