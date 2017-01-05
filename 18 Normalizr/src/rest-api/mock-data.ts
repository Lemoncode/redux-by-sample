import { Student } from '../model/api/student';
import { Country } from '../model/api/country';

export const studentsMockData: Student[] = [
  {id: 1, gotActiveTraining: true, fullname: "John Doe", email: "test@fakeemail.com", countryId: 1},
  {id: 2, gotActiveTraining: false, fullname: "Mike Huff", email: "mark@fakeemail.com", countryId: 2},
  {id: 3, gotActiveTraining: true, fullname: "Harry Poe", email: "harry@fakeemail.com", countryId: 0 },
  {id: 4, gotActiveTraining: true, fullname: "Mary Joe", email: "mary@fakeemail.com", countryId: 0}
];

export const countriesMockData: Country[] = [
  { id: 0, name: "" },
  { id: 1, name: "Spain" },
  { id: 2, name: "Italy" },
  { id: 3, name: "Germany" },
  { id: 4, name: "France" }
]
