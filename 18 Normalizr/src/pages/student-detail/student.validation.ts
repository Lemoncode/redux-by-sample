import { FieldValidationResult, BaseFormValidation } from "lc-form-validation";
import { requiredValidationHandler } from "../../common/validations/required";
import { emailValidationHandler } from "../../common/validations/email";
import { requiredIdValidationHandler } from '../../common/validations/requiredId';

class StudentFormValidation extends BaseFormValidation {

  public constructor() {
    super();

    this._validationEngine.initialize([
      { formFieldName: "fullname", vmFieldName: "fullname" },
      { formFieldName: "email", vmFieldName: "email" },
      { formFieldName: "country", vmFieldName: "country" }
    ]);

    this._validationEngine.addFieldValidation(
      "fullname",
      requiredValidationHandler,
    );

    this._validationEngine.addFieldValidation(
      "email",
      requiredValidationHandler,
    );

    this._validationEngine.addFieldValidation(
      "email",
      emailValidationHandler,
    );

    this._validationEngine.addFieldValidation(
      "country",
      requiredIdValidationHandler,
    );
  }
}

export const studentFormValidation = new StudentFormValidation();
