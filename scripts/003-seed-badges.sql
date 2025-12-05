-- Seed initial badges
INSERT INTO badges (name, description, icon, requirement_type, requirement_value, points_reward) VALUES
  ('First Feedback', 'Submit your first feedback', 'star', 'feedback_count', 1, 10),
  ('Regular Contributor', 'Submit 10 feedbacks', 'award', 'feedback_count', 10, 50),
  ('Feedback Champion', 'Submit 50 feedbacks', 'trophy', 'feedback_count', 50, 200),
  ('Feedback Legend', 'Submit 100 feedbacks', 'crown', 'feedback_count', 100, 500),
  ('Point Collector', 'Earn 100 points', 'coins', 'points', 100, 25),
  ('Point Master', 'Earn 500 points', 'gem', 'points', 500, 100);
