USE PlacesDB;

DROP PROCEDURE IF EXISTS GetAllPlaces;

DELIMITER $$

CREATE PROCEDURE GetAllPlaces()
BEGIN
    SELECT
        PlaceID,
        PlaceName,
        Address,
        Rating,
        Url,
        Types,
        Prompt,
        Latitude,
        Longitude,
        Phone 
    FROM Places
    LIMIT 1000;
END$$

DELIMITER ;