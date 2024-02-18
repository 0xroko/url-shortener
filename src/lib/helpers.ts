import type { ZodIssue } from "zod";
import { ZodError } from "zod";

export const formToObject = async (request: Request) => {
  return Object.fromEntries(await request.formData());
};

export const randomString = (length: number) => {
  for (
    var s = "";
    s.length < length;
    s += "abcdefghijklmnopqrstuvwxyz0123456789".charAt((Math.random() * 62) | 0)
  );
  return s;
};

export const emptyActionError = {
  inputErrors: [] as ZodIssue[],
  inputErrorsFormatted: {},
  data: null,
  errors: [],
};

export const actionReturnError = (error: Error) => {
  if (error instanceof ZodError) {
    return {
      inputErrors: error.errors as ZodIssue[],
      inputErrorsFormatted: error.format(),
      data: null,
      errors: [],
    };
  }

  return {
    inputErrors: [] as ZodIssue[],
    inputErrorsFormatted: {},
    data: null,
    errors: [error],
  };
};

export const slugExistsError = () => {
  return new ZodError([
    {
      message: "URL with this slug already exists",
      path: ["slug"],
      code: "custom",
    },
  ]);
};

export const invalidAuthKeyError = () => {
  return new ZodError([
    {
      message: "Invalid Password!",
      path: ["password"],
      code: "custom",
    },
  ]);
};

export const extractFormError = (
  key: string,
  formattedErrors?: { [key: string]: { _errors: Array<string> } },
) => {
  if (formattedErrors) {
    return formattedErrors[key]?._errors[0];
  }
  return undefined;
};
