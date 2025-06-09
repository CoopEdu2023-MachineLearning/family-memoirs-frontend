
export class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const validateResponse = (res, errorMessage) => {
  if (res.status !== 200) {
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  if (res.data.code !== 0) {
    console.error(errorMessage);
    console.error(res.data.message);
    throw new ApiError(res.data.message, res.data.code);
  }
};

export const replaceError = (errorMessage) => (error) => {
  if (error instanceof Error && !(error instanceof ApiError)) {
    throw new Error(errorMessage);
  } else {
    throw error;
  }
};
