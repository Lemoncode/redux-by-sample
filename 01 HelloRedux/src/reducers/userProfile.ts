class userProfileState {
  firstname : string;

  constructor() {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : userProfileState = new userProfileState(), action) => {
  return state;
};
