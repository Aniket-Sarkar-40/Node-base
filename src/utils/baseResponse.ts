export class BaseResponse<T> {
  public success: boolean;
  public data?: T;
  public error?: string;

  constructor(success: boolean, data?: T, error?: string) {
    this.success = success;
    if (data) this.data = data;
    if (error) this.error = error;
  }
}
