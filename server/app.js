const server         = require('express')(),
      expressSession = require('express-session'),
      cookieParser   = require('cookie-parser'),
      passport       = require('passport'),
      cors           = require('cors'),
      mongoose       = require('mongoose'),
      MongoStore     = require('connect-mongo')(expressSession),
      keys           = require('./config/keys'),
      fs             = require('fs'),
      multer         = require('multer'),
      path           = require('path'),

      upload = multer({ dest: `${__dirname}\\assets` });
      //--------------Controllers--------------------------------------
      authControllers    = require('./controllers/auth-controllers'),
      productControllers = require('./controllers/products-controllers'),
      cartControllers    = require('./controllers/carts-controllers'),
      usersControllers   = require('./controllers/users-controllers'),
      ordersControllers  = require('./controllers/orders-controllers');


// Server Setup
server.use(require('express').json());
server.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));
server.use(require('express').static(__dirname));

// DB Setup
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, (err, mongoClient) => {
    if (err) return console.log(err);
    console.log(`Connected to ${mongoClient.name}`);
});
server.use(expressSession({
    name: keys.session.name,
    resave: false,
    saveUninitialized: false,
    secret: keys.session.cookieKey,
    cookie: {
        maxAge: 35000000,
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Upload - Image 
server.post("/upload-image", upload.any() ,(req, res) => {
    const fileType = path.extname(req.files[0].originalname);
    const fileOriginal = `${req.files[0].destination}\\${req.body.category}\\${req.body.productName}${fileType}`;
    const multerFilename = `${req.files[0].destination}\\${req.files[0].filename}`;
    fs.rename(multerFilename, fileOriginal, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(200).json("Done");
        
    });
});

// Passport.js
require('./config/passport-setup');
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

// Connect Controllers to Server
server.use('/api/auth', authControllers);
server.use('/api/stock', productControllers);
server.use('/api/carts', cartControllers);
server.use('/api/users', usersControllers);
server.use('/api/orders', ordersControllers);

server.listen(keys.env.PORT, () => console.log(`Connected to port ${keys.env.PORT}`));