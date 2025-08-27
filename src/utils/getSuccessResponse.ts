import { ISuccessResponse } from 'src/interfaces/success-response';

export const getSuccessRes = (
  data: object,
  statusCode: number = 200,
): ISuccessResponse => {
  return {
    statusCode,
    message: 'success',
    data,
  };
};
