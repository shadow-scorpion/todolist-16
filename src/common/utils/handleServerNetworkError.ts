import { setAppErrorAC, setAppStatusAC } from "@/app/app-slice"
import type { Dispatch } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import * as z from "zod";

export const handleServerNetworkError = (dispatch: Dispatch, error: unknown) => {
  let errorMessage

  // switch (error) {
  //   case
  // }

  switch (true) {
    // 1. Самая специфичная: Axios Error
    case axios.isAxiosError(error):
      const axiosError = error as AxiosError<any>;
      errorMessage = axiosError.response?.data?.message || axiosError.message;
      break;

    // 2. Специфичная: Zod Error
    case error instanceof z.ZodError:
      const zodError = error as z.ZodError;
      errorMessage = `Validation error: ${zodError.issues.map(e => e.message).join('; ')}`;
      break;

    // 3. Общая: Native Error
    case error instanceof Error:
      errorMessage = `Error: ${(error as Error).message}`;
      break;

    // 4. Fallback
    default:
      try {
        errorMessage = JSON.stringify(error);
      } catch (e) {
        errorMessage = 'An unhandled, non-serializable error occurred';
      }
      break;
  }

  dispatch(setAppErrorAC({ error: errorMessage }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
