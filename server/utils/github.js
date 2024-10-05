function gitImage(user, repo, branch, path) {
    const url = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`;
    return url;
}

module.exports = {
    gitImage
};
