export interface ErrorHandlerService {
  handleException(error: Error): void;
}

export const ERROR_HANDLER_SERVICE = Symbol('ERROR_HANDLER_SERVICE');
