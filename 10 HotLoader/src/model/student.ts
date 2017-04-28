export class StudentEntity {
  id: number;
  gotActiveTraining: boolean;
  fullname: string;
  email: string;

  public constructor() {
    this.id = -1;
    this.gotActiveTraining = false;
    this.fullname = "";
    this.email = "";
  }
}
