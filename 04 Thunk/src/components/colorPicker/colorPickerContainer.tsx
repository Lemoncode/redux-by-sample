import { connect } from 'react-redux';
import { Color } from '../../model/color';
import { ColorPicker } from './colorpicker';
import { updateFavouriteColor } from '../../actions/updateFavouriteColor';

const mapStateToProps = (state) => ({  
    color: state.userProfileReducer.favouriteColor  
});

const mapDispatchToProps = (dispatch) => ({  
    onColorUpdated: (color: Color) => dispatch(updateFavouriteColor(color))   
});

export const ColorPickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPicker);
