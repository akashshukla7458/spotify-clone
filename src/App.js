import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import './App.css';
import Login from "./Login";
import Player from './Player';
import { getTokenFromResponse } from './Spotify';
import { useDataLayerValue } from './DataLayer';


const s = new SpotifyWebApi()

function App() {
  const [{token }, dispatch] = useDataLayerValue()

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token

    if (_token) {
      // setToken(_token)
      s.setAccessToken(_token)

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      s.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        })
      })

      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
           playlists,

        })
      })

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      );

      
      dispatch({
        type: "SET_SPOTIFY",
        spotify: s,
      });

      s.getPlaylist("3VXReCeetN58c1clj9u8ZK").then((response) =>
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
            <Player spotify={s} />
          ) : (
            <Login />
          )
        }
          {token && <Player spotify={s} />}

      </div>
    </>
  );
}

export default App;
