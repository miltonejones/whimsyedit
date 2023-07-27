 
/**
 * Creates a dialog header element.
 * @param {string} title - The title of the dialog.
 * @returns {jQuery} - The dialog header element.
 */
const dialogHead = (title) => {
  // Create a div element
  const $dialogHeader = $("<div>").css(styles.flex);

  // Create a div element for the title
  const $title = $("<div>") 
    .css({ fontWeight: 600 })
    .text(title);

  // Create a div element for the close button
  const $closeButton = $("<div>")
      .css({
        fontSize: '1.2rem',
        cursor: 'pointer'
      })
      .html("&times;")
      .on('click', Modal.close);

  // Append the title and close button div elements to the dialog header div element
  $dialogHeader.append($title, $closeButton);

  return $dialogHeader;
}

/**
 * Constructs the footer of a dialog box.
 * @param {string} okay - Text to display on the okay button.
 * @param {function} fn - Function to execute when okay button is clicked.
 * @returns {jQuery} - jQuery object representing the constructed dialog footer.
 */
const dialogFoot = (okay, fn) => {
  // Create a new div element
  const dialogFooter = $("<div>");
  
  // Apply CSS styles to the div element
  dialogFooter.css({
    ...styles.flex,
    justifyContent: 'flex-end',
  });
  
  // Append two child elements to the div element
  dialogFooter.append(
    // Create a new button element and apply CSS styles and event listener to it
    $("<button>")
      .css(styles.button)
      .text(okay)
      .on('click', fn),
    
    // Create a new div element and apply CSS styles and event listener to it
    $("<div>")
      .css({
        ...styles.button,
        ...styles.outlined
      })
      .html("close")
      .on('click', Modal.close)
  );
  
  // Return the completed dialog footer
  return dialogFooter;
}  

/**
 * Object representing a modal.
 * @namespace
 * @property {JQuery<HTMLElement>} overlay - The overlay element of the modal.
 * @property {JQuery<HTMLElement>} modal - The dialog element of the modal.
 * @property {function} close - The function to close the modal.
 * @property {function} open - The function to open the modal.
 */
const Modal = {
  // Create overlay element and append to body
  overlay: $('<div>').css(styles.overlay).appendTo('body').on('click', () => Modal.close()),

  // Create modal element and append to body
  modal: $("<div>").css(styles.dialog).appendTo("body"), 

  /**
   * Function to close the modal.
   * Hides the modal and displays a message.
   */
  close: () => {
    Modal.modal.empty().append("<div>Fine, be that way!</div>").css({top: '-1000px'});
    Modal.overlay.hide();
  } ,

  /**
   * Function to open the modal.
   * @param {string} title - The title of the modal.
   * @param {Object} config - The configuration object for the form.
   * @param {Object} res - The response object.
   * @param {function} fn - The function to call when the form is submitted.
   */
  open: (title, config, res, fn) => { 
    Modal.modal.empty().append(
      dialogHead(title),
      $("<hr />"),

      // Create a div with padding and append the form to it
      $("<div>").css({padding: '16px 0'}).append(Form.create(config, res)), 

      $("<hr />"),
      // Create dialog footer and call function when Save button is clicked
      dialogFoot("Save", () => {
        alert(JSON.stringify(res));
        fn(res);
        Modal.close();
      })
    ).css({top: '50%'});

    Modal.overlay.show();
  }
}


