import pg from "pg";
import env from "dotenv";


env.config();

const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  })

  async function connect() {
    try {
        const client = await pool.connect();
        return client
    }
    catch (e) {
        console.error(`Failed to connect! ${e}`)
    }
  }

  export let getAllMatches = async() =>{
    const match = {
        omada1: 'omada 1',
        omada2: "omada2",
        field_name: 'Pitch A',
        date: '2024-05-21',
        time: '14:00',
        name: 'Referee 1',
        combined_result: '2-1'
      };
    
    const matches = [];
      matches.push(match);
      matches.push(match);
      matches.push(match);
    return matches;
  }


  
  export async function getAllAnnouncements(callback) {
    const sql = `SELECT * FROM announcement;`;
    try {
        const client = await connect();
        const res = await client.query(sql)
        await client.release()
        callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        callback(err, null);
    }
  }
  
  export async function getEvents(callback, agwnistiki_string = null){
    const sql = `SELECT 
    pl.clubhome AS omada1, pl.clubaway AS omada2, m.field_name, m.date, m.time, pr.name,
    CONCAT(
        COALESCE(
            (SELECT SUM(p.goals)
             FROM participates AS p
             JOIN belongs AS b ON b.footballerid = p.footballerid
             JOIN footballer AS f ON f.id = p.footballerid
             JOIN person AS pr ON pr.id = f.id
             WHERE b.clubname = pl.clubhome AND p.matchid = pl.matchid
            ), 0),
        '-', 
        COALESCE(
            (SELECT SUM(p.goals)
             FROM participates AS p
             JOIN belongs AS b ON b.footballerid = p.footballerid
             JOIN footballer AS f ON f.id = p.footballerid
             JOIN person AS pr ON pr.id = f.id
             WHERE b.clubname = pl.clubaway AND p.matchid = pl.matchid
            ), 0)
    ) AS combined_result
  FROM 
    play AS pl, match as m, referee as r, person as pr
  WHERE pl.matchid = m.matchid and m.judgeid = r.id and r.id = pr.id `
  
  if (agwnistiki_string != null){
    sql = sql + `m.association=`+agwnistiki_string+'ος όμιλος';
  }
  
  
    try {
      const client = await connect();
      const res = await client.query(sql);
      await client.release()
      callback(null, res.rows) // επιστρέφει array
    }
    catch (err) {
        callback(err, null);
    }
  }