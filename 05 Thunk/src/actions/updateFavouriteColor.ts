import { actionsEnums } from '../common/actionsEnums';
import { Color } from '../model/color';

export const updateFavouriteColor = (newColor: Color) => {
  return {
    type: actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR,
    newColor: newColor,
  };
};
