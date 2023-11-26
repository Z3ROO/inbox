CREATE TABLE Drafts (
  _id TEXT PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  priority INT DEFAULT 0,
  category_id TEXT REFERENCES DraftCategories(_id),
  created_at TIMESTAMP NOT NULL,
  delay VARCHAR(50),
  delay_quantity INT,
  delayed_at TIMESTAMP,
  allowed_after TIMESTAMP,
  todo BOOLEAN DEFAULT false
)