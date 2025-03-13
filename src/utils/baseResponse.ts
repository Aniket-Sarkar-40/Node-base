import { ApiResponse, ErrorCode } from "@/types/global";
import { ValidationErrorItem } from "joi";
import ErrorHandler from "./errorHandler";

export class BaseResponse<T> {
  public success: boolean;
  public data?: T;
  public errors?: ValidationErrorItem[];
  public message!: string;
  public errorCode!: ErrorCode;
  public errorMessage!: string;
  public err!: ErrorHandler;

  constructor(response: ApiResponse, data?: T) {
    if (data) this.data = data;
    this.success = response.success;
    if (response.errors) this.errors = response.errors;
    if (response.errorCode) this.errorCode = response.errorCode;
    if (response.errorMessage) this.errorMessage = response.errorMessage;
    if (response.message) this.message = response.message;
    if (response.err) this.err = response.err;
  }
}
