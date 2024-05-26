import express from 'express';

import * as diorganwseisController from "../controller/diorganwseis-controller.mjs"
import * as adminController from "../controller/admin-controller.mjs"
import * as logInController from '../controller/login-controller.mjs';

const router = express.Router();

//router.use(express.urlencoded({extended:true}))
//Get Homepage
router.get("/", (req, res) => {
    res.render("index.ejs");
  });
  
  router.get("/admin", (req, res) => {
    res.render("admin.ejs");
  });
  
  router.get("/page2", (req, res) => {
    res.render("page2.ejs");
  });
  
  // anakoinwseis
  // router.get("/anakoinwseis", (req, res) => {
  //   res.render("./anakoinwseis/anakoinwseis.ejs");
  // });
  
  router.get('/anakoinwseis', diorganwseisController.showAnnouncements);

  // agwnes
  router.get("/programma", (req, res) => {
    res.render("./agwnes/programma.ejs");
  });
  
  router.get("/apotelesmata", (req, res) => {
    res.render("./agwnes/apotelesmata.ejs");
  });
  
  router.get("/vathmologies", (req, res) => {
    res.render("./agwnes/vathmologies.ejs");
  });
  
  router.get("/poines", (req, res) => {
    res.render("./agwnes/poines.ejs");
  });
  
  const match = {
    name: 'Match 1',
    pitch: 'Pitch A',
    date: '2024-05-21',
    time: '14:00',
    referee: 'Referee 1',
    result: '2-1'
  };

  const matches = [];
  matches.push(match);
  matches.push(match);
  
  router.get("/diorganwseis", diorganwseisController.diorganwseisFilter);
  
  router.get("/statistika", (req, res) => {
    res.render("./agwnes/statistika.ejs");
  });
  
  // genika
  router.get("/ghpeda", (req, res) => {
    res.render("./genika/ghpeda.ejs");
  });
  
  router.get("/podosfairistes", (req, res) => {
    res.render("./genika/podosfairistes.ejs");
  });
  
  router.get("/swmateia", (req, res) => {
    res.render("./genika/swmateia.ejs");
  });
  
  router.get("/entypa", (req, res) => {
    res.render("./genika/entypa.ejs");
  });
  
  router.get("/deltio", (req, res) => {
    res.render("./genika/deltio.ejs");
  });
  
  router.get("/diaithsia", (req, res) => {
    res.render("./genika/diaithsia.ejs");
  });
  
  router.get("/kanonismoi", (req, res) => {
    res.render("./genika/kanonismoi.ejs");
  });
  
  router.get("/epitropes", (req, res) => {
    res.render("./genika/epitropes.ejs");
  });
  
  // router.get("/login", (req, res) => {
  //   res.render("./login.ejs");
  // });
  
  router.get("/register", (req, res) => {
    res.render("./register.ejs");
  })
  
  router.post("/register", async(req, res)=>{
    const email = req.body.username;
    const password = req.body.password;
  
    const result = await db.query(
      "INSERT INTO person (name) VALUES ('Nicolas'); SELECT lastval(); INSERT INTO administrator (id, email, password_hash) VALUES (lastval(), $1, $2);",
      [email, password]
    )
    console.log(result);
    res.redirect("/");
  })
  
  // router.post("/login", async(req, res)=>{
  //   // login logic here
  // })
  
  
  // router.post("/login", async(req, res)=>{
  //   const email = req.body.username;
  //   const password = req.body.password;
  
  // });

  router.get("/admin/agwnas", (req,res) =>{
    res.render("./admin/addAgwnas.ejs");
  });

  router.get("/admin/atomo", (req,res) =>{
    res.render("./admin/atomo.ejs");
  });

  router.get("/admin/omada", (req,res) =>{
    res.render("./admin/omada.ejs");
  });

  router.get("/admin/anakoinwsh", (req,res) =>{
    res.render("./admin/addAnakoinwsh.ejs");
  });

  router.route('/diorganwseis-filter').get(diorganwseisController.diorganwseisFilter);

  router.route('/admin/agwnas/addAgwnas/proccess').post(adminController.addAgwnas);

  router.get("/admin/agwnas/addAgwnas", (req,res) =>{
    res.render("./admin/addAgwnas.ejs");
  });

  router.get("/admin/agwnas/alterAgwnas", (req,res) =>{
    res.render("./admin/alterAgwnas.ejs");
  });

  router.get("/admin/agwnas/deleteAgwnas", (req,res) =>{
    res.render("./admin/deleteAgwnas.ejs");
  });

  router.get("/admin/anakoinwsh/addAnakoinwsh", (req,res) =>{
    res.render("./admin/addAnakoinwsh.ejs");
  });

  router.get("/admin/anakoinwsh/alterAnakoinwsh", (req,res) =>{
    res.render("./admin/alterAnakoinwsh.ejs");
  });

  router.get("/admin/anakoinwsh/deleteAnakoinwsh", (req,res) =>{
    res.render("./admin/deleteAnakoinwsh.ejs");
  });


  router.route('/admin/anakoinwsh/addAnakoinwsh/proccess').post(adminController.addAnakoinwsh);

  router.route('/admin/anakoinwsh/deleteAnakoinwsh/proccess').post(adminController.deleteAnakoinwsh);

  router.route('/admin/anakoinwsh/alterAnakoinwsh/proccess').post(adminController.alterAnakoinwsh);
  router.get("/management", (req,res) =>{
    res.render("./admin/agwnas.ejs");
  });

router.route('/login').get(logInController.checkAuthenticated, logInController.showLogInForm);

router.route('/login').post(logInController.doLogin);
  
router.route('/logout').get(logInController.doLogout);
  
// router.route('/register').get(logInController.checkAuthenticated, logInController.showRegisterForm);
  
// router.post('/register', logInController.doRegister);
  

  export default router;