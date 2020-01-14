const fetch = require("node-fetch");

async function getGithubApi(urlSuffix) {
    const apiToken = process.env.GITHUB_TOKEN;
    const url = process.env.GITHUB_BASE_URL + urlSuffix;

    const request = await fetch(url, {
        method: 'get',
        headers: {
            Authorization: `token ${apiToken}`
        }
    });

    const response = await request.json();
    if (!request.ok) {
        console.error(request);
        console.error(response);
        return {
            errorMessage: `The API returned a non-successful code: ${request.statusText}.`,
            statusCode: request.status
        };
    }

    return response;
}

async function getAllUsers(since) {
    return await getGithubApi(`/users?since=${since}`);
}

async function getUser(username) {
    const apiResponse = await getGithubApi(`/users/${username}`);
    return apiResponse.statusCode === 404 ? {} : apiResponse;
}

async function getRepos(username) {
    const apiResponse = await getGithubApi(`/users/${username}/repos`);
    return apiResponse.statusCode === 404 ? {} : apiResponse;
}

module.exports = {
    getAllUsers,
    getUser,
    getRepos
}