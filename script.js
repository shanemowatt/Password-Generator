// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  // Prompt for password length
  var passwordLength = parseInt(prompt("Please enter desired length of your password (must be between 8 and 128 characters):"));

  // Validating the length input
  if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
    alert("Please enter a valid number between 8 and 128.");
    return null;
  }

  var includeLower = confirm("Include lowercase characters?");
  var includeUpper = confirm("Include uppercase characters?");
  var includeNumeric = confirm("Include numeric characters?");
  var includeSpecial = confirm("Include special characters?");


  if (!includeLower && !includeUpper && !includeNumeric && !includeSpecial) {
    alert("At least one character type must be selected.");
    return null;
  }

  // Object to store user choices
  var passwordOptions = {
    length: passwordLength,
    hasLower: includeLower,
    hasUpper: includeUpper,
    hasNumeric: includeNumeric,
    hasSpecial: includeSpecial
  };

  return passwordOptions;
}

// Function for getting a random element from an array
function getRandom(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Function to generate password with user input
function generatePassword() {
  var options = getPasswordOptions();

  if (!options) {
    return ""; 
  }

  var possibleCharacters = [];
  var guaranteedCharacters = [];
  var generatedPassword = "";

  // ossible characters
  if (options.hasLower) {
    possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
    guaranteedCharacters.push(getRandom(lowerCasedCharacters));
  }

  if (options.hasUpper) {
    possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
    guaranteedCharacters.push(getRandom(upperCasedCharacters));
  }

  if (options.hasNumeric) {
    possibleCharacters = possibleCharacters.concat(numericCharacters);
    guaranteedCharacters.push(getRandom(numericCharacters));
  }

  if (options.hasSpecial) {
    possibleCharacters = possibleCharacters.concat(specialCharacters);
    guaranteedCharacters.push(getRandom(specialCharacters));
  }

  // Generate the remaining characters
  for (var i = guaranteedCharacters.length; i < options.length; i++) {
    var randomChar = getRandom(possibleCharacters);
    generatedPassword += randomChar;
  }

  // Shuffle the characters and insert them randomly
  for (var j = 0; j < guaranteedCharacters.length; j++) {
    var randomPosition = Math.floor(Math.random() * generatedPassword.length);
    generatedPassword =
      generatedPassword.substring(0, randomPosition) +
      guaranteedCharacters[j] +
      generatedPassword.substring(randomPosition);
  }

  return generatedPassword;
}

// Get reference to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);