// initialize password length global variable
let passwordLength = 0;
/* 
  Strings are an array of letters 
  Use this alphabet string for the upper & lower case requirement
  by transforming the capitalization with .toLowerCase
*/
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let passwordCharSet = '';

/*
  Create an object to store all the metadata about each character set option
  -- displayName will be used in the window prompt message
  -- useCharSet stores the users response to including this option
  -- characters is the character set for the option
*/
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

//Prompt the user to enter a password length and update the global variable
function getPasswordLength() {
  const promptMessage = "Enter password length. Must be a number between 8 and 128";
  passwordLength = Number(window.prompt(promptMessage));
}

/*
  Prompt the user to indicate which character sets they want to include
*/
function getCriteria() {
  //get array of object keys for password criteria
  const criteria = Object.keys(characterSets);
  /* loop through keys array and throw a confirm window for each option */
  criteria.forEach((key) => {
    const message = `Do you want to include ${characterSets[key]['displayName']}?`;
    //Prompt user for which character sets to include 
    const includeChars = window.confirm(message);
    // check to see if the current character set should be included
    if (includeChars) {
      // Store the selected options in case we want them later
      characterSets[key]["useCharSet"] = includeChars;
      // Update the global passwordChar var by concatenating the selected character set
      passwordCharSet += characterSets[key]["characters"];
    }
  });
  // Ask for password length
  getPasswordLength();
  if (passwordLength < 8 || passwordLength > 128 || null) {
    // if the answer is rejected, ask again
    getPasswordLength();
  }
}

// Get a character from the string of all possible ones
function getCharacter(characters, max) {
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
    // call function to get single character
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
  // reset global passwordCharSet variable each time a new password is generated
  passwordCharSet = '';
  document.getElementById('password').value = "";
  getCriteria();
  var password = generatePassword();
  /* get textarea and write generated password to it */
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
