import { ErrorCodes } from './types';

class CustomError extends Error {
  code: ErrorCodes;

  constructor(message: string, code: ErrorCodes) {
    super(message);
    this.code = code;
  }
}

export default CustomError;
export { CustomError };
