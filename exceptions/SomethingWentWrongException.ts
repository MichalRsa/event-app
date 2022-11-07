import HttpException from './HttpException';

class SomethindWentWrongException extends HttpException {
  constructor() {
    super(500, 'Something went wrong');
  }
}

export default SomethindWentWrongException;
