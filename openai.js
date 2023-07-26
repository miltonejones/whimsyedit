
/**
 * Generates text using OpenAI's GPT-3 API
 * @async
 * @function
 * @param {string[]} messages - Array of strings representing the conversation history
 * @param {number} temperature - A number between 0 and 1 representing the creativity of the generated text
 * @returns {Promise<Object>} - A Promise that resolves with an object representing the generated text
 */

const generateText = async (messages, temperature, max_tokens = 2048) => {
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REACT_APP_CHAT_GPT_API_KEY}`,
      },
      body: JSON.stringify({
        messages,
        temperature,
        model: "gpt-3.5-turbo",
        max_tokens, 
      }),
    };
  
    /**
     * Sends a POST request to OpenAI's API and returns a Promise that resolves with the response JSON
     * @async
     * @function
     * @param {string} url - The URL to send the request to
     * @param {Object} options - The options to include in the request
     * @returns {Promise<Object>} - A Promise that resolves with the response JSON
     */
    const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions ); 
    const json = await response.json();
    return json;
  };
  
  
/**
 * Returns an array of chat messages, including a system message and a user message.
 *
 * @param {string} content - The content of the user's message.
 * @returns {Array} - An array of chat messages.
 */
const createChatMessages = (content) => {
    const systemMessage = {
      role: "system",
      content: `You are a research and editing assistant. The current page is ${location.href}.`,
    };
  
    const userMessage = {
      role: "user",
      content: content,
    };
  
    return [systemMessage, userMessage];
  };
  

 /**
 * Display a response by splitting content into lines, reversing the lines,
 * creating a new paragraph element for each non-empty line, and inserting
 * the new paragraph after the common ancestor container of the current
 * selection range.
 * @param {string} content - The content to display
 */
function displayResponse(content) {
    // Split content into lines
    const lines = content.split('\n');
  
    // Get the current selection and its common ancestor container
    const selection = window.getSelection();
    const parent = selection.getRangeAt(0).commonAncestorContainer;
  
    // Collapse the selection range to the end of the last selected node
    selection.getRangeAt(0).collapse(false);
  
    // Reverse the lines and create a new paragraph for each non-empty line
    lines.reverse().forEach(line => {
      if (!line.length) return;
      const newParagraph = document.createElement('p');
      newParagraph.textContent = line;
      // Insert the new paragraph after the common ancestor container
      parent.parentNode.after(newParagraph);
    });
  }
  
  /**
 * Function to handle response from user input
 * @async
 * @function getResponse
 * @param {Event} event - The event object of the user input
 * @returns {void}
 */
async function getResponse(event) {
    // Prevent the default behavior of the event
    event.preventDefault();
  
    // Open the Snackbar to indicate loading
    Snackbar.open();
  
    // Create a new message object with the highlighted text
    const newMsg = createChatMessages(highlightedText);
  
    // Generate text with the new message object and the existing messages array
    const { choices } = await generateText([...messages, ...newMsg], 0.5, maxTokens);
  
    // Close the Snackbar and open the ClearButton
    Snackbar.close();
    ClearButton.open();
  
    // Get the generated message content from the first choice
    const generatedContent = choices[0].message.content;
  
    // Add the generated message to the existing messages array
    messages.push({
      role: 'assistant',
      content: generatedContent
    });

    displayResponse(generatedContent);
  }