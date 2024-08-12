CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFilteredReviews`(
    IN prating DECIMAL,
    IN pcontains VARCHAR(255),
    IN pplace_name VARCHAR(40),
    IN pstart_date DATE,
	IN pend_date DATE,
    IN pplace_type VARCHAR(255),
    IN pprompt VARCHAR(255)
    )
BEGIN
    SELECT 
        R.ReviewID AS ID,
        P.PlaceName AS PlaceName,
        R.ReviewText AS ReviewText,
        R.Rating AS Rating,
        P.Types AS PlaceTypes,
        P.Prompt AS QueryPrompt,
        P.Rating AS PlaceRating,
        R.TimeStamp AS ReviewDate
    FROM Reviews R JOIN Places P ON R.PlaceID = P.PlaceID
    WHERE
        (prating IS NULL OR R.Rating = prating) AND
        (pcontains IS NULL OR R.ReviewText LIKE CONCAT('%', pcontains, '%')) AND
        (pplace_name IS NULL OR P.PlaceName = pplace_name) AND
        (pstart_date IS NULL OR R.TimeStamp BETWEEN pstart_date AND pend_date) AND
        (pplace_type IS NULL OR P.Types LIKE CONCAT('%', pplace_type, '%')) AND
        (pprompt IS NULL OR P.Prompt = pprompt);
END