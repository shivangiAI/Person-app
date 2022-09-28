import { makeStyles } from "@material-ui/core";

export const useProjectStyles = makeStyles(() => ({
    personListWrapper: {
        margin: '15px',
        '& .MuiTableContainer-root': {
            padding: '20px 0px'
        },
        '& .MuiButton-outlined': {
            marginTop: '10px'
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
    personHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    personListContainer: {
        margin: '15px', 
        '& .MuiTableCell-head': {
            fontWeight: 'bold'
        }
    },
    createPersonContainer: {
        margin: '15px'
    },
    txtFieldContainer: {
        display: 'flex',
        flexDirection: 'column',

        '& .MuiFormControl-root': {
            margin: '10px'
        }
    },
    loadPerson: {
        marginTop: '10px'
    },
    addProjectsBtn: {
        marginBottom: '10px'
    },
    projectMenu: {
        '& .MuiFormControl-root': {
            width: '98%'
        }
    }
}));
