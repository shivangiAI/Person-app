import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { useSignUpStyles } from "./styles/index.ts";
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import axios from "axios";

function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [password, setPassword] = useState('');
    const classes = useSignUpStyles();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: userName,
            email,
            password
        }
        axios.post('https://localhost:7124/api/Authenticate/register', data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.status === 200) {
                navigate('/signIn');
            } else {
                setError(true)
            }
            console.log('res: ', res);
        });
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <label className={classes.label}>Sign Up</label>
            <TextField
                label="User Name"
                required
                value={userName}
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                label="Email"
                required
                value={email}
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                required
                value={password}
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            />

            <div className={classes.submitBtn}>
                <Button type="submit" variant="contained" color="primary">
                    Signup
                </Button>
            </div>

            <div className={classes.signInText}>
                <Link href="#" onClick={() => navigate('/signIn')}>Already have an account? Sign in</Link>
            </div>
            {error && <div>Getting some error in Sign Up, Please try again.</div>}
        </form>
    );
}

export default SignUpPage;
