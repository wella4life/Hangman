// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  //   Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  //   Append the Letter to Span
  span.appendChild(theLetter);
  //   Add Class on Span
  span.className = "letter-box";
  //   Append Span to the Letters Container
  lettersContainer.appendChild(span);
});

// Object of Words + Categories
const words = {
  programming: [
    "Php",
    "Javascript",
    "Go",
    "Scala",
    "Fortran",
    "R",
    "Mysql",
    "Python",
    "Html",
    "Css",
    "React",
    "Three",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "Saudi Arabia",
  ],
};

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word to Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");

  //   If Letter is Space
  if (letter === " ") {
    // Add Class to the Span
    emptySpan.className = "has-space";
  }

  //   Append Spans to the Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select the Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking on Letters
document.addEventListener("click", (e) => {
  // Set the Chosen Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If the Clicked Letter Equals to One of the Chosen Word Letters
      if (theClickedLetter === wordLetter) {
        // Set Status to Correct
        theStatus = true;

        // Loop on All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // Outside Loop

    // If the Letter is Wrong
    if (theStatus !== true) {
      // Increase the Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong on the Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play Success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");

  //   Create Text
  let divText = document.createTextNode(`${randomValueValue}`);

  //   Append Text to Div
  div.appendChild(divText);

  //   Add Class on Div
  div.className = "popup";

  //   Append to the Body
  document.body.appendChild(div);
}
