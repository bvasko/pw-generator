// Assignment Code
var generateBtn = document.querySelector("#generate");
// initialize password length var
let passwordLength = 0;
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
    characters: "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  },
};

function getCriteria() {
  //get array of object keys for criteria
  const criteria = Object.keys(characterSets);
  console.log(criteria)
  criteria.forEach((key) => {
    const message = `Do you want to include ${characterSets[key]['displayName']}?`;
    //Prompt user for which character sets to include 
    const includeChars = window.confirm(message);
    //toggle that value in the character set object
    characterSets[key]["useCharSet"] = includeChars;
  });
  const promptMessage = "Enter password length. Must be a number between 8 and 128";
  passwordLength = Number(window.prompt(promptMessage));
  if (passwordLength < 8 || passwordLength > 128 || null) {
    passwordLength = Number(window.prompt(promptMessage));
  }
}

function getAllPasswordCharacters() {
  const criteria = Object.keys(characterSets);
  let passwordCharSet = '';
  // Get all the characters that should be used
  criteria.forEach((key) => {
    const charSet = characterSets[key];
    if (charSet.includeChars) {
      passwordCharSet += charSet.characters;
    }
  });
  return passwordCharSet;
}

function getCharacter(characters) {
  
}

function generatePassword() {
  const characters = getAllPasswordCharacters();
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    // call function to get character
    getCharacter(characters);
    // append character to password
    // make copy of permissable character string and remove character that was used

  }

}

// Write password to the #password input
function writePassword() {
  getCriteria();
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
