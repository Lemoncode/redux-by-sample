import { connect } from "react-redux";
import { ColorDisplayer } from "./colordisplayer";

const mapStateToProps = (state) => {
  return {
    color: state.userProfileReducer.favouriteColor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export const ColorDisplayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorDisplayer);
