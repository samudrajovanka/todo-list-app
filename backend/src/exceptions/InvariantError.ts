import { INVARIANT_ERR_MSG } from "../constants/errorMessage";
import { INVARIANT_ERR } from "../constants/errorType";
import { OptionsError } from "./types";
import ClientError from "./ClientError"

class InvariantError extends ClientError {
  name;

  constructor(message = INVARIANT_ERR_MSG, options?: OptionsError) {
    super(message, {
      type: options?.type ?? INVARIANT_ERR,
      statusCode: 400,
    });
    this.name = "Invariant Error";
  }
}

export default InvariantError;
