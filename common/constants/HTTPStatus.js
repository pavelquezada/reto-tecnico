//Reference: https://developer.mozilla.org/es/docs/Web/HTTP/Status

module.exports = {
    STATUS_OK: 200,
    STATUS_CREATED: 201,
    
    STATUS_BAD_REQUEST: 400,
    STATUS_UNAUTHORIZED: 401,
    STATUS_PAYMENT_REQUIRED: 402,
    STATUS_FORBIDDEN: 403,
    STATUS_NOT_FOUND: 404,
    STATUS_METHOD_NOT_ALLOWED: 405,
    STATUS_NOT_ACCEPTABLE: 406,

    STATUS_INTERNAL_SERVER_ERROR: 500,
    STATUS_NOT_IMPLEMENTED: 501,
    STATUS_BAD_GATEWAY: 502,
    STATUS_GATEWAY_TIMEOUT: 504
}
