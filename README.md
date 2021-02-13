# Server for lyrics finder app

This server acts as a bridge to any API server that requires access token with CORS so that only YOUR frontend application can access this server

App: <https://tejas-lyrics-finder.netlify.app>

## How to setup:

`git clone`

`cd`

`npm i`

`npm run develop` to start a development server

Open <http://localhost:4000> on your browser

To use, send POST request to `/` with URL as request `body`.

## Further plans:

- Make an npm package
