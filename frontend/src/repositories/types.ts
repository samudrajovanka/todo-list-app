export type SuccessResponse<T = {}> = {
  success: true;
  message: string;
} & T;
