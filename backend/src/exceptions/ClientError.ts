import { CLIENT_ERR_MSG } from "../constants/errorMessage";
import { CLIENT_ERR } from "../constants/errorType";
import { OptionsError } from "./types";

class ClientError extends Error {
  statusCode: number;
  type: string;

  constructor(message = CLIENT_ERR_MSG, options?: OptionsError) {
    super(message);

    this.statusCode = options?.statusCode ?? 400;
    this.type = options?.type ?? CLIENT_ERR;
  }
}

export default ClientError;
