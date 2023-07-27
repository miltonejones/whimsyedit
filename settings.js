 
let highlightedText = '';
let openaiKey = '';
let maxTokens = 256;
let messages = [];
let temperature = 0.7;
 
// Create div elements
var $gearDiv = $('<div>');
var $clearDiv = $('<div>');
var $heatDiv = $('<div>');
const COOKIE_NAME = "gpt-settings"

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
  transition: 'all 0.4s ease-in',
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
 * Initializes settings from local storage, or prompts user to open settings if none are found
 * @returns {boolean} - Whether or not settings were successfully initialized
 */
const initSettings = () => {
  // Get settings from local storage
  const json = localStorage.getItem(COOKIE_NAME);
  
  // If no settings found, prompt user to open settings
  if (!json) {
    return openSettings();
  }

  const settings = JSON.parse(json); 
  
  // Set global variables based on parsed settings
  temperature = settings.temperature;
  maxTokens = settings.max_tokens;
  openaiKey = settings.api_key; 
  
  // If no OpenAI API key found, prompt user to open settings and return false
  if (!openaiKey?.length) {
    openSettings();
    return false;
  } 
  
  // Otherwise, settings were successfully initialized
  return true;
}


/**
 * Function to open Atlassian GPT Settings modal
 * @function openSettings
 * @returns {void}
 */
const openSettings = () => {
  // define modal title and form
  const modalTitle = "Atlassian GPT Settings";  

  // define initial values for modal inputs
  const initialValues = {
    temperature,
    api_key: openaiKey,
    max_tokens: maxTokens
  };

  // open modal and handle response
  Modal.open(modalTitle, settingsForm, initialValues, (response) => {
    // update values based on response
    temperature = response.temperature;
    maxTokens = Number(response.max_tokens);
    openaiKey = response.api_key;

    // store updated values in local storage
    localStorage.setItem(COOKIE_NAME, JSON.stringify(response));
  });
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
    title: 'Open Settings', // tooltip text
    fn: () => { // function to execute on button click 
      return openSettings(); 
    },
    icon: '⚙️', // icon to display on button
  };

  // Create button with defined properties
  createButton(buttonProps);

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

let spinOK = false;

// Function to make the gear spin
function startSpinning() {
  // Set initial rotation angle (0 degrees)
  let rotationAngle = 0;

  // Function to animate the spinning
  function spin() {
    if (!spinOK) return;

    // Increment the rotation angle by a small amount
    rotationAngle += 1;
    // Apply the new rotation angle to the gear div
    $gearDiv.css('transform', `rotate(${rotationAngle}deg)`);

    // Continue spinning by using requestAnimationFrame
    requestAnimationFrame(spin);
  }
  

  // Call the spin function to start the animation
  spin();
}


/**
 * Represents a gear button object.
 * @typedef {Object} GearButton
 * @property {function} init - Initializes the gear button.
 * @property {function} open - Opens the gear button.
 */
const GearButton = {  
  init: createGearButton, 
  spin: () => {
    spinOK = true;
    startSpinning();
  },
  stop: () => {
    spinOK = false; 
  },
  open: () => {
    $gearDiv.css({
      bottom: '64px'
    }); 
  },
}
   