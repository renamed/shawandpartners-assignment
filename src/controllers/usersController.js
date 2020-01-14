const { ok, badRequest, internalServerError } = require("./response")
const userServices = require("../config/dependencies")("userService")

/**
 * @typedef ErrorModel
 * @property {string} message
 */

/**
 * @typedef GetAllUsersItemResponse
 * @property {string} login
 * @property {integer} id
 * @property {string} node_id
 * @property {string} avatar_url
 * @property {string} gravatar_id
 * @property {string} url
 * @property {string} html_url
 * @property {string} followers_url
 * @property {string} following_url
 * @property {string} gists_url
 * @property {string} starred_url
 * @property {string} subscriptions_url
 * @property {string} organizations_url
 * @property {string} repos_url
 * @property {string} events_url
 * @property {string} received_events_url
 * @property {string} type
 * @property {boolean} site_admin
 */

/**
 * @typedef GetAllUsersResponse
 * @property {Array.<GetAllUsersItemResponse>} users - A list of users
 * @property {string} next_list_url - the url for the next list of users.
 */

/**
 * Returns a list of users
 * 
 * @route GET /api/users
 * @group Users
 * @param {integer} since.query.required - the lower threashold from whoch we will return users
 * @returns {GetAllUsersResponse.model} 200
 * @returns {ErrorModel.model} 400
 *  
 */
async function getAllUsers(req, resp) {
    const since = req.query.since;

    try {
        const result = await userServices.getAllUsers(since);
        if (result.errorMessage)
            return badRequest(resp, { "message": result.errorMessage });
        return ok(resp, {
            next_url: req.protocol + "://" + req.get("Host") + `/users?since=${result.nextIndex}`,
            users: result.users
        });
    } catch (e) {
        console.error("error " + e.message + " " + e);
        internalServerError(resp);
    }
}

/**
 * @typedef GetUserPlanResponse
 * @property {string} name
 * @property {integer} space
 * @property {integer} collaborators
 * @property {integer} private_repos
 */

/**
 * @typedef GetUserResponse
 * @property {string} login
 * @property {integer} id 
 * @property {string} node_id
 * @property {string} avatar_url
 * @property {string} gravatar_id
 * @property {string} url
 * @property {string} html_url
 * @property {string} followers_url
 * @property {string} following_url
 * @property {string} gists_url
 * @property {string} starred_url
 * @property {string} subscriptions_url
 * @property {string} organizations_url
 * @property {string} repos_url
 * @property {string} events_url
 * @property {string} received_events_url
 * @property {string} type
 * @property {boolean} site_admin 
 * @property {string} name
 * @property {string} company
 * @property {string} blog
 * @property {string} location
 * @property {string} email
 * @property {boolean} hireable
 * @property {string} bio
 * @property {integer} public_repos 
 * @property {integer} public_gists 
 * @property {integer} followers 
 * @property {integer} following
 * @property {string} created_at
 * @property {string} updated_at
 * @property {integer} private_gists 
 * @property {integer} total_private_repos 
 * @property {integer} owned_private_repos 
 * @property {integer} disk_usage 
 * @property {integer} collaborators 
 * @property {boolean} two_factor_authentication 
 * @property {GetUserPlanResponse} plan
 */

/**
 * Returns information about one user.
 * If the username does not exist, an empty object will be returned
 * 
 * @route GET /api/users/{username}/details
 * @group Users
 * @param {string} username.path.required - the username whose information we want to retrieve
 * @returns {GetUserResponse.model} 200
 * @return {ErrorModel.model} 400
 * 
 * 
 */
async function getUser(req, resp) {
    const username = req.params.username;

    try {
        const result = await userServices.getUser(username);
        if (result.errorMessage)
            return badRequest(resp, { "message": result.errorMessage });
        return ok(resp, result);
    } catch (e) {
        console.error("error " + e.message + " " + e);
        internalServerError(resp);
    }

}

