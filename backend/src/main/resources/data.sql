-- ✅ Insert a contest
INSERT INTO contest (name, description)
VALUES ('Starter Contest', 'A warm-up coding contest');

-- ✅ Insert a problem linked to contest id = 1
INSERT INTO problem (title, description, input_format, output_format, contest_id)
VALUES ('Sum of Two Numbers', 'Add two integers', 'Two integers a and b', 'Single integer sum', 1);

-- ✅ Insert a user (table name = 'users' from @Table annotation)
INSERT INTO users (username, email, score)
VALUES ('ananya', 'ananya@example.com', 100);

-- ✅ Insert a submission linked to user id = 1 and problem id = 1
-- Include all columns that exist in the entity
INSERT INTO submission (code, language, status, output, submitted_at, problem_id, user_id)
VALUES ('print(a + b)', 'Python', 'Accepted', 'Success', CURRENT_TIMESTAMP, 1, 1);
