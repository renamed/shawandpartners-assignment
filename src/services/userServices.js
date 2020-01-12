const userRepository = require("../externalServices/userRepository")

async function getAllUsers(since) {
    if (since < 0) {
        return { "errorMessage": `Since parameter must be positive. I received ${since}` };
    }

    const result = await userRepository.getAllUsers(since);
    const nextSince = !result.length ? 0 : Math.max.apply(Math, result.map(function (o) { return o.id; }));

    return {
        users: result,
        nextIndex: nextSince
    };
}

async function getUser(username) {
    if (!username) {
        return { "errorMessage": "Invalid username" };
    }

    return await userRepository.getUser(username);
}

async function getRepos(username) {
    if (!username) {
        return { "errorMessage": "Invalid username" };
    }

    return await userRepository.getRepos(username);
}

module.exports = {
    getAllUsers,
    getUser,
    getRepos
}