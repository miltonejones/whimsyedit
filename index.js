 

 
// Store highlighted text
let highlightedText = '';
let maxTokens = 256;
let messages = []
 
/**
 * Listens for a selection change event and sets the highlightedText variable to the selected text.
 *
 * @event selectionchange
 * @callback
 */
document.addEventListener('selectionchange', () => {
  // Get the selected text and store it in the highlightedText variable
  highlightedText = window.getSelection().toString();
});

/**
 * Listens for a keydown event and checks if the ctrl key is pressed.
 * If the ctrl key is pressed and the enter or y key is pressed, 
 * calls the getResponse function asynchronously with the event as a parameter.
 * @param {Event} event - The keydown event.
 */
document.addEventListener('keydown', async event => {
  if (event.ctrlKey && (event.key === 'Enter' || event.key === 'y')) {
    await getResponse(event);
  }
});

/**
 * Initializes the GPT Extension.
 */
function initializeGPTExtension() {
  console.log(`Confluence GPT Extension. %cReady!`, 'color: lime'); 
  Snackbar.init();  
  ClearButton.init();
  GearButton.init();
} 

// Call the initializeGPTExtension function to start the GPT Extension.
initializeGPTExtension();  
 
 
