import { CountryView } from './countryView';

export class StudentView {
  id: number;
  gotActiveTraining: boolean;
  fullname: string;
  email: string;
  country: CountryView;

  public constructor() {
    this.id = -1;
    this.gotActiveTraining = false;
    this.fullname = "";
    this.email = "";
    this.country = new CountryView();
  }
}
