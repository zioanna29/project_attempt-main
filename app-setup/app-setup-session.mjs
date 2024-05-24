import session from 'express-session'

/********************************************************************/
let LCSession = 
session({
name: 'lc-session',
secret: process.env.SESSION_SECRET || "enamegalotuxaioalfarithmitiko",
cookie: {
    maxAge:1000*60*60*2,
    sameSite: true
},
resave: false,
saveUninitilized: false
});

 /********************************************************************/

export default LCSession;