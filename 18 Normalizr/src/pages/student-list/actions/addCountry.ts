import { actionsEnums } from "../../../common/actionsEnums";
import {CountryView} from '../../../model/view/countryView';

export const addCountryAction = (country: CountryView) => {
  return {
    type: actionsEnums.ADD_COUNTRY,
    payload: country
  };
};
