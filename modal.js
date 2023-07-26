
// Create div element
var $gearDiv = $('<div>');

$(document).ready(function() {

    
    // Add class and styles 
    $gearDiv.css({
      'position': 'fixed',
      'left': '24px',
      'bottom': '60px',
      'width': '24px',
      'height': '24px',
      'border-radius': '50%',
      'background': '#ddd', 
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center' 
    });
    
    // Add gear icon
    $gearDiv.html('⚙️');
    
    // Append to body
    $('body').append($gearDiv);
     

    // Create the div
    var $div = $('<div></div>').css({
      'position': 'absolute', 
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%, -50%)', 
      'width': '500px',
      padding: '16px',
      display: 'grid',
    "grid-direction": 'column', 
    'grid-auto-rows': 'auto',
    'row-gap': '8px', 
    });
  


    // Create the range input
    var $range = $('<input type="range">').attr({
      min: Math.pow(2,7), 
      max: Math.pow(2,12),
      step: 1
    });
  
    // Create the dropdown
    var $dropdown = $('<select></select>');
    for (var i=1; i<=5; i++) {
      $dropdown.append($('<option></option>').val(i).text('Option ' + i)); 
    }
  
    // Create the button 
    var $button = $('<button>Submit</button>');
  
    // Add elements to div
    $div.append($range);
    $div.append($dropdown);
    $div.append($button);
  
    // Add div to body
    $('body').append($div);
  
  });
  