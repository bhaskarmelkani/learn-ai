export function formatBrowserAIError(error: unknown) {
  if (error instanceof Error) {
    if (/network|fetch|download|cors/i.test(error.message)) {
      return "The browser could not download the required model files. Check your connection and try again.";
    }

    if (/worker/i.test(error.message)) {
      return "This browser AI lab could not start its worker runtime.";
    }

    return error.message;
  }

  return "The browser AI task failed.";
}
