export const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "a8cc5b6097ca4dc98773de70aa847c29";
var redirectUri = "http://localhost:3000/callback";
// var redirectUri = "https://spotify-clone-7d13c.web.app";
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;

        }, {});
}
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;



