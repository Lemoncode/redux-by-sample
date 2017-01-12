import { actionsEnums } from "../../../common/actionsEnums";
import {CountryView} from '../../../model/view/countryView';
import {normalize} from 'normalizr';
import {countrySchema} from '../../../schemas';

export const addCountryAction = (country: CountryView) => {
  return {
    type: actionsEnums.ADD_COUNTRY,
    payload: normalize(country, countrySchema)
  };
};
