import * as model from "../model/local-championship-model.mjs"

export async function diorganwseisFilter(req,res) {
    const startDate  = req.query.startDate;
    const endDate = req.query.endDate;
    const category = req.query.kathgoria;
    const association = req.query.agwnistikh;
    res.render('./agwnes/diorganwseis.ejs', {matches: await model.getAllMatches(startDate, endDate, category,association)});
    
  }


  export async function showAnnouncements(req, res) {
    try {
      await model.getAllAnnouncements((err, rows) => {
        for (let i=0; i<rows.length; i++){
          rows[i].dateannounced = rows[i].dateannounced.toISOString().split('T')[0] ;
          rows[i].timeannounced = rows[i].timeannounced.slice(0, 5);
       }
        res.render('anakoinwseis/anakoinwseis.ejs', {data:rows});
      });
      //res.render('../views/anakoinwseis/anakoinwseis.ejs',{announcement:announcements});
     }
     catch (err) {
        res.send(err);
     }
}

export async function showEvents(req, res) {
   try {
      await model.getEvents((err, rows) => {
         for (let i=0; i<rows.length; i++){
            rows[i].date = rows[i].date.toISOString().split('T')[0];
            rows[i].time = rows[i].time.slice(0, 5);
         }
         res.render("agwnes/diorganwseis.ejs", {matches:rows});
      });
    }
   catch (err) {
      res.send(err);
   }
}


/*sxolio*/