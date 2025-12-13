import axios, { AxiosError } from "axios"
import { z } from "zod"
import { Dispatch } from "@reduxjs/toolkit"
import { setAppErrorAC } from "@/app/app-slice.ts"

export const handleServerNetworkError = (dispatch: Dispatch, error: unknown): string => {
  let errorMessage: string;

  switch (true) {
    // 1. Самая специфичная: Axios Error
    case axios.isAxiosError(error):
      const axiosError = error as AxiosError<any>;
      errorMessage = axiosError.response?.data?.message || axiosError.message;
      dispatch(setAppErrorAC({ error: errorMessage }))
      break;

    // 2. Специфичная: Zod Error
    case error instanceof z.ZodError:
      const zodError = error as z.ZodError;
      errorMessage = `Zod error: look at console`;
      dispatch(setAppErrorAC({ error: errorMessage }))
      console.log(zodError.issues)
      break;

    // 3. Общая: Native Error
    case error instanceof Error:
      errorMessage = `Error: ${(error as Error).message}`;
      dispatch(setAppErrorAC({ error: errorMessage }))
      break;

    // 4. Fallback
    default:
        errorMessage = JSON.stringify(error);
        dispatch(setAppErrorAC({ error: errorMessage }))

      break;
  }

  return errorMessage;
}