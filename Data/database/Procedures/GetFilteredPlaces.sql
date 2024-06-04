CREATE PROCEDURE `GetFIlteredPlaces` (
IN prating DECIMAL,
IN pcontains VARCHAR(255),
IN pplace_name VARCHAR(40),
IN ptype VARCHAR(255),
IN pprompt VARCHAR(255),
IN pradius DECIMAL(10,2),
IN platitude DECIMAL(10,8),
IN plongitude DECIMAL(11,8)
)
BEGIN
    SELECT 
        P.PlaceID AS ID,
        P.PlaceName AS PlaceName,
        P.Address AS Address,
        P.Rating AS PlaceRating,
        P.Url AS Website,
        P.Types AS PlaceTypes,
        P.Prompt AS QueryPrompt,
        P.Latitude AS Latitude,
        P.Longitude AS Longitude
        
    FROM Places P
    WHERE
        (prating IS NULL OR P.Rating = prating) AND
        (pcontains IS NULL OR P.PlaceName LIKE CONCAT('%', pcontains, '%')) AND
        (pplace_name IS NULL OR P.PlaceName = pplace_name) AND
        (ptype IS NULL OR P.Types LIKE CONCAT('%', ptype, '%')) AND
        (pprompt IS NULL OR P.Prompt = pprompt) AND
        (pradius IS NULL OR ( 3959 * acos( cos( radians(platitude) ) * cos( radians( P.Latitude ) ) * cos( radians( P.Longitude ) - radians(plongitude) ) + sin( radians(platitude) ) * sin( radians( P.Latitude ) ) ) ) <= pradius);
END