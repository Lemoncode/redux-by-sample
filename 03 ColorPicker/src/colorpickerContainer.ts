import { connect } from "react-redux";
import { Color } from "./model/color";
import { ColorPicker } from "./colorpicker";
import { updateFavouriteColor } from "./actions/updateFavouriteColor";

const mapStateToProps = (state) => {
  return {
    color: state.userProfileReducer.favouriteColor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onColorUpdated: (color: Color) => {
      return dispatch(updateFavouriteColor(color));
    }
  };
};

export const ColorPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPicker);
