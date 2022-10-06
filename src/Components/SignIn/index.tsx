import React, { useState } from "react";
import { useSignInStyles } from "./styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchRequest } from "../../Utils/fetchAPI";
import { DataTestIds } from "../../Constants/DataTestIds";

function SignInPage() {
    const classes = useSignInStyles();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e: any) => {
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
            <label className={classes.label}>Sign In Page</label>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    label="User Name"
                    required
                    value={userName}
                    variant="outlined"
                    onChange={(e) => setUserName(e.target.value)}
                    data-testid={DataTestIds.USER_NAME}
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
                    <Button type="submit" variant="contained" color="primary" data-testid={DataTestIds.SIGN_IN_BUTTON}>
                        Sign In
                    </Button>
                </div>
            </form>
            {error && <div>Getting some error in Sign In, Please try again.</div>}
        </div>
    );
}

export default SignInPage;
