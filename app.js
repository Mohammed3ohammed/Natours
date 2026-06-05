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

app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(mongoSanitize());

app.use(xss());

app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroubSize',
            'difficulty',
            'price'
        ]
    })
);

app.use(compression());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

    app.use('/', viewRouter)
    app.use('/api/v1/tours', tourRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/bookings', bookingRouter);

    app.all('*', (req, res, next) =>  {
         next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });

    app.use(globalErrorHandler);

    module.exports = app;