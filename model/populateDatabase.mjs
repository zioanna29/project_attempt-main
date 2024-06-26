import pg from "pg";
import env from "dotenv";


env.config();

const client = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  })

try{
    client.connect();
} catch (error){
    throw Error('Failure connecting to database');
}


export const insertData = async () => {
    try {
        
        let personResult;

        // comitee////////////////////////////////////
        // Insert into Person table
        personResult = await client.query(`
            INSERT INTO Person (Name, BirthDate, Sex) VALUES 
            ('John Doe', '1980-05-15', 'M'),
            ('Jane Smith', '1985-07-20', 'F'),
            ('Alice Johnson', '1990-03-10', 'F'),
            ('Bob Brown', '1975-09-25', 'M')
            RETURNING Id;
        `);
        console.log("id>>>"+personResult.rows[0].id);

        let personIds = personResult.rows.map(row => row.id);
        // Insert into Committee table
        await client.query(`
            INSERT INTO Committee (Type, Position, id) VALUES 
            ('Finance', 'Treasurer', $1),
            ('Event', 'Coordinator', $2),
            ('Management', 'Chairman', $3),
            ('Marketing', 'Manager', $4);
        `,personIds);



      //referee///////////////////////////////////
        personResult = await client.query(`
            INSERT INTO Person (Name, BirthDate, Sex) VALUES 
            ('John Doe', '1980-05-15', 'M'),
            ('Jane Smith', '1985-07-20', 'F'),
            ('Bob Brown', '1975-09-25', 'M')
            RETURNING Id;
        `);
        console.log("id>>>"+personResult.rows[0].id);

        let refereeIds = personResult.rows.map(row => row.id);
        // Insert into Referee table
        await client.query(`
            INSERT INTO Referee (Id) VALUES 
            ($1),
            ($2),
            ($3);
        `,refereeIds);


        //footballer////////////////////////////////////
        personResult = await client.query(`
        INSERT INTO Person (Name, BirthDate, Sex) VALUES 
        ('John Doe', '1980-05-15', 'M'),
        ('Jane Smith', '1985-07-20', 'F'),
        ('Alice Johnson', '1990-03-10', 'F'),
        ('Bob Brown', '1975-09-25', 'M')
        RETURNING Id;
      `);
      console.log("id>>>"+personResult.rows[0].id);

      let footballerIds = personResult.rows.map(row => row.id);

        // Insert into Footballer table
        await client.query(`
            INSERT INTO Footballer (Id) VALUES 
            ($1),
            ($2),
            ($3),
            ($4);
        `,footballerIds);



        //administrator/////////////////////////////////////////
        personResult = await client.query(`
        INSERT INTO Person (Name, BirthDate, Sex) VALUES 
        ('John Doe', '1980-05-15', 'M'),
        ('Alice Johnson', '1990-03-10', 'F'),
        ('Bob Brown', '1975-09-25', 'M')
        RETURNING Id;
    `);
    console.log("id>>>"+personResult.rows[0].id);

      personIds = personResult.rows.map(row => row.id);
        // Insert into Administrator table
        await client.query(`
            INSERT INTO Administrator (Id, password_hash, PhoneNum, Email, Address) VALUES 
            ($1, 'hashedpassword123', '123-456-7890', 'john@example.com', '123 Main St'),
            ($2, 'hashedpassword456', '987-654-3210', 'jane@example.com', '456 Elm St'),
            ($3, 'hashedpassword789', '555-555-5555', 'alice@example.com', '789 Oak St');
        `,personIds);




        // Insert into Club table
        await client.query(`
            INSERT INTO Club (Name, Email, Address) VALUES 
            ('Club A', 'cluba@example.com', '789 Maple Ave'),
            ('Club B', 'clubb@example.com', '101 Pine St'),
            ('Club C', 'clubc@example.com', '303 Cedar St'),
            ('Club D', 'clubd@example.com', '404 Birch St');
        `);

        // Insert into Field table
        await client.query(`
            INSERT INTO Field (Location, Name, Type, Capacity) VALUES 
            ('Downtown', 'Field A', 'Grass', 10000),
            ('Uptown', 'Field B', 'Synthetic', 15000),
            ('Midtown', 'Field C', 'Grass', 12000),
            ('Suburb', 'Field D', 'Synthetic', 8000);
        `);


        let matchRefereesIds = [...refereeIds];
        matchRefereesIds.push(refereeIds[0]);
        for (let index = 0; index < 5; index++) {
            matchRefereesIds.push(refereeIds[0]);
        }
        let matchResult;
        // Insert into Match table
        matchResult = await client.query(`
            INSERT INTO Match (Category, Season, Association, judgeid, date,time, field_name) VALUES 
            ('Α', '2023', '1ος όμιλος',$1,'2023-03-02','09:00','Field A'),
            ('Α', '2024', '1ος όμιλος',$2,'2024-02-04','10:00','Field B'),
            ('Β', '2024', '2ος όμιλος',$3,'2024-02-04','23:00','Field C'),
            ('Γ', '2023', '2ος όμιλος',$4,'2023-11-20','11:00','Field D'),
            ('Κ13', '2023', '3ος όμιλος',$5,'2023-03-02','09:00','Field A'),
            ('Κ13', '2024', '3ος όμιλος',$6,'2024-02-04','10:00','Field B'),
            ('Κ15', '2024', '1ος όμιλος',$7,'2024-02-04','23:00','Field C'),
            ('Κ15', '2023', '4ος όμιλος',$8,'2023-11-20','11:00','Field D'),
            ('Κ17', '2023', '5ος όμιλος',$9,'2023-11-20','11:00','Field D')
            RETURNING MatchId;
        `,matchRefereesIds);
        let matchIds = matchResult.rows.map(row => row.matchid);

        // Insert into Belongs table
        await client.query(`
            INSERT INTO Belongs (StartDate, LastDate, FootballerId, ClubName) VALUES 
            ('2023-01-01', NULL, $1, 'Club A'),
            ('2022-05-10', '2023-05-10', $2, 'Club B'),
            ('2021-09-15', NULL, $3, 'Club C'),
            ('2020-11-20', '2022-11-20', $4, 'Club D');
        `,footballerIds);

 
        let matchParticipatesIds = matchIds.slice(0,4);
        let ParticipatesIds = footballerIds.concat(matchParticipatesIds);
        // Insert into Participates table
        await client.query(`
            INSERT INTO Participates (MinutesPlayed, YellowCard, RedCard, Goals, OwnGoals, FootballerId, MatchId) VALUES 
            (90, 1, FALSE, 1, 0, $1, $5),
            (85, 0, FALSE, 2, 0, $2, $6),
            (75, 2, TRUE, 0, 1, $3, $7),
            (90, 1, FALSE, 3, 0, $4, $8);
        `,ParticipatesIds);


        // Insert into Play table
        await client.query(`
            INSERT INTO Play (ClubHome, ClubAway, FieldName, MatchId) VALUES 
            ('Club A', 'Club B', 'Field A', $1),
            ('Club B', 'Club A', 'Field B', $2),
            ('Club C', 'Club D', 'Field C', $3),
            ('Club D', 'Club C', 'Field D', $4),
            ('Club A', 'Club B', 'Field A', $5),
            ('Club B', 'Club A', 'Field B', $6),
            ('Club C', 'Club D', 'Field C', $7),
            ('Club D', 'Club C', 'Field D', $8),
            ('Club D', 'Club C', 'Field D', $9)
        `,matchIds);

        client.query(`
        INSERT INTO Announcement (Title, TextInput, DateAnnounced, TimeAnnounced, AdminId) VALUES 
        ('Announcement 1', 'Lorem ipsum dolor sit amet.', '2023-05-15', '09:00', $1),
        ('Announcement 2', 'Lorem ipsum dolor sit amet.', '2023-05-20', '10:00', $2),
        ('Announcement 3', 'Lorem ipsum dolor sit amet.', '2023-05-25', '11:00', $3);
    `,personIds);

        console.log('Data inserted successfully.');
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        await client.end();
    }
};

