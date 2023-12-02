import { VALIDATION_ERR } from "../../constants/errorType";
import InvariantError from "../../exceptions/InvariantError";

import {
  login,
  register
} from "./schema";

export default class AuthValidation {
  private payload: any;
  
  constructor(payload: any) {
    this.payload = payload;
  }

  validateLogin() {
    const validationResult = login.validate(this.payload);
  
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  }

  validateRegister() {
    const validationResult = register.validate(this.payload);
  
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  }
}
