CREATE TABLE Person (
    Id SERIAL PRIMARY KEY,
    Name VARCHAR(100),
    BirthDate DATE,
    Sex CHAR(1),
    UNIQUE (Id)
);

CREATE TABLE Committee (
    Id SERIAL PRIMARY KEY,
    Type VARCHAR(100),
    Position VARCHAR(100),
    Person_Id INT REFERENCES Person(Id)
);

CREATE TABLE Referee (
    Id INT PRIMARY KEY REFERENCES Person(Id)
);

CREATE TABLE Footballer (
    Id INT PRIMARY KEY REFERENCES Person(Id)
);

DROP TABLE Administrator;
CREATE TABLE Administrator (
    Id INT PRIMARY KEY REFERENCES Person(Id) ON UPDATE CASCADE,
    password_hash VARCHAR(100) NOT NULL,
    PhoneNum VARCHAR(20),
    Email VARCHAR(100),
    Address VARCHAR(255)
);

CREATE TABLE Club (
    Name VARCHAR(100) PRIMARY KEY,
    Email VARCHAR(100),
    Address VARCHAR(255)
);

CREATE TABLE Field (
    Location VARCHAR(100) NOT NULL,
    Name VARCHAR(100) NOT NULL UNIQUE,
    Type VARCHAR(100),
    Capacity INT,
    ClubName VARCHAR(100),
    FOREIGN KEY (ClubName) REFERENCES Club(Name)
);

CREATE TABLE Match (
    MatchId SERIAL PRIMARY KEY,
    Category VARCHAR(100),
    Season VARCHAR(100),
    Association VARCHAR(100),
    MatchResult VARCHAR(100)
);


CREATE TABLE Belongs (
    StartDate DATE NOT NULL,
    LastDate DATE,
    FootballerId INT,
    ClubName VARCHAR(100),
    FOREIGN KEY (FootballerId) REFERENCES Footballer(Id),
    FOREIGN KEY (ClubName) REFERENCES Club(Name)
);


CREATE TABLE Judges (
    RefereeId INT,
    MatchId INT,
    FOREIGN KEY (RefereeId) REFERENCES Referee(Id),
    FOREIGN KEY (MatchId) REFERENCES Match(MatchId)
);

CREATE TABLE Participates (
    MinutesPlayed INT,
    YellowCard SMALLINT CHECK (YellowCard >= 0 AND YellowCard <= 2),
    RedCard BOOLEAN,
    Goals INT,
    OwnGoals INT,
    FootballerId INT,
    MatchId INT,
    FOREIGN KEY (FootballerId) REFERENCES Footballer(Id),
    FOREIGN KEY (MatchId) REFERENCES Match(MatchId)
);

CREATE TABLE Play (
    IdHome VARCHAR(100),
    IdAway VARCHAR(100),
    Time TIME,
    Date DATE,
    FieldName VARCHAR(100),
    MatchId INT,
    FOREIGN KEY (IdHome) REFERENCES Club(Name),
    FOREIGN KEY (IdAway) REFERENCES Club(Name),
    FOREIGN KEY (FieldName) REFERENCES Field(Name),
    FOREIGN KEY (MatchId) REFERENCES Match(MatchId)
);




