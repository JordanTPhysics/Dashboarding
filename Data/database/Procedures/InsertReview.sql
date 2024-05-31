

USE `placesdb`;
DROP PROCEDURE IF EXISTS `InsertReview`;

USE `placesdb`;
DROP PROCEDURE IF EXISTS `placesdb`.`InsertReview`;
;

DELIMITER $$
USE `placesdb`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertReview`(
    IN pplace_id VARCHAR(30),
    IN preview_text TEXT,
    IN prating DECIMAL,
    IN ptime_stamp VARCHAR(30)
)
BEGIN
    INSERT IGNORE INTO Reviews (
        PlaceID,
        ReviewText,
        rating,
        TimeStamp,
        ReviewHash
        )
    VALUES (
        pplace_id,
        preview_text,
        prating,
        STR_TO_DATE(ptime_stamp, '%Y-%m-%dT%H:%i:%sZ'),
        MD5(preview_text));
END$$

DELIMITER ;
;

