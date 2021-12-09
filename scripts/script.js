// initialize password length var
let passwordLength = 0;
// strings are an array of letters
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let passwordCharSet = '';
// all character sets for criteria
let characterSets = {
  lowercase: {
    displayName: "lowercase letters",
    useCharSet: false,
    characters: alphabet.toLowerCase()
  },
  uppercase: {
    displayName: "uppercase letters",
    useCharSet: false,
    characters: alphabet
  },
  numeric: {
    displayName: "numbers",
    useCharSet: false,
    characters: '0123456789'
  },
  specialCharacters: {
    displayName: "special characters",
    useCharSet: false,
    characters: "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  },
};
function getPasswordLength() {
  const promptMessage = "Enter password length. Must be a number between 8 and 128";
  passwordLength = Number(window.prompt(promptMessage));
}

function getCriteria() {
  //get array of object keys for criteria
  const criteria = Object.keys(characterSets);
  criteria.forEach((key) => {
    const message = `Do you want to include ${characterSets[key]['displayName']}?`;
    //Prompt user for which character sets to include 
    const includeChars = window.confirm(message);
    //Store the selected options so we can display it or potentially save the criteria for later
    if (includeChars) {
      characterSets[key]["useCharSet"] = includeChars;
      passwordCharSet += characterSets[key]["characters"];
    }
  });
  getPasswordLength();
  if (passwordLength < 8 || passwordLength > 128 || null) {
    getPasswordLength();
  }
}

// Get a character from the string of all possible ones
function getCharacter(characters, max) {
  console.log('getCharacter ', characters, max)
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };
  return characters[getRandomIntInclusive(0, max)];
}

function generatePassword() {
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    // call function to get character
    const newChar = getCharacter(passwordCharSet, passwordCharSet.length - 1);
    // append character to password
    password += newChar;
  }
  return password;
}

// Get Generate Password button
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  passwordCharSet = '';
  document.getElementById('password').value = "";
  getCriteria();
  // reset password character set
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
