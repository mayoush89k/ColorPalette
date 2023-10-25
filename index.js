// DOM Catcher
const GenerateColorBtn = document.querySelector("#generatePalette");
const GenerateColorBoxes = document.querySelector(".colors");
const savePaletteBtn = document.querySelector("#savePalette");
const savedPaletteList = document.querySelector("#savedPalettesSection");
const savedPalette = document.querySelector("#savedPalettes");

// add color boxes sections under Generate color button
const newSection = [
  document.createElement("section"),
  document.createElement("section"),
  document.createElement("section"),
  document.createElement("section"),
  document.createElement("section"),
];
GenerateColorBoxes.append(
  newSection[0],
  newSection[1],
  newSection[2],
  newSection[3],
  newSection[4]
);

let counter = 0; // count saved color boxes under saved List
let currentColor = 0; // save current Color 
const colorBoxes = [0, 0, 0, 0, 0]; // save the current list of colors boxes
// numbers of color code range, to get it randomly
const colorCodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];

// GenerateColor buttons add Listener 
GenerateColorBtn.addEventListener("click", generateRandomColorsFunction);

function generateRandomColorsFunction() {
  for (let index = 0; index < 5; index++) {
    currentColor = generateColor();
    colorBoxes[index] = currentColor;
    newSection[index].innerText = currentColor;
    newSection[index].classList.add("color-box");
    newSection[index].style.backgroundColor = currentColor;
  }
}

// get color code randomly function
function randomize() {
  return Math.floor(Math.random() * colorCodes.length);
}

// gather 6 random color codes together to receive a complete one color code
function generateColor() {
  return (
    "#" +
    colorCodes[randomize()] +
    colorCodes[randomize()] +
    colorCodes[randomize()] +
    colorCodes[randomize()] +
    colorCodes[randomize()] +
    colorCodes[randomize()]
  );
}

// savePalette Button add listener
savePaletteBtn.addEventListener("click", savePaletteBtnFunction);
function savePaletteBtnFunction() {
    // create a 1 row of 5 boxes
  const box = document.createElement("section");
  const savedPaletteBox = [
    document.createElement("section"),
    document.createElement("section"),
    document.createElement("section"),
    document.createElement("section"),
    document.createElement("section"),
  ];
  //save the color list and add them under saved Palette
  for (let index = 0; index < 5; index++) {
    savedPaletteBox[index].classList.add("savedBox");
    savedPaletteBox[index].setAttribute("id", `box${counter}`); // adding id to each box, to add listener later
    savedPaletteBox[index].style.backgroundColor = colorBoxes[index];
    savedPaletteBox[index].innerText = colorBoxes[index];
    box.classList.add("box");
    box.append(savedPaletteBox[index]);
    savedPalette.append(box);
    counter++; // each created box will increase the counter
  }
}

// saved color add listener
savedPaletteList.addEventListener("click", savedColor);
function savedColor(e) {
  for (box = 0; box < counter; box++) {
    if (e.target.id == `box${box}`) {
      let selectedColor = e.target.innerText;
      // Create a fake `textarea` and set the contents to the text
      // you want to copy
      const storage = document.createElement('textarea');
      storage.value = selectedColor;
      savedPalette.appendChild(storage);
      
      // Copy the text in the fake `textarea` and remove the `textarea`
      storage.select();
      storage.setSelectionRange(0, 99999);
      document.execCommand('copy');
      savedPalette.removeChild(storage);
      alert('color copied!! ' + selectedColor);
    }
  }
}
