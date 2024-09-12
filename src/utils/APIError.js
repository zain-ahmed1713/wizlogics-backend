class APIError extends Error {
    constructor(status, code, errorMessage) { // E.g., Status=error, code-404, message="Data not found" 
        super(errorMessage);
        this.status = status;
        this.code = code;
        this.errorMessage = errorMessage;
    }
}

export { APIError }