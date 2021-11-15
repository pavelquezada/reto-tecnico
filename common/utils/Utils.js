const response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
};

module.exports = {
    response
}