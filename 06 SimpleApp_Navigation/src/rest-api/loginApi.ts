import { LoginEntity, LoginResponse, createEmptyLoginResponse } from "../model";

export const login = (loginEntity: LoginEntity): Promise<LoginResponse> => {
  const loginResponse = createEmptyLoginResponse();

  if (loginEntity.login === 'admin' && loginEntity.password === 'test') {
    loginResponse.succeeded = true;
    loginResponse.userProfile = {
      fullname: 'John Doe',
      role: 'admin',
    };
  }

  return Promise.resolve(loginResponse);
}
