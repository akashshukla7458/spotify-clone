import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.css';
import Login from "./Login";
import Player from './Player';
import { getTokenFromResponse } from './Spotify';
import { useDataLayerValue } from './DataLayer';


const spotify = new SpotifyWebApi()

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      // setToken(_token)
      spotify.setAccessToken(_token)

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        })
      })

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,

        })
      })

      spotify.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      spotify.getPlaylist("3VXReCeetN58c1clj9u8ZK").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      )

    }
  }, [token, dispatch])
  return (
    <>
      <div className="App">
        {
          token ? (
            <Player />
          ) : (
            <Login />
          )
        }
          {token && <Player spotify={spotify} />}

      </div>
    </>
  );
}

export default App;
