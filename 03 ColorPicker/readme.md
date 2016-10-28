# 03 Color Picker

This sample takes as starting point _02 Change name_

> Altough we cold start from a clean project, we have decided to continue from
then change name project, just to show how isolated and how does a project
look when we have several widgets and functionallity

In this sample we will add a component that will let us change the favourite color of the
user.


Summary steps:

- Let's createa color entiy.
- Let's create an update color action.
- Let's define a new entry to the _userProfileReducer_ to store the favourite color.
- Let's create the needed colorPicker components, plus subcomponents.
- Let's wire it all up in a container component.


# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _02 Change name_ and execute _npm install_.

- Let's create a Color entity under the following path _./src/model/color.ts_.

```javascript
export class Color {
  red : number;
  green : number;
  blue : number;
}
```

- Let's add a new property to the _./src/common/actionsEnums.ts_

```javascript
export const actionsEnums = {
  UPDATE_USERPROFILE_NAME : 'UPDATE_USERPROFILE_NAME ',
  UPDATE_USERPROFILE_FAVOURITE_COLOR: 'UPDATE_USERPROFILE_FAVOURITE_COLOR'
}
```

- Let's create an update color action.

```javascript
import {actionsEnums} from "../common/actionsEnums";
import {Color} from '../model/color';

export const updateFavouriteColor = (newColor : Color) => {
   return {
     type: actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR
     ,newColor : newColor
   }
}
```

- Let's define a new entry to the _./src/reducers/userProfile.ts_ to store the favourite color.

```javascript
import {actionsEnums} from '../common/actionsEnums';
import {updateUserProfileName} from '../actions/updateUserProfileName';
import {Color} from '../model/color';
import objectAssign = require('object-assign');

class userProfileState  {
  firstname : string;
  favouriteColor : Color;

  public constructor()
  {
    this.firstname = "Default name";
    this.favouriteColor = {red: 0, green: 0, blue: 180};
  }
}

export const userProfileReducer =  (state : userProfileState = new userProfileState(), action) => {
      switch (action.type) {
        case actionsEnums.UPDATE_USERPROFILE_NAME:
           return handleUserProfileAction(state, action);
        case actionsEnums.UPDATE_USERPROFILE_FAVOURITE_COLOR:
           return handleFavouriteColorAction(state, action);
      }

      return state;
};


const handleFavouriteColorAction = (state : userProfileState, action) => {
  const newState = objectAssign({}, state, {favouriteColor: action.newColor});
  return newState;
}
```

- Let's create the needed colorPicker components, plus subcomponents.

Color Slider

```javascript
import * as React from 'react';
import {Color} from './model/color'

interface Props {
  value : number;
  onValueUpdated : (newValue : number) => void;
}

export const ColorSlider = (props : Props) => {

  return (
    <div>
      <input type="range"
             min="0"
             max="255"
             value={props.value}
             onChange={(event : any) => props.onValueUpdated(event.target.value)}
      />
      {props.value}
    </div>
  );
}
```

Color Picker

```javascript
import * as React from 'react';
import {Color} from './model/color';
import {ColorSlider} from './colorslider';

interface Props {
  color : Color;
  onColorUpdated : (color : Color) => void;
}

export const ColorPicker = (props : Props) => {
  return (
    <div>
      <ColorSlider
        value = {props.color.red}
        onValueUpdated={(value) => props.onColorUpdated(
          {red: value, green: props.color.green, blue: props.color.blue}) }
      />
      <br />
      <ColorSlider
        value = {props.color.green}
        onValueUpdated={(value) => props.onColorUpdated(
          {red: props.color.red, green: value, blue: props.color.blue}) }
      />
      <br />
      <ColorSlider
        value = {props.color.blue}
        onValueUpdated={(value) => props.onColorUpdated(
          {red: props.color.red, green: props.color.green, blue: value}) }
      />
    </div>
  );
}
```

Color Displayer

```javascript
import * as React from 'react';
import {Color} from './model/color';

interface Props {
  color : Color;
}

export const ColorDisplayer = (props : Props) => {
  // `rgb(${props.color.red},${props.color.green}, ${props.color.blue}) })`
  // 'rgb(' + props.color.red + ', 40, 80)'
  var divStyle = {
    width: '120px',
    height: '80px',
    backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`
  };


  return (
    <div style={divStyle}>
    </div>
  );
}
```

- Let's create a ColorDisplayer container.

```javascript
import { connect } from 'react-redux';
import { ColorDisplayer } from './colordisplayer';

const mapStateToProps = (state) => {
    return {
      color: state.userProfileReducer.favouriteColor
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const ColorDisplayerContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(ColorDisplayer);
```


- We can add it to our _app.ts_ and perform a quick check.

```javascript
import * as React from 'react';
import {HelloWorldContainer} from './helloWorldContainer';
import {NameEditContainer} from './nameEditContainer';
import {ColorDisplayerContainer} from './colordisplayerContainer';

export const App = () => {
  return (
    <div>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
      <br/>
      <ColorDisplayerContainer/>
    </div>
  );
}
```


- Let's create a ColorPicker container: _colorpickerContainer.tsx_.

```javascript
import { connect } from 'react-redux';
import {Color} from './model/color';
import { ColorPicker } from './colorpicker';
import {updateFavouriteColor} from './actions/updateFavouriteColor';

const mapStateToProps = (state) => {
    return {
      color: state.userProfileReducer.favouriteColor
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onColorUpdated: (color : Color) => {return dispatch(updateFavouriteColor(color))}
  }
}

export const ColorPickerContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(ColorPicker);
```

- And let's consume it in the _app.tsx_

```javascript
import * as React from 'react';
import {HelloWorldContainer} from './helloWorldContainer';
import {NameEditContainer} from './nameEditContainer';
import {ColorDisplayerContainer} from './colordisplayerContainer';
import {ColorPickerContainer} from './colorpickerContainer';

export const App = () => {
  return (
    <div>
      <HelloWorldContainer/>
      <br/>
      <NameEditContainer/>
      <br/>
      <ColorDisplayerContainer/>
      <br/>
      <ColorPickerContainer/>
    </div>
  );
}
```
