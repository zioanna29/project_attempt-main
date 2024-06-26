import * as model from "../model/local-championship-model.mjs"

export async function diorganwseisFilter(req,res,next) {
   try{
      const startDate  = req.query.startDate;
      const endDate = req.query.endDate;
      const category = req.query.kathgoria;
      const association = req.query.agwnistikh;
      res.render('./agwnes/diorganwseis.ejs', {matches: await model.getAllMatches(startDate, endDate, category,association), association:association, category:category, startDate:startDate, endDate:endDate});
      
   }catch(err){
      next(err);
   }
   
  }

  export async function showAnnouncements(req, res,next) {
    try {
        res.render('anakoinwseis/anakoinwseis.ejs', {data: await model.getAllAnnouncements()});
     }
     catch (err) {
        next(err);
     }
}


export async function showEvents(req, res,next) {
   try {
      await model.getEvents((err, rows) => {
         for (let i=0; i<rows.length; i++){
            rows[i].date = rows[i].date.toISOString().split('T')[0];
            rows[i].time = rows[i].time.slice(0, 5);
         }
         res.render("./agwnes/diorganwseis.ejs", {matches:rows});
      });
    }
   catch (err) {
      next(err);
   }
}
