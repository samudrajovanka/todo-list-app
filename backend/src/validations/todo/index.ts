import { VALIDATION_ERR } from "../../constants/errorType";
import InvariantError from "../../exceptions/InvariantError";

import {
  create, update
} from "./schema";

export default class TodoValidation {
  private payload: any;
  
  constructor(payload: any) {
    this.payload = payload;
  }

  validateCreate() {
    const validationResult = create.validate(this.payload);
  
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  }

  validateUpdate() {
    const validationResult = update.validate(this.payload);
  
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message, {
        type: VALIDATION_ERR,
      });
    }
  }
}
