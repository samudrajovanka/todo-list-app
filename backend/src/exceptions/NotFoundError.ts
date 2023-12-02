import { NOT_FOUND_ERR_MSG } from "../constants/errorMessage";
import { NOT_FOUND_ERR } from "../constants/errorType";
import { OptionsError } from "./types";
import ClientError from "./ClientError"

class NotFoundError extends ClientError {
  name;

  constructor(message = NOT_FOUND_ERR_MSG, options?: OptionsError) {
    super(message, {
      type: options?.type ?? NOT_FOUND_ERR,
      statusCode: 404,
    });
    this.name = "Not Found Error";
  }
}

export default NotFoundError;
