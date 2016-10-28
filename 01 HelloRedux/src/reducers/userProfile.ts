

class userProfileState  {
  firstname : string;

  public constructor()
  {
    this.firstname = "Default name";
  }
}

export const userProfileReducer =  (state : userProfileState = new userProfileState(), action) => {
      return state;
};
