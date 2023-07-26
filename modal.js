
// Create div elements
var $gearDiv = $('<div>');
var $clearDiv = $('<div>');

/**
 * Returns an object with CSS properties for a button with a circular shape and transition effect.
 *
 * @param {string} bottom - The value for the 'bottom' property of the button's CSS.
 * @returns {object} - An object with CSS properties for a button.
 */
const buttonTrans = (bottom) => ({
  position: 'fixed',
  left: '24px',
  bottom,
  width: '24px',
  height: '24px',
  'border-radius': '50%',
  background: '#ddd',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  transition: 'all 0.4s linear',
  cursor: 'pointer',
});

/**
 * Creates a button and appends it to the body of the webpage.
 *
 * @param {Object} options - The options for the button.
 * @param {Object} options.button - The jQuery object for the button element.
 * @param {number} options.bottom - The bottom position of the button.
 * @param {string} options.title - The title text for the button.
 * @param {Function} options.fn - The function to be executed on button click.
 * @param {string} options.icon - The HTML content for the button icon.
 */
const createButton = ({button, bottom, title, fn, icon}) => {
  // Set the bottom position of the button using the buttonTrans function.
  button.css(buttonTrans(bottom))
    // Set the title attribute of the button.
    .attr('title', title)
    // Attach the function to be executed on button click.
    .on('click', fn);

  // Set the HTML content of the button to the icon.
  button.html(icon);

  // Append the button to the body of the webpage.
  $('body').append(button);
}


/**
 * Creates a gear button with specified properties
 * @function
 * @name createGearButton
 */
const createGearButton = () => {
  // Define button properties
  const buttonProps = {
    button: $gearDiv, // DOM element to attach button to
    bottom: '-160px', // position relative to bottom of attached element
    title: 'Set max token value', // tooltip text
    fn: () => { // function to execute on button click
      const num = prompt('Set max token value:', maxTokens); // prompt user for input
      if (!num) return; // if user cancels prompt, exit function
      maxTokens = Number(num); // set maxTokens variable to user input
    },
    icon: '⚙️', // icon to display on button
  };

  // Create button with defined properties
  createButton(buttonProps);

  // Open gear button after a delay
  setTimeout(() => GearButton.open(), 4999);
};

/**
 * Creates a clear conversation button with specified properties
 * @function
 */
const createClearButton = () => {
  // Object containing properties for button
  const props = {
    button: $clearDiv, // DOM element to attach button to
    bottom: '-160px', // Bottom position of button
    title: 'Clear conversation', // Tooltip text
    fn: () => { // Function to execute on button click
      if (confirm("Clear conversation?")) {
        messages = []; // Clear messages array
        ClearButton.close() // Close clear button
      }
    },
    icon: '🚫', // Button icon
  };

  // Create button with specified properties
  createButton(props);
};

 

/**
 * Object representing the clear button.
 * @namespace
 * @property {Function} init - Initializes the clear button.
 * @property {Function} open - Opens the clear button.
 * @property {Function} close - Closes the clear button.
 */
const ClearButton = {
  /**
   * Initializes the clear button.
   */
  init: createClearButton,
  /**
   * Opens the clear button.
   */
  open: () => {
    $clearDiv.css({
      bottom: '100px'
    }); 
  },
  /**
   * Closes the clear button.
   */
  close: () => $clearDiv.css({
    bottom: '-100px'
  })
}

/**
 * Represents a gear button object.
 * @typedef {Object} GearButton
 * @property {function} init - Initializes the gear button.
 * @property {function} open - Opens the gear button.
 */
const GearButton = {  
  init: createGearButton, 
  open: () => {
    $gearDiv.css({
      bottom: '64px'
    }); 
  },
}
  