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
  payment_id integer
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
