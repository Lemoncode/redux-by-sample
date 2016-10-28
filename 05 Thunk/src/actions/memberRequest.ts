import {memberApi} from '../restApi/memberApi';
import {membersRequestCompleted} from './memberRequestCompleted';

export function memberRequest() {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatcher) {
    const promise = memberApi.getAllMembers();

    promise.then(
      data => dispatcher(membersRequestCompleted(data))
    );

    return  promise;
  };
}
