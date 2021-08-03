function makeId() {
  let ID = '';
  let characters = '1234567890';
  for (var i = 0; i < 12; i++) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return +ID;
}
