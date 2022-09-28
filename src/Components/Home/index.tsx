import React from 'react'
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { useHomeStyles } from './styles/index.ts';

function Home() {
    const classes = useHomeStyles();
    const navigate = useNavigate();

    const handlePerson = () => {
        navigate('/personList');
    }

    const handleProject = () => {
        navigate('/projectList');
    }

    return (
        <div className={classes.homeListContainer}>
            <div className={classes.boxContainer}>
                <Button type="submit" variant="contained" color="primary" onClick={handlePerson}>
                    Person
                </Button>
            </div>
            <div className={classes.boxContainer}>
                <Button type="submit" variant="contained" color="primary" onClick={handleProject}>
                    Project
                </Button>
            </div>
        </div>
    )
}

export default Home;