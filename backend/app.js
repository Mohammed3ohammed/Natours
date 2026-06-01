const express = require('express');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', Path.join(__dirname, 'views'));

app.use(cors());

app.options('*', cors());

app.use(express.static(Path.join(__dirname, 'public')));

app.use(helmet());