import { AUTH_ERR_MSG } from "../constants/errorMessage";
import { AUTHENTICATION_ERR } from "../constants/errorType";
import { OptionsError } from "./types";
import ClientError from "./ClientError"

class AuthenticationError extends ClientError {
  name: string;

  constructor(message = AUTH_ERR_MSG, options?: OptionsError) {
    super(message, {
      type: options?.type ?? AUTHENTICATION_ERR,
      statusCode: 401,
    });
    this.name = "Authentication Error";
  }
}

export default AuthenticationError;
