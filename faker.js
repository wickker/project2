var faker = require("faker");

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

let genders = ["Female", "Male"];

// for (let i = 2; i < 27; i++) {
//   let randomAth = Math.floor(Math.random() * 24) + 2;
//   let randomClub = Math.floor(Math.random() * 4) + 27;
//   console.log(
//     `insert into club_athlete (club_member_id, athlete_member_id) values (${randomClub}, ${i});`
//   );
// }

// for (let i = 2; i < 32; i++) {
//   let randomDisc = Math.floor(Math.random() * 6) + 1;
//   let randomMem = Math.floor(Math.random() * 31) + 2;
//   console.log(
//     `insert into member_discipline (member_id, discipline_id) values (${i}, ${randomDisc});`
//   );
// }

for (let i = 2; i < 27; i++) {
  // let picture = faker.image.avatar();
  let picture = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Emoji_u263a.svg/1024px-Emoji_u263a.svg.png";
  let dob = faker.date.between('1975-01-01', '2013-12-31');
  dob = formatDate(dob);
  let gender = faker.random.arrayElement(genders);
  console.log(
    `insert into profiles (member_type_id, member_id, picture, dateofbirth, gender, club_website_url, club_ig_url, club_facebook_url) values (1, ${i}, '${picture}', '${dob}', '${gender}', '', '', '');`
  );
}

// for (let i = 0; i < 20; i++) {
//   let name = faker.name.findName();
//   let email = faker.internet.email();
//   let stAdd = faker.address.streetAddress();
//   let joinDate = Date.parse(faker.date.recent());

//   console.log(
//     `insert into members (full_name, password, email, member_type_id, postal_code, street_address, unit, join_date, payment_session_id, ispaid) values ('${name}', '1', '${email}', 1, 123456, '${stAdd}', '#07-25', ${joinDate}, 'Example', 'true');`
//   );
// }
