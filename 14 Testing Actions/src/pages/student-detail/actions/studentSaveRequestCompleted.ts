import { actionsEnums } from '../../../common/actionsEnums';

export const studentSaveRequestCompleted = (succeeded : boolean) => {
  return {
    type: actionsEnums.STUDENT_SAVE_COMPLETED,
    payload: succeeded
  }
}
