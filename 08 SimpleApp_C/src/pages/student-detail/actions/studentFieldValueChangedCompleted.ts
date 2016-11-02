import { actionsEnums } from '../../../common/actionsEnums';

export const studentFieldValueChangedCompleted = (fieldName : string, value : string) => {
  return {
    type: actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED,
    payload: {
      fieldName : fieldName,
      value : value
    }
  }
}
