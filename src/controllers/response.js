function response(statusCode, resp, obj) {
    return resp.status(statusCode).send(obj || {});
}


function ok(resp, obj) {
    return response(200, resp, obj);
}

function badRequest(resp, obj) {
    return response(400, resp, obj);
}

function internalServerError(resp) {
    return response(500, resp, {});
}

module.exports = {
    response,
    ok,
    badRequest,
    internalServerError
}