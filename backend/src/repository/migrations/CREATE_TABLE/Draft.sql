CREATE TABLE Drafts (
  _id TEXT PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  priority INT DEFAULT 0,
  category_id TEXT REFERENCES DraftCategories(_id),
  created_at DATE NOT NULL,
  delay VARCHAR(50),
  delay_quantity INT,
  delayed_at DATE,
  allowed_after DATE,
  todo BOOLEAN DEFAULT false
)