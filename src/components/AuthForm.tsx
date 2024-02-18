"use client";

import { authAction } from "@/actions/auth";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { emptyActionError, extractFormError } from "@/lib/helpers";
import { useFormState } from "react-dom";

interface AuthFormProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const AuthForm = ({ children }: AuthFormProps) => {
  const [state, action] = useFormState(authAction, emptyActionError);

  return (
    <form className={`flex flex-col gap-7`} action={action}>
      <Input
        label="Password"
        name="password"
        required
        placeholder="*****"
        description="Main password"
        type="password"
        error={extractFormError("password", state?.inputErrorsFormatted)}
      />
      <Button
        type="submit"
        className={`ml-2 text-sm text-red-500 text-opacity-50`}
      >
        Authorize
      </Button>
    </form>
  );
};
