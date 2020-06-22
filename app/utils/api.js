// const id = 

// const params = `?client_id=${id}&client_secret=${sec}`


function getErrMsg (message, username) {
    if (message === 'Not Found') {
        return `${username} doesn't exist bruh`
    }

    return message
}

function getStarCount (repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
}

function makeScore (followers, repos) {
    return (followers * 3) + getStarCount(repos)
}

async function getProfile (username) {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const profile = await res.json()
    if (profile.message) {
        throw new Error(getErrMsg(profile.message, username));
    }
    return profile
}

async function getRepos (username) {
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    const repos = await res.json()
    if (repos.message) {
        throw new Error(getErrMsg(repos.message, username));
    }
    return repos
}

function sortPlayers (players) {
    return players.sort((a, b) => b.score - a.score)
}

async function getUserData (player) {
    const [profile, repos] = await Promise.all([
        getProfile(player),
        getRepos(player)
    ])
    return ({
        profile,
        score: makeScore(profile.followers, repos)
    })
}

export async function battle (players) {
    const results = await Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ])
    return sortPlayers(results)
}

export async function fetchPopularRepos (lang) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=stars&order=desc&type=Repositories`)
    let response = await fetch(endpoint)
    let data = await response.json()
    if (!data.items) {
        throw new Error(data.message)
    }
    
    return data.items
}
