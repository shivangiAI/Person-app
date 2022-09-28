import { makeStyles } from "@material-ui/core";

export const useSignUpStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        '& .MuiTextField-root': {
            margin: '10px',
            width: '330px',
        },
        '& .MuiButtonBase-root': {
            margin: '10px',
        },
    },
    nameContainer: {
        '& .MuiTextField-root': {
            width: '150px',
            margin: '10px 14px'
        },
    },
    label: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    submitBtn: {
        width: '200px',
        '& .MuiButtonBase-root': {
            margin: '15px 0px 0px 0px',
            width: '100%'
        }
    },
    signInText: {
        marginTop: '5px'
    }
}));
