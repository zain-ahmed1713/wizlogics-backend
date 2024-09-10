class APIResponse {
    constructor(status, code, data, message) { // Status=success, code=200, data=[], message="Any message"
        this.status = status;
        this.code = code;
        this.data = data;
        this.message = message;
    }
}

export { APIResponse }