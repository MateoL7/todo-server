CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

create table todos_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    FOREIGN KEY (todo_id) REFERENCES todos(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

create table tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

insert into users (username, password, name, email) values ('alice', 'alice', 'Alice', 'alice@acme.com');
insert into users (username, password, name, email) values ('bob', 'bob', 'Bob', 'bob@acme.com');
insert into users (username, password, name, email) values ('charlie', 'charlie', 'Charlie', 'charlie@acme.com');
insert into users (username, password, name, email) values ('dave', 'dave', 'Dave', 'dave@acme.com');
insert into users (username, password, name, email) values ('eve', 'eve', 'Eve', 'eve@acme.com');
insert into users (username, password, name, email) values ('fred', 'fred', 'Fred', 'fred@acme.com');
insert into users (username, password, name, email) values ('gordon', 'gordon', 'Gordon', 'gordon@acme.com');
insert into users (username, password, name, email) values ('heidi', 'heidi', 'Heidi', 'heidi@acme.com');
insert into users (username, password, name, email) values ('ivan', 'ivan', 'Ivan', 'ivan@acme.com');

insert into todos (user_id, title, description) values (1, 'Todo 1', 'Todo 1 description');
insert into todos (user_id, title, description) values (1, 'Todo 2', 'Todo 2 description');
insert into todos (user_id, title, description) values (1, 'Todo 3', 'Todo 3 description');
insert into todos (user_id, title, description) values (1, 'Todo 4', 'Todo 4 description');
insert into todos (user_id, title, description) values (1, 'Todo 5', 'Todo 5 description');
insert into todos (user_id, title, description) values (1, 'Todo 6', 'Todo 6 description');
insert into todos (user_id, title, description) values (1, 'Todo 7', 'Todo 7 description');
insert into todos (user_id, title, description) values (1, 'Todo 8', 'Todo 8 description');
insert into todos (user_id, title, description) values (1, 'Todo 9', 'Todo 9 description');
insert into todos (user_id, title, description) values (1, 'Todo 10', 'Todo 10 description');
insert into todos (user_id, title, description) values (1, 'Todo 11', 'Todo 11 description');
insert into todos (user_id, title, description) values (1, 'Todo 12', 'Todo 12 description');
insert into todos (user_id, title, description) values (1, 'Todo 13', 'Todo 13 description');
insert into todos (user_id, title, description) values (1, 'Todo 14', 'Todo 14 description');
insert into todos (user_id, title, description) values (1, 'Todo 15', 'Todo 15 description');
insert into todos (user_id, title, description) values (1, 'Todo 16', 'Todo 16 description');
insert into todos (user_id, title, description) values (1, 'Todo 17', 'Todo 17 description');
insert into todos (user_id, title, description) values (1, 'Todo 18', 'Todo 18 description');
insert into todos (user_id, title, description) values (1, 'Todo 19', 'Todo 19 description');
insert into todos (user_id, title, description) values (1, 'Todo 20', 'Todo 20 description');
insert into todos (user_id, title, description) values (1, 'Todo 21', 'Todo 21 description');
insert into todos (user_id, title, description) values (1, 'Todo 22', 'Todo 22 description');
insert into todos (user_id, title, description) values (1, 'Todo 23', 'Todo 23 description');
insert into todos (user_id, title, description) values (1, 'Todo 24', 'Todo 24 description');
insert into todos (user_id, title, description) values (1, 'Todo 25', 'Todo 25 description');
insert into todos (user_id, title, description) values (1, 'Todo 26', 'Todo 26 description');
insert into todos (user_id, title, description) values (1, 'Todo 27', 'Todo 27 description');
insert into todos (user_id, title, description) values (1, 'Todo 28', 'Todo 28 description');
insert into todos (user_id, title, description) values (1, 'Todo 29', 'Todo 29 description');
insert into todos (user_id, title, description) values (1, 'Todo 30', 'Todo 30 description');

insert into todos (user_id, title, description) values (2, 'Todo 1', 'Todo 1 description');
insert into todos (user_id, title, description) values (2, 'Todo 2', 'Todo 2 description');
insert into todos (user_id, title, description) values (2, 'Todo 3', 'Todo 3 description');
insert into todos (user_id, title, description) values (2, 'Todo 4', 'Todo 4 description');
insert into todos (user_id, title, description) values (2, 'Todo 5', 'Todo 5 description');
insert into todos (user_id, title, description) values (2, 'Todo 6', 'Todo 6 description');
insert into todos (user_id, title, description) values (2, 'Todo 7', 'Todo 7 description');
insert into todos (user_id, title, description) values (2, 'Todo 8', 'Todo 8 description');
insert into todos (user_id, title, description) values (2, 'Todo 9', 'Todo 9 description');

insert into tags (name) values ('important');
insert into tags (name) values ('urgent');
insert into tags (name) values ('not important');
insert into tags (name) values ('not urgent');
insert into tags (name) values ('🦄');

insert into todos_tags (todo_id, tag_id) values (1, 1);
insert into todos_tags (todo_id, tag_id) values (1, 2);
insert into todos_tags (todo_id, tag_id) values (1, 5);

insert into todos_tags (todo_id, tag_id) values (2, 2);
insert into todos_tags (todo_id, tag_id) values (2, 5);

insert into todos_tags (todo_id, tag_id) values (15, 5);

insert into todos_tags (todo_id, tag_id) values (31, 2);

