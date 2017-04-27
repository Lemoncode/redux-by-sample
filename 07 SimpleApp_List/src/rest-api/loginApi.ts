import {LoginEntity} from '../model/login';
import {UserProfile} from '../model/userProfile';
import {LoginResponse} from '../model/loginResponse';
import {} from 'core-js'

class LoginApi {
  login(loginInfo : LoginEntity) : Promise<LoginResponse> {
      let loginResponse = new LoginResponse();

      if(loginInfo.login === 'admin' && loginInfo.password === 'test') {
        loginResponse.succeeded = true;
        loginResponse.userProfile = {fullname: "John Doe", role: 'admin' };
      } else {
        loginResponse.succeeded = false;
        loginResponse = null;
      }

      return Promise.resolve(loginResponse);
  }
}

export const loginApi = new LoginApi();
