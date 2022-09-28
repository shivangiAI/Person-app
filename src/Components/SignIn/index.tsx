import React, { useState } from "react";
import { useSignInStyles } from "./styles/index.ts";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchRequest } from "../../Utils/fetchAPI.ts";

function SignInPage() {
    const classes = useSignInStyles();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {
            username: userName,
            password,
        };
        // axios
        //     .post("https://localhost:7124/api/Authenticate/login", data, {
        //         headers: {
        //         "Content-Type": "application/json",
        //         },
        //     })
        //     .then((res) => {
        //         if (res.status === 200) {
        //             navigate("/home");
        //         } else {
        //             setError(true);
        //         }
        //         console.log("res: ", res);
        //     });
        try {
            const res = await fetchRequest(
                "https://localhost:7124/api/Authenticate/login",
                "POST",
                data,
                undefined
            );
            if (res) {
                navigate("/home");
            }
        } catch (e) {
            setError(true);
        }
    };

    return (
        <div>
        <label className={classes.label}>Sign In</label>
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="User Name"
                required
                value={userName}
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
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
                Sign In
            </Button>
            </div>
        </form>
        {error && <div>Getting some error in Sign In, Please try again.</div>}
        </div>
    );
}

export default SignInPage;
