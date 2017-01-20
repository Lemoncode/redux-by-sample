import { StudentNormalized } from "../../model/normalized/studentNormalized";
import { CountryNormalized } from '../../model/normalized/countryNormalized';

export interface ById {
  students: {[id: number] : StudentNormalized};
  countries: {[id: number]: CountryNormalized};
}

const initialState = {
  students: {},
  countries: {}
}

export const byId = (state: ById = initialState, action) => {
  if (action.payload && action.payload.entities) {
    return {
      ...state,
      students: {
        ...state.students,
        ...action.payload.entities.students
      },
      countries: {
        ...state.countries,
        ...action.payload.entities.countries
      }
    }
  }
  return state;
}
