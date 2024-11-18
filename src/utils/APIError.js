class APIError extends Error {
    constructor(status, code, message) { // E.g., Status=error, code-404, message="Data not found" 
        super(errorMessage);
        this.status = status;
        this.code = code;
        this.message = message;
    }
}

export { APIError }