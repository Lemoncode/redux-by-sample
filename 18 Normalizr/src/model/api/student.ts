export class Student {
  id: number;
  gotActiveTraining: boolean;
  fullname: string;
  email: string;
  countryId: number;

  public constructor() {
    this.id = -1;
    this.gotActiveTraining = false;
    this.fullname = "";
    this.email = "";
    this.countryId = -1;
  }
}

// And summarized Views
// // Student list
//
// // Countries <-- Students that belogn to countries
//
// // Edit students
// interface Props {
//   student: StudentView;
//   countries : CountriesView[];
//   getStudent: () => void;
// }
//
// // Edit country / student
// interface Props {
//   country: CountryPlusStudentsView[];
//   getCountryPlusStudent: () => void;
//
// }
//
// // Edit school / student
// interface Props {
//
// }
//
//
// export interface StudentView {
//   id: number;
//   gotActiveTraining: boolean;
//   fullname: string;
//   email: string;
//   address : Lookup;
//   specialty : Lookup;
//   country : {
//     id : number;
//     name : string;
//     geoArea : GeographicArea;
//   };
//   students: StudentView[];
// }
//
// /*export interface CountryView {
//   id : number;
//   name : string;
//   geoArea : GeographicArea;
// }*/
//
// export interface CountryPlusStudentsView {
//   id : number;
//   name : string;
//   geoArea : GeographicAreaView;
//   students : {
//     id : number,
//     name : string,
//     topscore : number,
//   }
// }
//
// export interface SchoolPlusStudentsView {
//   id : number;
//   name : string;
//   geoArea : GeographicAreaView;
//   students : {
//     id : number,
//     name : string,
//     topscore : number,
//   }
// }
//
//
// export GeographicArea {
//   id : number;
//   name : string;
// }
