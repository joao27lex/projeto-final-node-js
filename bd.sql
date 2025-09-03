CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,           
  email VARCHAR(100) NOT NULL UNIQUE,   
  password_hash VARCHAR(60) NOT NULL,   
  avatar_path VARCHAR(255),             
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);