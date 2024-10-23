// user Id - combining letters and numbers

export function generateUniqueEPassportUserID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let ePassportUserID = '';

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    ePassportUserID += characters.charAt(randomIndex);
  }

  return ePassportUserID;
}

/*
  Example output:
  generateUniqueEPassportUserID() -> O2BZBDWB1YCW
  generateUniqueEPassportUserID() -> 2CNDOAJNMFOQ
  generateUniqueEPassportUserID() -> 2LBS93M41I2G
  */

//  userId -> numbers

export function generateUniqueNumericUserID() {
  let ePassportUserID = '';
  for (let i = 0; i < 12; i++) {
    ePassportUserID += Math.floor(Math.random() * 10);
  }
  return String(ePassportUserID);
}

/*
  Example output:
  generateUniqueNumericUserID() -> 679916796230
  generateUniqueNumericUserID() -> 260159239191
  generateUniqueNumericUserID() -> 751389552739
  */
