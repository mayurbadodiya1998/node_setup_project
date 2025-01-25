class Response {
    constructor() { }
    success(message, data, metadata) {
        let obj = {
            message,
            success: 1,
            data: data || {}
        }
        if (metadata) {
            obj['meta'] = metadata;
        }
        return obj
    }

    failure(message, error_code, error) {
        return {
            message: message,
            status: "error",
            success: 0,
            data: null,
            error: {
                code: error_code,
                details: error
            }
        }
    }
}
export default new Response();