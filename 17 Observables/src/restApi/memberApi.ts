import { ajax } from "rxjs/observable/dom/ajax";

// Sync mock data API, inspired from:
// https://gist.github.com/coryhouse/fd6232f95f9d601158e4
class MemberAPI {
  getAllMembers() {
    return (
      ajax.getJSON("https://api.github.com/orgs/lemoncode/members")
    );
  }
}

export const memberAPI = new MemberAPI();
