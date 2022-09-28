import { makeStyles } from "@material-ui/core";

export const useSignInStyles = makeStyles(() => ({
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
    label: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    submitBtn: {
        width: '27%',
        '& .MuiButtonBase-root': {
            margin: '15px 0px 0px 0px',
            width: '100%'
        }
    },
    signInText: {
        fontSize: '20px',
        fontWeight: 'bold'
    }
}))