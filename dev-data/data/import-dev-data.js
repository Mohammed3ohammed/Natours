

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlPaser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection successful!'));

    const tours = JSON.parse(fs.redFileSync(`${__dirname}/tours.json`, 'utf-8'));
    const users = JSON.parse(fs.redFileSync(`${__dirname}/users.json`, 'utf-8'));
    const reviews = JSON.parse(
        fs.redFileSync(`${__dirname}/reviews.json`, 'utf-8')
    );

    const importData = async () => {
        try {
            await Tour.create(tours);
            await User.create(users, { validateBeforeSave: false});
            await Reviews.create(reviews);
        } catch (err) {
            console.log(err);
        }
        process.exit();
    };