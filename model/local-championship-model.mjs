import pg from "pg";
import env from "dotenv";
import * as populate from "./populateDatabase.mjs";

env.config();

const pool = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

async function connect() {
    try {
        const client = await pool.connect();
        return client;
    } catch (e) {
        console.error(`Failed to connect! ${e}`);
        throw e; // Re-throw the error to be handled by the caller
    }
}

// Populate database for testing
const insertData = false; // Set to true to populate the database
if (insertData) {
    populate.insertData();
}

export async function getAllMatches(startDate = "", endDate = "", category_string = "", association_string = "") {
    const matches = [];

    let sql = `SELECT 
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
  WHERE pl.matchid = m.matchid and m.judgeid = r.id and r.id = pr.id `;

    if (association_string !== "") {
        sql += "and m.association=" + "'" + association_string + "ος όμιλος' ";
    }

    if (category_string !== "") {
        sql += "and m.category=" + "'" + category_string + "'";
    }

    if (startDate !== "") {
        sql += " and m.date between " + "'" + startDate + "'" + " and " + "'" + endDate + "'";
    }

    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].date = res.rows[i].date.toISOString().split('T')[0];
            res.rows[i].time = res.rows[i].time.slice(0, 5);
            matches.push(res.rows[i]);
        }
    } catch (err) {
        console.error('Error fetching matches:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
    return matches;
}

export async function getAllAnnouncements() {
    const sql = `SELECT * FROM announcement;`;
    try {
        const client = await connect();
        const res = await client.query(sql);
        await client.release();
        return res.rows; // Return the array directly
    } catch (err) {
        console.error('Error fetching announcements:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
}