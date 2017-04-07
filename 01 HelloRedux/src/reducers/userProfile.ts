class UserProfileState {
  firstname : string;

  constructor() {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : UserProfileState = new UserProfileState(), action) => {
  return state;
};
