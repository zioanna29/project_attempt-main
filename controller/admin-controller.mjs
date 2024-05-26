import * as model from "../model/local-championship-model.mjs"

export async function addAgwnas(req,res) {
    res.redirect('/admin/agwnas/addAgwnas');
  }



export async function addAnakoinwsh(req,res) {
 
  console.log("POST /create session=", req.session);
  const adminID = req.session.loggedUserId;
  const newAnnouncement = { "title": req.body.title, "textinput": req.body.textinput, "dateannounced": req.body.dateannounced, "timeannounced": req.body.timeannounced, "adminid":adminID }
  model.newAnnouncement(newAnnouncement,
    (err, data) => {
      if (err)
        return console.error(err.message);
      else
        res.redirect("/admin/anakoinwsh/addAnakoinwsh");
    });
  }

export async function deleteAnakoinwsh(req,res) {

  const deleteAnakoinwsh = { "code": req.body.code}
  model.deleteAnnouncement(deleteAnakoinwsh,
    (err, data) => {
      if (err){
        console.log("here is the error")
        return console.error(err.message);
      }
      else
        res.redirect("/admin/anakoinwsh/deleteAnakoinwsh");
    });
}

export async function alterAnakoinwsh(req,res) {
  const newAnnouncement = {"code":req.body.code ,"title": req.body.title, "textinput": req.body.textinput, "dateannounced": req.body.dateannounced, "timeannounced": req.body.timeannounced}
  model.alterAnnouncement(newAnnouncement,
    (err, data) => {
      if (err)
        return console.error(err.message);
      else
        res.redirect("/admin/anakoinwsh/alterAnakoinwsh");
    });
  }