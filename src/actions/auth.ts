"use server";
import { authorize } from "@/lib/auth";
import {
  actionReturnError,
  emptyActionError,
  invalidAuthKeyError,
} from "@/lib/helpers";

export const authAction = async (prevState: any, formData: FormData) => {
  if (authorize(formData)) {
    return {
      ...emptyActionError,
      data: true,
    };
  }

  return actionReturnError(invalidAuthKeyError());
};
