# 15 Testing Components

This sample series takes as starting point _14 Testing Actions_

We will add unit testing to our components.

Summary:

- Add a simple test to a presentational component.
- Add a simple test to a container component.

# Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

-  Let's start by adding a simple test to _studentRow.tsx_ checking the the row is displaying the expected data

_./src/pages/student-list/components/studentRow.spec.tsx_

```javascript
describe('StudentRowComponent', () => {
  it('Should render a row with a given name and email', () => {
     // Arrange
     const student = new StudentEntity();
     student.id = 2;
     student.gotActiveTraining = true;
     student.fullname = 'John Doe';
     student.email = "john@mail.com";

     // Act
     const studentRowWrapper = shallow(
       <StudentRowComponent student={student} editStudent={()=>{}}/>
     );

     // Assert
     expect(studentRowWrapper.type()).to.be.equals('tr');
     expect(studentRowWrapper.children().at(0).type()).to.be.equals('td');
     expect(studentRowWrapper.children().at(1).type()).to.be.equals('td');
     expect(studentRowWrapper.children().at(1).children().at(0).html()).to.be.equals('<span>John Doe</span>');
     expect(studentRowWrapper.children().at(2).type()).to.be.equals('td');
     expect(studentRowWrapper.children().at(2).children().at(0).html()).to.be.equals('<span>john@mail.com</span>');
  });
});
```

> Note: Check LeanMood snapshot like testing

- Now let's interact with the component, we want to check that clicking on the div calls the expected callback

```javascript
it('Should interact to the click on edit student and return as param 2 student Id', () => {
   // Arrange
   const student = new StudentEntity();
   student.id = 2;
   student.gotActiveTraining = true;
   student.fullname = 'John Doe';
   student.email = "john@mail.com";

   const onDivClicked = sinon.spy();

   // Act
   const studentRowWrapper = shallow(
     <StudentRowComponent student={student} editStudent={onDivClicked}/>
   );

   // Under this TD, first div is clickable
   const tdContainingDivClickable = studentRowWrapper.children().at(3);

   // Clikable DIV
   const clickableDiv = tdContainingDivClickable.children().at(0);
   clickableDiv.simulate('click');

   // Assert
   expect(onDivClicked.calledOnce).to.be.true;
   expect(onDivClicked.calledWith(student.id)).to.be.true;
});
```

- Now let's test _studentListContainer_

_./src/pages/student-list/studentListContainer.spec.tsx_

```javascript
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { StudentListContainer } from '../studentListContainer';
import { StudentEntity } from '../../../model/student'
import * as getStudentModule from '../actions/studentListRequestStarted'
import * as navigateToEditStudentModule from '../actions/navigateToEditStudent'

const createStore = configureStore();

describe('StudentListContainer', () => {
  it('Should render StudentListComponent (one student)', sinon.test(() => {
    // Arrange
    let sinon: sinon.SinonStatic = this;

    const student = new StudentEntity();
    student.id = 2;
    student.fullname = 'John Doe';
    student.email = 'john@mail.com';


    let mockStore = createStore({
        studentReducer: {
                          studentsList: [student]
                        }
    });


    let studentListRequestStartedActionMock = sinon.stub(getStudentModule,
                                           'studentListRequestStartedAction',
                                           () => {
                                             return {
                                               type: 'dummy'
                                             }
                                           }
                                           );


      let navigateToEditStudentActionMock = sinon.stub(navigateToEditStudentModule,
                                             'navigateToEditStudentAction',
                                             (id) => {
                                               return {
                                                 type: 'dummy'
                                               }
                                             }
                                             );


     // Act
     const nonTypedMockStore : any = mockStore;
     let StudentListContainerWrapper = mount(
       <Provider store={nonTypedMockStore}>
           <StudentListContainer />
       </Provider>
     );

     // Assert
     var studentListPresentationalWrapper = StudentListContainerWrapper.find('StudentListComponent');
     expect(studentListPresentationalWrapper).not.to.be.undefined;
     expect(studentListPresentationalWrapper.prop('studentList')).not.to.be.undefined;
     expect(studentListPresentationalWrapper.prop('studentList').length).equals(1);
     expect(studentListPresentationalWrapper.prop('studentList')[0].fullname).equals(student.fullname );
     expect(studentListPresentationalWrapper.prop('studentList')[0].email).equals(student.email);


  }).bind(this));
});
```
