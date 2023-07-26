
const elemSnackbar = $('<div />');
let startTime;

/**
 * Adds a chatbox button to the webpage with specified styles and content.
 * @async
 * @function createChatboxButton
 * @returns {Promise<void>}
 */

const createChatboxButton = async () => { 
  // Create the chatbox button element
  elemSnackbar
    .css({
      position: 'fixed',
      bottom: '-100px',
      left: '40px',
      transition: 'all 0.2s linear',
      'z-index': 10000,
      ...styles.button
    })
    .append(
      // Add text to the button
      $('<div />')
      .css({
        'font-weight': 600
      })
      .text('⌛ Generating response...'),
      // Add disclaimer text
      $('<small />')
        .css({
          color: 'white'
        })
        .text('OpenAI may produce inaccurate information about people, places, or facts'),
      // Add a timer element
      $('<div id="gpt-counter" />')
        .css({
          color: 'lime'
        })
        .text('0.0s')
    ); 
    
  // Append the chatbox button to the body of the webpage
  $('body').append(elemSnackbar);
};

/**
 * Initializes a GPT counter that displays elapsed time and the number of tokens used.
 */
function initializeGptCounter() {

  /**
   * Updates the GPT counter with elapsed time and the number of tokens used.
   */
  function updateGptCounter() {
    // If startTime is not defined, set it to the current time.
    if (!startTime) {
      startTime = Date.now();
    }
    
    // Calculate elapsed time in seconds and round to one decimal place.
    const elapsed = Math.round((Date.now() - startTime) / 100) / 10;

    // Update the GPT counter with elapsed time and the number of tokens used.
    $("#gpt-counter").text(`${elapsed.toFixed(1)}s using ${maxTokens} tokens`);

    // Schedule the next update in 100 milliseconds.
    setTimeout(updateGptCounter, 100); 
  }

  // Start the GPT counter.
  updateGptCounter();
}




const Snackbar = {  
  init: createChatboxButton,
  open: () => {
    elemSnackbar.css({
      bottom: '10px'
    });
    startTime = Date.now();
    initializeGptCounter()
  },
  close: () => elemSnackbar.css({
    bottom: '-100px'
  })
}