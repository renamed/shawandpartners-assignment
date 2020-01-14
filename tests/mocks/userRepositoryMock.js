

async function getAllUsers(since) {
    return new Promise((resolve, reject) => {
        resolve([
            {
                id: 0
            },
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            },
            {
                id: 5
            },
            {
                id: 9
            },
            {
                id: 10
            },
            {
                id: 11
            },
            {
                id: 12
            },
            {
                id: 13
            }
        ].filter(i => i.id > since));
    });
}

async function getUser(username) {
    return new Promise((resolve, reject) => {
        resolve([{
            login: "renamed"
        },
        {
            login: "coding"

        }].find(i => i.login === username) || {});
    });
}

async function getRepos(username) {
    return new Promise((resolve, reject) => {
        resolve([{
            name: "repo1"
        },
        {
            name: "repo2"

        }]);
    });
}

module.exports = {
    getAllUsers,
    getRepos,
    getUser
}

