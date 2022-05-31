/**
 * Module dependencies.
 */
import express, { Request, Response } from "express";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import logger from "morgan";
import rfs from "rotating-file-stream";
import chalk from "chalk";
import errorHandler from "errorhandler";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";


// const upload = multer({ dest: path.join(__dirname, "uploads") });
import nocache from "nocache";
import http from "http";

import constellationRoutes from './routes/constellationRoutes';
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
 dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * API keys and Passport configuration.
 */

/**
 * Create Express server.
 */

// ROUTES
// ==============================================

const app = express();

const server = http.createServer(app);


/**
 * Connect to MongoDB.
 */
// console.log('process.env.MONGODB_URI')
// console.log('process.env.MONGODB_URI')
// console.log(process.env.MONGODB_URI)

mongoose.connect(`${process.env.MONGODB_URI}`);
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/**
 * Express configuration.
 */
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
// app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set(
  "port",
  process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000
);

app.set("view engine", "pug");
app.use(cookieParser());
// app.use(expressStatusMonitor());

app.use(compression());

app.use(logger("dev"));


app.use(methodOverride());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json())
// app.use(expressValidator());
mongoose.Promise = global.Promise;
const db = mongoose.connection;
// console.log(db)
// console.log('db')


app.use((req, res, next) => {
  console.log('req.path')
  console.log('req.path')
  console.log(req.path)
  // if (req.path === '/api') {
  if (req.path.startsWith("/api") || req.path.startsWith("/webhook")) {
    next();
  } else {
    next();
  }
});
// app.use(lusca.xframe("SAMEORIGIN"));
app.disable("x-powered-by");


app.use(
  "/",
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);






// This sets four headers, disabling a lot of browser caching:
// Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
// Pragma: no-cache
// Expires: 0
// Surrogate-Control: no-store
app.use(nocache());
app.set("etag", false);

// Controllers
/**
 * Primary app routes.
 */
// import HomeController from './controllers/HomeController.js';
// import userApiRoutes from './routes/users/userApiRoutes.js';

// app.get('/',HomeController.home);

// app.use('/api/users', userApiRoutes);


// runProcess();
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("err");
    console.error(err);
    res.status(500).send("Server Error");
  });
}

app.locals.env = process.env;

app.get('/', (req: Request, res: Response): Response => {
  return res.status(200).json({message: 'Hello World!'})
});

app.use('/api/constellation', constellationRoutes);
/**
 * Start Express server.
 */
// Working Code
server.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

// End Working Code
// Clustering code commenting for 


export default app;
