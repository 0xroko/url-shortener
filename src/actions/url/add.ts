"use server";
import env from "@/lib/env";
import {
  actionReturnError,
  emptyActionError,
  slugExistsError,
} from "@/lib/helpers";
import { urlEntityShema } from "@/lib/validators";
import { kv } from "@vercel/kv";

export const addUrl = async (prevState: any, formData: FormData) => {
  try {
    const entity = urlEntityShema.parse(Object.fromEntries(formData));
    const existing = await kv.get(entity.slug);
    if (existing !== null) {
      return {
        ...emptyActionError,
        inputErrorsFormatted: slugExistsError().format(),
        data: null,
      };
    }

    await kv.set(entity.slug, entity.url);

    return {
      ...emptyActionError,
      data: {
        ...entity,
        fullUrl: `${env.APP_URL}/${entity.slug}`,
      },
    };
  } catch (error: any) {
    return actionReturnError(error);
  }
};
