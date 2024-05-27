// customStyles.js
const customStyles = {
    header: {
      style: {
        minHeight: '56px',
        fontSize: '18px',
        fontWeight: 'bold',
        backgroundColor: '#edb300',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: '#edb300',
        fontSize: '16px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        '&:not(:last-of-type)': {
          borderBottomStyle: 'solid',
          borderBottomWidth: '2px',
          borderBottomColor: '#ccc',
        },
      },
    },
  };
  
  export default customStyles;
  