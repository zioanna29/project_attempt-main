import express from "express";
import env from "dotenv";
env.config();
const app = express();
//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));

app.set('view engine', 'ejs');


import LCSession from  './app-setup/app-setup-session.mjs';
app.use(LCSession);

app.use((req, res, next) => {
  if (req.session) {
     res.locals.userId = req.session.loggedUserId;
  } else {
     res.locals.userId = 'επισκέπτης';
  }
  next();
});

import routes from './routes/local-championship-routes.mjs';
app.use('/', routes);




const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
      message: err.message,
      stacktrace: err.stack
  });
};
app.use(errorHandler);

const port  = process.env.PORT;
app.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
});
