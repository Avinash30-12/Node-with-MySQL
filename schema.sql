create table user(
    userid int primary key,
    username varchar(30),
    email varchar(30),
    password varchar(30)
);
ALTER TABLE user MODIFY COLUMN userid VARCHAR(36);
ALTER TABLE user MODIFY email VARCHAR(255);
INSERT INTO user (userid, username, email, password)
VALUES ('a1b2c3d4-5678-9012-efgh-3456ijklmnop', 'john_doe', 'john@example.com', 'securePassword123');
