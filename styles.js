
// Base styling for the input
const formControl = {
  display: 'inline-block',  
  lineHeight: '1.5',
  color: '#555',
  backgroundColor: '#fff',
  backgroundImage: 'none',
  border: '1px solid #ccc',
  borderRadius: '4px', 
  padding: '5px 10px',
  fontSize: '12px',
  width: 'calc(100% - 32px)'
};
  

const buttonStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 4,
  padding: '4px 12px',
  fontSize: 14,
  fontWeight: 500,
  textTransform: 'uppercase',
  cursor: 'pointer',
  color: '#fff',
};

const primaryStyles = {
  backgroundColor: '#1976d2',
};

const secondaryStyles = {
  backgroundColor: '#f50057',
};

const disabledStyles = {
  backgroundColor: '#bdbdbd',
  color: '#757575',
  cursor: 'not-allowed',
};
 


const styles= {
  snackbar: {
    margin: '1em',
    padding: '0.5rem 1rem',
    fontSize: '.875rem',
    borderRadius: '0.2rem',
    color: '#fff',
    backgroundColor: '#0b5ed7',
    borderColor:' #0a58ca',
    cursor: 'pointer',
    minWidth: '360px'
  },

  formControl, 
  button: {
    margin: '.1em',
    padding: '0.25rem 0.75rem',
    fontSize: '.875rem',
    fontWeight: 600,
    borderRadius: '0.2rem',
    cursor: 'pointer', 
    textTransform: 'capitalize',


    color: '#fff',
    backgroundColor: '#0b5ed7',
    borderColor:' #0a58ca',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  outlined: {
    color: '#0b5ed7',
    backgroundColor: '#fff',
    borderColor:' #0b5ed7',
  },

  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'none',
    transition: "all 0.3s ease-in",
    zIndex: 1000
  },

  dialog: {
    position: 'absolute',  
    top: '-1000px', //'50%',
    left: '50%',
    transition: "all 0.6s ease-in",
    transform: 'translate(-50%, -50%)',
    minWidth: '500px',
    background: '#fff',
    padding: '16px',
    zIndex: 1001,
    borderRadius: '5px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' 
   
  }
}
