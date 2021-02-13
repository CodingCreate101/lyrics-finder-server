const express = require('express');
const Axios = require('axios');
var cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const {
  API_ENDPOINT = 'https://api.genius.com',
  API_TOKEN,
  PORT = 4000,
  ALLOWED_ORIGINS = `["http://localhost:3000", "http://localhost:4000"]`,
} = process.env;

var whitelist = JSON.parse(ALLOWED_ORIGINS);

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json());

Axios.defaults.baseURL = API_ENDPOINT;

app.get('/', (req, res) => {
  res.send(
    `
    <h1>Server for lyrics finder app</h1>
    <p>Visit <a target="_blank" href="${whitelist[1]}">${whitelist[1]}</a> </p>
    `
  );
});

app.post('/', async (req, res) => {
  const { url } = req.body;

  const searchRequest = Axios.create();

  try {
    const searchResponse = await searchRequest({
      method: 'GET',
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    res.json({ success: searchResponse.data });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
