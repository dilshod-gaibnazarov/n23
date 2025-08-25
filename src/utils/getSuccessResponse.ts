import { IResponse } from 'src/interfaces/success-response';

export const getSuccessRes = (
  data: object,
  statusCode: number = 200,
): IResponse => {
  return {
    statusCode,
    message: 'success',
    data,
  };
};
