import jwt from "jsonwebtoken";

import { TOKEN_EXPIRED_ERR_MSG, TOKEN_INVALID_ERR_MSG } from "../../constants/errorMessage";
import { TOKEN_ERR, TOKEN_EXPIRED_ERR } from "../../constants/errorType";
import InvariantError from "../../exceptions/InvariantError";
import { CreateTokenArgs, ExecuteArgs, TokenType, ExecuteReturn } from "./types";

export class TokenManager {
  payload: jwt.JwtPayload;

  constructor(payload: jwt.JwtPayload) {
    this.payload = payload;
  }

  execute({ type }: ExecuteArgs): ExecuteReturn {
    if (type === TokenType.LoginToken) {
      const accessToken = this.generateAccessToken();

      return { accessToken }
    }

    throw new InvariantError("Token type not supported");
  }

  static createToken({ payload, secret, options }: CreateTokenArgs) {
    return jwt.sign(payload, secret, options);
  }

  static decodeToken<DecodedReturn = jwt.JwtPayload>(token: string, secretKey: jwt.Secret) {
    try {
      const decoded = jwt.verify(token, secretKey);
  
      return decoded as DecodedReturn;
    } catch (error) {
      const errorKnown = error as jwt.VerifyErrors;
      
      if (errorKnown.message === "jwt malformed" || errorKnown.message === "invalid signature") {
        throw new InvariantError(TOKEN_INVALID_ERR_MSG, {
          type: TOKEN_ERR
        })
      } else if (errorKnown.message === "jwt expired") {
        throw new InvariantError(TOKEN_EXPIRED_ERR_MSG, {
          type: TOKEN_EXPIRED_ERR,
        })
      }
    
      throw errorKnown;
    }
  }

  private generateAccessToken = () => {
    const accessToken = TokenManager.createToken({
      payload: this.payload,
      secret: process.env.ACCESS_TOKEN_SECRET_KEY!,
      options: {
        expiresIn: "7d",
      },
    });
  
    return accessToken;
  };
}
