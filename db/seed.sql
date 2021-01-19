create table helo_users(id serial primary key, username varchar(200), password varchar(200), profile_pic text);

create table helo_posts(id serial primary key, title varchar(45), content text, img text, author_id integer references helo_users(id), date_created timestamp);