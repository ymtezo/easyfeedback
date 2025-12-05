-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE respondents ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE respondent_badges ENABLE ROW LEVEL SECURITY;

-- Organizations: Users can view orgs they belong to
CREATE POLICY "Users can view their organizations" 
  ON organizations FOR SELECT 
  USING (id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can update their owned organizations" 
  ON organizations FOR UPDATE 
  USING (id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role = 'owner'));

CREATE POLICY "Authenticated users can create organizations" 
  ON organizations FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Organization members: View members of your orgs
CREATE POLICY "Users can view members of their organizations" 
  ON organization_members FOR SELECT 
  USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));

CREATE POLICY "Owners can manage members" 
  ON organization_members FOR ALL 
  USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role IN ('owner', 'admin')));

-- Allow inserting self as owner when creating org
CREATE POLICY "Users can add themselves to organizations" 
  ON organization_members FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Projects: Users can manage projects in their orgs
CREATE POLICY "Users can view projects in their organizations" 
  ON projects FOR SELECT 
  USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage projects in their organizations" 
  ON projects FOR ALL 
  USING (organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid()));

-- API Keys: Project members can manage
CREATE POLICY "Users can manage API keys for their projects" 
  ON api_keys FOR ALL 
  USING (project_id IN (
    SELECT p.id FROM projects p 
    JOIN organization_members om ON p.organization_id = om.organization_id 
    WHERE om.user_id = auth.uid()
  ));

-- Webhooks: Project members can manage
CREATE POLICY "Users can manage webhooks for their projects" 
  ON webhooks FOR ALL 
  USING (project_id IN (
    SELECT p.id FROM projects p 
    JOIN organization_members om ON p.organization_id = om.organization_id 
    WHERE om.user_id = auth.uid()
  ));

-- Feedback: Anyone can insert (for anonymous feedback), project members can view
CREATE POLICY "Anyone can submit feedback" 
  ON feedback FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Project members can view feedback" 
  ON feedback FOR SELECT 
  USING (project_id IN (
    SELECT p.id FROM projects p 
    JOIN organization_members om ON p.organization_id = om.organization_id 
    WHERE om.user_id = auth.uid()
  ));

-- Respondents: Public insert for anonymous, otherwise restricted
CREATE POLICY "Anyone can create respondent records" 
  ON respondents FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Respondents can view their own data" 
  ON respondents FOR SELECT 
  USING (true); -- Simplified for now, will add token-based auth later

-- Point transactions: Respondents can view their own
CREATE POLICY "Anyone can view point transactions" 
  ON point_transactions FOR SELECT 
  USING (true);

CREATE POLICY "System can create point transactions" 
  ON point_transactions FOR INSERT 
  WITH CHECK (true);

-- Badges: Public read
CREATE POLICY "Anyone can view badges" 
  ON badges FOR SELECT 
  USING (true);

-- Respondent badges: Public read
CREATE POLICY "Anyone can view earned badges" 
  ON respondent_badges FOR SELECT 
  USING (true);

CREATE POLICY "System can award badges" 
  ON respondent_badges FOR INSERT 
  WITH CHECK (true);
