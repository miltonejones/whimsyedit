function waitForElementToAppear(elementId, callback) {
  const element = document.getElementById(elementId);
  if (element) {
    // If the element already exists, return true immediately
    callback(true);
  } else {
    // If the element doesn't exist yet, wait and check again
    setTimeout(() => waitForElementToAppear(elementId, callback), 100);
  }
}

 
// Store highlighted text
let highlightedText = '';

// Update on selection change  
document.addEventListener('selectionchange', () => {
  highlightedText = window.getSelection().toString();
});

// On Ctrl+Enter, generate and replace text
document.addEventListener('keydown', async event => {
  if(event.ctrlKey && event.key === 'Enter') {
    event.preventDefault();
     
    Snackbar.open();
    const { choices } = await generateText(create(highlightedText), .5, 512);
    Snackbar.close();

    const { message } = choices[0];  
    const generated = message.content;



    // Split text into lines
    let lines = generated.split('\n');

    // Replace selected text with <p> elements 
    let sel = window.getSelection();
    // sel.deleteFromDocument();


    // Insert paragraphs in correct order
    // lines.forEach(line => {
    //   console.log({line})
    //   let p = document.createElement('p');
    //   p.textContent = line;
    //  
    // });

    // Get parent element of selection 
    let parent = sel.getRangeAt(0).commonAncestorContainer;

    // Insert after selection 
    sel.getRangeAt(0).collapse(false); // collapse to end 

    lines.reverse().forEach(line => {
      if (!line.length) return;
      console.log({line})
      let p = document.createElement('p');
      p.textContent = line;
      // $(parent.parentNode).append($(p))
      parent.parentNode.after(p); 
    });


    $(parent.parentNode).remove(parent)
    

    // console.log ({ generated })
    
    // // Replace selected text with generated
    // let sel = window.getSelection();
    // sel.deleteFromDocument();
    // sel.getRangeAt(0).insertNode(document.createTextNode(generated));
  }
});
  

 

function start() {
  console.log(`GPT Extension. Ready.`) 

  // Usage example:
  waitForElementToAppear('close-button', (elementAppeared) => {
    if (elementAppeared) {
      console.log('Element with ID "close-button" appeared!');
      Snackbar.init() 
      // You can perform any actions you need here once the element appears
    } else {
      console.log('Timeout: Element did not appear within specified time.');
    }
  }); 

}
 

start();


 
