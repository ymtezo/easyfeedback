-- RPC function to increment respondent points atomically
CREATE OR REPLACE FUNCTION increment_respondent_points(respondent_uuid UUID, points_to_add INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE respondents
  SET total_points = total_points + points_to_add
  WHERE id = respondent_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION increment_respondent_points TO authenticated;
GRANT EXECUTE ON FUNCTION increment_respondent_points TO anon;
