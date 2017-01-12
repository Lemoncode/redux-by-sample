import { actionsEnums } from '../../../common/actionsEnums';

export const allIds = (state: number[] = [], action) => {
  switch (action.type) {
    case actionsEnums.FETCH_COUNTRY_LIST_REQUEST_COMPLETED:
      return action.payload.result;
      
    case actionsEnums.ADD_COUNTRY:
      return [...state, action.payload.result];
  }

  return state;
}

export const getIds = (state: number[]) => state;
