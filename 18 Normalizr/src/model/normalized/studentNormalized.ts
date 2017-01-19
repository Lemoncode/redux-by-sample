export class StudentNormalized {
  id: number;
  gotActiveTraining: boolean;
  fullname: string;
  email: string;
  country: number;

  public constructor() {
    this.id = -1;
    this.gotActiveTraining = false;
    this.fullname = "";
    this.email = "";
    this.country = null;
  }
}
