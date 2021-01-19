insert into helo_users(user_name, password, profile_pic)
values($1, ${hash}, $3)
returning *;