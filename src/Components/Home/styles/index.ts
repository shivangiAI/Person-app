import { makeStyles } from "@material-ui/core";

export const useHomeStyles = makeStyles(() => ({
    homeListContainer: {
        margin: '15px', 
        display: 'flex',
        '& .MuiTableCell-head': {
            fontWeight: 'bold'
        },
        '& .MuiTableContainer-root': {
            padding: '20px 0px'
        },
        '& .MuiTableBody-root': {
            '& tr:last-child': {
                '& td:last-child': {
                    display: 'flex',
                    justifyContent: 'end',

                    '& button': {
                        backgroundColor: 'green'
                    }
                }
            }
        }
    },
    boxContainer: {
        width: '200px',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '4px',
        marginRight: '20px'
    }
}))