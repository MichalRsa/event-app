import HttpException from './HttpException';

class PastDateException extends HttpException {
  constructor() {
    super(404, 'Pick future date');
  }
}

export default PastDateException;
