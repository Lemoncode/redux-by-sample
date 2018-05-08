import {LoginEntity,UserProfile,LoginResponse} from '../model';

class LoginApi {
  login(loginInfo : LoginEntity) : Promise<LoginResponse> {
      let loginResponse = new LoginResponse();

      if(loginInfo.login === 'admin' && loginInfo.password === 'test') {
        loginResponse.succeeded = true;
        loginResponse.userProfile = {fullname: "John Doe", role: 'admin' };
      } else {
        loginResponse.succeeded = false;
        loginResponse.userProfile = null;
      }

      return Promise.resolve(loginResponse);
  }
}

export const loginApi = new LoginApi();