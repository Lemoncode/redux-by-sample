import { actionsEnums } from "../../../common/actionsEnums";
import { hashHistory } from "react-router";

export const navigateToEditStudentAction = (studentId: number) => {
  return function(dispatcher) {
    hashHistory.push(`/student-detail/${studentId}`);
  };
};

export const navigateToNewStudentAction = () => (dispatcher) => {
  hashHistory.push(`/student-detail/${0}`);
}
