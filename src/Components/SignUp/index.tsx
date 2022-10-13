import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { useSignUpStyles } from "./styles";
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import axios from "axios";
import { fetchRequest } from '../../Utils/fetchAPI';
import { DataTestIds } from "../../Constants/DataTestIds";

function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const classes = useSignUpStyles();
    const navigate = useNavigate();

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const data = {
            username: userName,
            email,
            password
        }
        // axios.post('https://localhost:7124/api/Authenticate/register', data, {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then((res) => {
        //     if (res.status === 200) {
        //         navigate('/signIn');
        //     } else {
        //         setError(true)
        //     }
        //     console.log('res: ', res);
        // });
        try {
            const res = await fetchRequest(
                "https://localhost:7124/api/Authenticate/register",
                "POST",
                data,
            );
            if (res) {
                navigate("/signIn");
            }
        } catch (e) {
            setError(true);
        }
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <label className={classes.label}>Sign Up Page</label>
            <TextField
                label="User Name"
                required
                value={userName}
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
                data-testid={DataTestIds.USER_NAME}
            />
            <TextField
                label="Email"
                required
                value={email}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                data-testid={DataTestIds.EMAIL}
            />
            <TextField
                label="Password"
                required
                value={password}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                data-testid={DataTestIds.PASSWORD}
            />

            <div className={classes.submitBtn}>
                <Button type="submit" variant="contained" color="primary" data-testid={DataTestIds.SIGN_UP_BUTTON}>
                    Signup
                </Button>
            </div>

            <div className={classes.signInText}>
                <Link href="#"  data-testid={DataTestIds.SIGN_IN_LINK} onClick={() => navigate('/signIn')}>Already have an account? Sign in</Link>
            </div>
            {error && <div>Getting some error in Sign Up, Please try again.</div>}
        </form>
    );
}

export default SignUpPage;
