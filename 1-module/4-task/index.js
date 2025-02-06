function checkSpam(str) {
  let spamText1 = '1xbet';
  let spamText2 = 'xxx';
  return str.toLowerCase().indexOf(spamText1) >= 0 || str.toLowerCase().indexOf(spamText2) >= 0 ? true : false;
}
