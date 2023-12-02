import { FORBIDDEN_ERR_MSG } from "../constants/errorMessage";
import { FORBIDDEN_ERR } from "../constants/errorType";
import { OptionsError } from "./types";
import ClientError from "./ClientError"

class ForbiddenError extends ClientError {
  name;

  constructor(message = FORBIDDEN_ERR_MSG, options?: OptionsError) {
    super(message, {
      type: options?.type ?? FORBIDDEN_ERR,
      statusCode: 403,
    });
    this.name = "Forbidden Error";
  }
}

export default ForbiddenError;
