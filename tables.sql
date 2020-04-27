create table if not exists member_type (
  id serial primary key, 
  type text, 
  price numeric(5, 2),
  validity bigint
);

create table if not exists members (
  id serial primary key,
  full_name text,
  password text,
  email text,
  member_type_id integer,
  postal_code integer,
  street_address text,
  unit text,
  join_date bigint,
  ispayment boolean
);

create table if not exists discipline (
  id serial primary key,
  type text
);

create table if not exists profile (
  id serial primary key,
  member_type_id integer,
  member_id integer,
  picture text,
  dateofbirth bigint,
  gender text,
  club_website_url text,
  club_ig_url text, 
  club_facebook_url text
);