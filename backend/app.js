const express = require('express');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', Path.join(__dirname, 'views'));

app.use(cors());

app.options('*', cors());

app.use(express.static(Path.join(__dirname, 'public')));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

app.post(
    '/webhook-checkout',
    bodyParser.raw({type: 'application/json' }),
    bookingController.webhookCheckout
);

