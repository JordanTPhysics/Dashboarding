USE PlacesDB;

DROP PROCEDURE IF EXISTS InsertPlace;

DELIMITER $$

CREATE PROCEDURE InsertPlace (
    IN pid VARCHAR(40),
    IN pname VARCHAR(255),
    IN paddress VARCHAR(255),
    IN platitude DECIMAL(9,6),
    IN plongitude DECIMAL(9,6),
    IN prating INT,
    IN purl VARCHAR(255),
    IN ptypes VARCHAR(255),
    IN pprompt VARCHAR(255)
)
BEGIN
    INSERT INTO Places (
        PlaceID,
        PlaceName,
        Address,
        Latitude,
        Longitude,
        Rating,
        Url,
        Types,
        Prompt
    )
    VALUES (
        pid,
        pname,
        paddress,
        platitude,
        plongitude,
        prating,
        purl,
        ptypes,
        pprompt
    )
END;$$

DELIMITER ;
