import axios, { AxiosError } from "axios"
import { z } from "zod"

export const handleServerNetworkError = (error: unknown): string => {
  let errorMessage: string;

  switch (true) {
    // 1. Самая специфичная: Axios Error
    case axios.isAxiosError(error):
      const axiosError = error as AxiosError<any>;
      errorMessage = axiosError.response?.data?.message || axiosError.message;
      break;

    // 2. Специфичная: Zod Error
    case error instanceof z.ZodError:
      const zodError = error as z.ZodError;
      errorMessage = `Zod error: look at console`;
      console.log(zodError.issues)
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

  return errorMessage;
}