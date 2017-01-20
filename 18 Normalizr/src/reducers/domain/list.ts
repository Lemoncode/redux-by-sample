import { actionsEnums } from "../../common/actionsEnums";

export interface AllIds {
  students: number[];
  countries: number[];
}

const initialState = {
  students: [],
  countries: []
}

export const allIds =  (state: AllIds = initialState, action) => {
  switch (action.type) {
    case actionsEnums.STUDENTS_GET_LIST_REQUEST_COMPLETED:
      return handleStudentsGetListRequestCompleted(state, action.payload.result);

    case actionsEnums.FETCH_COUNTRY_LIST_REQUEST_COMPLETED:
      return handleFetchCountryListRequestCompleted(state, action.payload.result);

    case actionsEnums.ADD_COUNTRY:
      return handleAddCountry(state, action.payload.result);
  }

  return state;
};

const handleStudentsGetListRequestCompleted = (state: AllIds, ids: number[]) => {
  return {
    ...state,
    students: ids
  }
}

const handleFetchCountryListRequestCompleted = (state: AllIds, ids: number[]) => {
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
