import { isObject } from "@cds/core/internal";
import { OAuthErrorEvent } from "angular-oauth2-oidc";

/**
 * Stringify an error.
 *
 * @param error any error
 * @returns The stringified error
 * @deprecated Use `errorToReadableMessage` instead
 */
export function errorToString(error: any): string {
  if (!error) {
    return "Un unexpected error occurred";
  } else if (typeof error === "string") {
    return error;
  } else if (error?.error?.errorMessage) {
    // Keycloak specific error
    return error.error.errorMessage;
  } else if ("error" in error) {
    return errorToString(error.error);
  } else if (error instanceof Error || "message" in error) {
    return error.message;
  } else {
    return JSON.stringify(error);
  }
}

/**
 * Convert an error to a readable message.
 *
 * @param error an error
 * @param stringify stringifies the error if no extractable message is found
 * @returns a readable message or a stringified error if stringify is true, otherwise undefined
 */
export function errorToReadableMessage(error: unknown, stringify: true | string): string;

/**
 * Convert an error to a readable message.
 *
 * @param error an error
 * @param stringify stringifies the error if no extractable message is found
 * @returns a readable message or a stringified error if stringify is true, otherwise undefined
 */
export function errorToReadableMessage(error?: unknown, stringify?: boolean | string): string | undefined;

/**
 * Convert an error to a readable message.
 *
 * @param error an error
 * @param stringify stringifies the error if no extractable message is found
 * @returns a readable message or a stringified error if stringify is true, otherwise undefined
 */
export function errorToReadableMessage(error?: unknown, stringify?: boolean | string): string | undefined {
  // Create a control return
  const controlReturn: (message: string | undefined) => string | undefined =
    stringify === true
      ? (a) => a ?? JSON.stringify(error)
      : typeof stringify === "string"
      ? (a) => a ?? stringify
      : (a) => a;

  // Pre-requisite: error
  if (!error) {
    return controlReturn(undefined);
  }

  // Pre-requisite: not a string
  if (typeof error === "string") {
    return error;
  }

  // Pre-requisite: an object
  if (!isObject(error)) {
    return controlReturn(String(error));
  }

  const errObj = error as object;

  // Handle nested errors
  if ("error" in errObj) {
    return errorToReadableMessage(errObj.error, stringify);
  }

  // Handle Keycloak specific errors
  if ("errorMessage" in errObj) {
    return String(errObj.errorMessage);
  }

  // Handle OpenID interception
  if ("reason" in errObj && "params" in errObj) {
    const errOAuth = error as OAuthErrorEvent & {
      type: "code_error";
      params: { error: string; error_description: string };
    };
    switch (errOAuth.type) {
      case "code_error":
        return `${errOAuth.params.error}: ${errOAuth.params.error_description}`;
      default:
        return `${errOAuth.type}: ${errOAuth.reason}`;
    }
  }

  // Handle generic Error objects
  if (error instanceof Error || "message" in errObj) {
    return (error as Error).message;
  }

  // Nothing found
  return controlReturn(undefined);
}
