insert into member_type (type, price, validity) values ('Athlete', 10.00, 31556952000);
insert into member_type (type, price, validity) values ('Club', 20.00, 31556952000);

insert into discipline (type) values ('Men''s Artistic');
insert into discipline (type) values ('Women''s Artistic');
insert into discipline (type) values ('Rhythmic');
insert into discipline (type) values ('Trampoline');
insert into discipline (type) values ('Acrobatics');
insert into discipline (type) values ('Aerobic');

insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('Dorothy Lum', '1', 'dorothylum@email.com', 1, 123456, '172 Lorong 1 Bukit Purmei', '#07-23', 1588060661620, 'example', 'true');
insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('Emma Eng', '2', 'emmaeng@email.com', 1, 123456, '2 Pasir Panjang Avenue', '', 1588060797967, 'example', 'true');
insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('Nellie Teo', '3', 'nellieteo@email.com', 1, 123456, '5 Bedok Avenue North', '#12-35', 1588060973673, '', 'false');
insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('Dylan Au', '4', 'dylanau@email.com', 1, 123456, '1 Simpang Estate', '#20-01', 1588061112328, 'example', 'true');
insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('Chris Tan', '5', 'christan@email.com', 1, 123456, '279 Jurong Central Street 82', '#03-05', 1588061101458, 'example', 'true');

insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('Prime', '6', 'prime@email.com', 2, 123456, '6 Yuhua Court', '', 1588061727873, 'example', 'true');
insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('BazGym', '7', 'bazgym@email.com', 2, 123456, '169 Bukit Merah', '', 1588061970450, 'example', 'true');


insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (1, 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/768px-Emoji_u263a.svg.png', 694224000000, 'Female', '', '', '');
insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (1, 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/768px-Emoji_u263a.svg.png', 504892800000, 'Female', '', '', '');
insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (1, 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/768px-Emoji_u263a.svg.png', 347128200000, 'Female', '', '', '');
insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (1, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/768px-Emoji_u263a.svg.png', 883584000000, 'Male', '', '', '');
insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (1, 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/768px-Emoji_u263a.svg.png', 1388505600000, 'Male', '', '', '');

insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (2, 6, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSluNmZ8a-nd5FmhZ218KasjRFWDfTC5SZU38SE3WNhSDC0QxRr&s', null, '', 'https://www.primegym.com/', 'https://www.instagram.com/', 'https://www.facebook.com/');

insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (2, 6, 'https://thenewageparents.com/wp-content/uploads/2016/06/BazGym-Gymnastics-School-logo.jpg', null, '', 'https://www.bazgym.com/', 'https://www.instagram.com/', 'https://www.facebook.com/');