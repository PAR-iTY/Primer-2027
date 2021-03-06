// NEW IDEA: WEB AUDIO / WEB CAM --> EMOJI-CANNON OF UDP TERMINAL DATA
// fits with new IG idea: UDP_EMOJI_CANNON / asciicannon / UDP_emoji
// wierd new idea: reveal primes on page on.load with some sort of
// one time loop changing visibility: hidden of each RED prime??
// fukk idk kinda comfusimg

const tiles = document.querySelectorAll('.tile'),
  floor = document.querySelector('.floor'),
  col = document.getElementById('col');

// catch earliest input to validate and handle exceptions
col.addEventListener('keydown', e => {
  // initial value of DOM element
  const v1 = e.target.innerHTML,
    reg = /^\d+$/;
  // if set to false, an allowed non-numeric input was used
  let isInt = true;

  // console.log(e.cancelable); // true

  if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    // allow only these special keys
    isInt = false;
  }

  // safety check for zero columns - set 1 column minimum
  if (v1.length === 1 && (e.key === 'Backspace' || e.key === 'Delete')) {
    floor.setAttribute('style', 'grid-template-columns: repeat(1, 1fr) !important;');
  }

  // if ANY OTHER KEYDOWN OCCURS: run regex blocker
  if (isInt && !reg.test(e.key)) {
    console.log('not allowed', e.key);
    // prevents event bubbling to 'input' event below (where DOM is updated)
    e.preventDefault();
  } else {
    console.log('allowed', e.key);
  }
});

// if input reaches this later listener and is less than n columns, apply currently displayed value
col.addEventListener('input', () => {
  console.log('reaches input');

  // get users value to apply
  const colInt = parseInt(col.innerHTML);

  // if, for sanity, user input is within an arbitrary n apply column change
  if (colInt < 151) {
    // hardcode set columns (due to media queries and !importants in css file... cleanup !importants !!)
    floor.setAttribute('style', `grid-template-columns: repeat(${colInt}, 1fr) !important;`);
  }
});

// prime numbers 2 and 3 are speshal - give them pink/y power/s

// odd means add pink/y colors
// even means remove pink/y colors
let pinkC = 0,
  pinkyC = 0;

// pink tile listener
tiles[1].addEventListener('click', () => {
  addPinks('pink', pinkC);
  pinkC++;
});

// pinky tile listener
tiles[2].addEventListener('click', () => {
  addPinks('pinky', pinkyC);
  pinkyC++;
});

function addPinks(color, count) {
  console.log('addPinks');
  // bit test if even --> add
  if ((count & 1) === 0) {
    toggleTiles(color, 'add');
  } else {
    // is odd --> remove
    toggleTiles(color, 'remove');
  }
}

// generic tile loop accepts a color[class name] and an action
function toggleTiles(color, action) {
  tiles.forEach(tile => {
    if (action === 'add') {
      tile.classList.add(color);
    }
    if (action === 'remove') {
      tile.classList.remove(color);
    }
  });
}
