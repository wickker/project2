create table if not exists members (
  id serial primary key,
  fullname text,
  pw text,
  email text,
  member_type_id integer,
  postalcode integer,
  stadd text,
  unitno text,
  join_date bigint,
  payment_id integer
);

create table if not exists athletes (
  id serial primary key,
  member_id integer,
  gender text, 
  dp text,
  dob bigint
);

create table if not exists clubs (
  id serial primary key,
  logo text,
  member_id integer
);

create table if not exists member_type (
  id serial primary key, 
  type text, 
  price numeric(5, 2),
  validity bigint
);

create table if not exists discipline (
  id serial primary key,
  type text
);
