import { actionsEnums } from "../../../common/actionsEnums";

export const studentFieldValueChangedCompleted = (fieldName: string, value: string) => {
  return {
    type: actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED,
    payload: {
      fieldName : fieldName,
      value : value
    }
  };
};
