
const elemSnackbar = $('<div />');

/**
 * Creates a chatbox button and appends it to the body of the webpage.
 * @function
 * @async
 */
const createChatboxButton = async () => { 
  
  // Sets the styles and appends the content for the chatbox button
  elemSnackbar
    .css({
      position: 'absolute',
      bottom: '-100px',
      left: '20px',
      transition: 'all 0.2s linear',
      ...styles.button
    })
    .append(
      $('<div />').text('Generating answer...'),
      $('<small />')
        .css({
          color: 'white'
        })
        .text('OpenAI may produce inaccurate information about people, places, or facts')
    ) 
    
  // Appends the chatbox button to the body of the webpage
  $('body').append(elemSnackbar);
}


const Snackbar = {  
  init: createChatboxButton,
  open: () => elemSnackbar.css({
    bottom: '40px'
  }),
  close: () => elemSnackbar.css({
    bottom: '-100px'
  })
}