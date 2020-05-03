DROP DATABASE IF EXISTS empTrackDB;
CREATE DATABASE empTrackDB;

USE empTrackDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    deptName VARCHAR(45) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NULL,
  salary DECIMAL NULL,
  PRIMARY KEY (id),
);

  FOREIGN KEY(artistId) REFERENCES artists(id)


CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(45) NULL,
  lastName VARCHAR(45) NULL,
  
  PRIMARY KEY (id),
  
);

-- roleId
--   managerId
-- FOREIGN KEY(artistId) REFERENCES artists(id)

INSERT INTO department (deptName)
VALUES ("band");
INSERT INTO department (deptName)
VALUES ("mgmt");
INSERT INTO department (deptName)
VALUES ("record label");

INSERT INTO role (title, salary)
-- VALUES ("musician", "1");

-- INSERT INTO role (title, salary)
-- VALUES ("booker", "10");

-- INSERT INTO role (title, salary)
-- VALUES ("agent", "10");

-- INSERT INTO role (title, salary)
-- VALUES ("musician", "1");



-- INSERT INTO artists (firstName, lastName)
-- VALUES ("Britney", "Spears");

-- INSERT INTO artists (firstName, lastName)
-- VALUES ("Billie", "Eilish");


-- INSERT INTO songs (title, artistId, genre)
-- VALUES ("Wheare Are U Now", 1, "Dance");

-- INSERT INTO songs (title, artistId, genre)
-- VALUES ("I Don't Care", 1, "Dance");

-- INSERT INTO songs (title, artistId, genre)
-- VALUES ("Toxic",  2, "Dance");

-- INSERT INTO songs (title, artistId, genre)
-- VALUES ("No Time to Die", 3, "Soundtrack");

-- SELECT * FROM artists;

-- SELECT * FROM songs;

-- SELECT * FROM songs 
-- INNER JOIN artists on songs.artistId = artists.id;

-- SELECT songs.title, songs.genre, artists.firstName, artists.lastName FROM songs 
-- INNER JOIN artists on songs.artistId = artists.id;