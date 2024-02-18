"use client";
import { addUrl } from "@/actions/url/add";
import { Toast } from "@/components/Toast";
import { emptyActionError, extractFormError } from "@/lib/helpers";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./Button";
import { Input } from "./Input";

const initialState = emptyActionError;

export const AddUrlForm = () => {
  const [state, formAction] = useFormState(addUrl, initialState);

  const [toastOpen, setToastOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.data) {
      navigator.clipboard.writeText(state.data.fullUrl);
      setToastOpen(true);
      // reset form
      formRef.current?.reset();
    }
  }, [state.data]);

  return (
    <>
      <div
        className={`-mt-7 flex max-w-md flex-col items-center justify-center lg:max-w-sm`}
      >
        <form ref={formRef} action={formAction}>
          <fieldset>
            <div className={`flex flex-col gap-6`}>
              <div
                className={`text-2xl font-semibold leading-8 text-white text-opacity-80`}
              >
                Add a new link
              </div>
              <Input
                description="Url you want to shorten"
                name="url"
                placeholder="example.com"
                label="URL"
                error={extractFormError("url", state?.inputErrorsFormatted)}
              ></Input>
              <div className={`flex gap-5`}>
                <div className={`flex w-1/2`}>
                  <Input
                    description="If not provided, random string will be used"
                    name="slug"
                    label="Slug*"
                    placeholder="ytv"
                    error={extractFormError(
                      "slug",
                      state?.inputErrorsFormatted,
                    )}
                  ></Input>
                </div>
                <div className={`flex w-1/2`}>
                  <Input
                    description="Required for private shorteners"
                    name="password"
                    type="password"
                    placeholder="Password"
                    label="Password"
                    error={extractFormError(
                      "password",
                      state?.inputErrorsFormatted,
                    )}
                  ></Input>
                </div>
              </div>

              <SubmitButton />
            </div>
          </fieldset>
        </form>
      </div>
      <Toast open={toastOpen} onOpenChange={setToastOpen}>
        <Toast.Title>
          Added{" "}
          <span
            className={`select-all font-medium`}
            data-url={state.data?.fullUrl}
          >
            {state?.data?.fullUrl}
          </span>{" "}
          and copied to clipboard
        </Toast.Title>
      </Toast>
    </>
  );
};

interface SubmitButtonProps {
  children?: React.ReactNode | React.ReactNode[];
}

// useFormStatus must be used inside a form
export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const status = useFormStatus();
  return (
    <Button
      name="_action"
      value="create"
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? "Adding..." : "Add"}
    </Button>
  );
};
