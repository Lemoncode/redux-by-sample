import {Validators, createFormValidation } from 'lc-form-validation'

const validationConstraints = {
  fields: {
    fullname: [
      { validator: Validators.required },      
    ],
    email: [
      { validator: Validators.required },
      { validator: Validators.email }
    ]
  }
};

export const studentFormValidation = createFormValidation(validationConstraints);



