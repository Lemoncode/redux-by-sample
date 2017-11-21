export interface LoginEntity {
  login: string;
  password: string;
}

export const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});