/**
 * @typedef GetUserReposOwnerResponse
 * 
 * @property {string} login
 * @property {integer} id
 * @property {string} node_id
 * @property {string} avatar_url
 * @property {string} gravatar_id
 * @property {string} url
 * @property {string} html_url
 * @property {string} followers_url
 * @property {string} following_url
 * @property {string} gists_url
 * @property {string} starred_url
 * @property {string} subscriptions_url
 * @property {string} organizations_url
 * @property {string} repos_url
 * @property {string} events_url
 * @property {string} received_events_url
 * @property {string} type
 * @property {boolean} site_admin
 * 
 */

/**
 * @typedef GetUserReposPermissionsResponse
 * @property {boolean} admin
 * @property {boolean} push
 * @property {boolean} pull
 */

/**
 * @typedef GetUserReposLicenseResponse
 * @property {string} key
 * @property {string} name
 * @property {string} spdx_id
 * @property {string} url
 * @property {string} node_id
 */

/**
 * @typedef GetUserReposResponse
 * @property {integer} id
 * @property {string} node_id
 * @property {string} name
 * @property {string} full_name
 * @property {boolean} private
 * @property {GetUserReposOwnerResponse.model} owner
 * @property {string} html_url
 * @property {string} description
 * @property {boolean} fork
 * @property {string} url
 * @property {string} forks_url
 * @property {string} keys_url
 * @property {string} collaborators_url
 * @property {string} teams_url
 * @property {string} hooks_url
 * @property {string} issue_events_url
 * @property {string} events_url
 * @property {string} assignees_url
 * @property {string} branches_url
 * @property {string} tags_url
 * @property {string} blobs_url
 * @property {string} git_tags_url
 * @property {string} git_refs_url
 * @property {string} trees_url
 * @property {string} statuses_url
 * @property {string} languages_url
 * @property {string} stargazers_url
 * @property {string} contributors_url
 * @property {string} subscribers_url
 * @property {string} subscriptions_url
 * @property {string} commits_url
 * @property {string} git_commits_url
 * @property {string} comments_url
 * @property {string} issue_comments_url
 * @property {string} contents_url
 * @property {string} compare_url
 * @property {string} merges_url
 * @property {string} archive_url
 * @property {string} downloads_url
 * @property {string} issues_url
 * @property {string} pulls_url
 * @property {string} milestones_url
 * @property {string} notifications_url
 * @property {string} labels_url
 * @property {string} releases_url
 * @property {string} deployments_url
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} pushed_at
 * @property {string} git_url
 * @property {string} ssh_url
 * @property {string} clone_url
 * @property {string} svn_url
 * @property {string} homepage
 * @property {integer} size
 * @property {integer} stargazers_count
 * @property {integer} watchers_count
 * @property {string} language
 * @property {boolean} has_issues
 * @property {boolean} has_projects
 * @property {boolean} has_downloads
 * @property {boolean} has_wiki
 * @property {boolean} has_pages
 * @property {integer} forks_count
 * @property {string} mirror_url
 * @property {boolean} archieved
 * @property {boolean} disabled
 * @property {integer} open_issues_count
 * @property {GetUserReposLicenseResponse.model} license
 * @property {integer} forks
 * @property {integer} open_issues
 * @property {integer} watchers
 * @property {string} default_branch
 * @property {GetUserReposPermissionsResponse.model} permissions
 */

/**
 * Returns information about one user's repositories on Github
 * 
 * @route GET /api/users/{username}/repos
 * @group Users
 * @param {string} username.path.required - the username whose information we want to retrieve
 * @returns {Array.<GetUserReposResponse>} 200
 * @return {ErrorModel.model} 400
 * 
 * 
 */
async function getRepos(req, resp) {
    const username = req.params.username;

    try {
        const result = await userServices.getRepos(username);
        if (result.errorMessage)
            return badRequest(resp, { "message": result.errorMessage });
        return ok(resp, result);
    } catch (e) {
        console.error("error " + e.message + " " + e);
        internalServerError(resp);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    getRepos
}