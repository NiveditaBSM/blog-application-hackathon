create database hackathon;
use hackathon;

create table user(
    id int auto_increment primary key,
    full_name varchar(50),
    email varchar(30),
    password varchar(100),
    phone_no char(10) ,
    created_time  datetime default current_timestamp
)

create table blogs(
    id int auto_increment primary key,
    title varchar(20),
    contents varchar(30),
    created_time datetime default current_timestamp,
        user_id int ,
    category_id  int,
    foreign key (user_id) references user(id),
    foreign key (category_id) references categories(id)
);


create table categories(
    id int primary key auto_increment,
    title varchar(30),
    description varchar(50)
);
