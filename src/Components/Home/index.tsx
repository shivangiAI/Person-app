import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { DataTestIds } from "../../Constants/DataTestIds";
import { useHomeStyles } from './styles';

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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handlePerson}
                    data-testid={DataTestIds.PERSON_BUTTON}
                >
                    Person
                </Button>
            </div>
            <div className={classes.boxContainer}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleProject}
                    data-testid={DataTestIds.PROJECT_BUTTON}
                >
                    Project
                </Button>
            </div>
        </div>
    )
}

export default Home;