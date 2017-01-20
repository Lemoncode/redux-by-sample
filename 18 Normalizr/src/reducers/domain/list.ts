import { actionsEnums } from "../../common/actionsEnums";

export interface AllIds {
  students: number[];
  countries: number[];
}

const initialState = {
  students: [],
  countries: []
};

export const allIds =  (state: AllIds = initialState, action) => {
  switch (action.type) {
    case actionsEnums.FETCH_STUDENT_LIST_REQUEST_COMPLETED:
      return handleFetchStudents(state, action.payload.result);

    case actionsEnums.FETCH_COUNTRY_LIST_REQUEST_COMPLETED:
      return handleFetchCountries(state, action.payload.result);

    case actionsEnums.ADD_COUNTRY:
      return handleAddCountry(state, action.payload.result);
  }

  return state;
};

const handleFetchStudents = (state: AllIds, ids: number[]) => {
  return {
    ...state,
    students: ids
  }
}

const handleFetchCountries = (state: AllIds, ids: number[]) => {
  return {
    ...state,
    countries: ids
  }
}

const handleAddCountry = (state: AllIds, id: number) => {
  return {
    ...state,
    countries: [...state.countries, id]
  }
}
