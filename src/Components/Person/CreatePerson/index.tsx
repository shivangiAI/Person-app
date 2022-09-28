import React, { useState } from "react";
import { usePersonStyles } from "../styles/index.ts";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import OutlinedInput from '@mui/material/OutlinedInput';  
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreatePerson(props: any) {
    const classes = usePersonStyles();
    // const [personId, setPersonId] = useState("");
    const [personName, setPersonName] = useState("");
    const [personCountry, setPersonCountry] = useState("");
    const [showToaster, setShowToaster] = useState(true);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [projectName, setProjectName] = useState([]);
    const { projectList } = props;
    const [projectIds, setProjectIds] = useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            personName,
            personCountry,
            projectIds
        };
        axios
            .post("https://localhost:7124/api/Person", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
            if (res.status === 200) {
                // setPersonId("");
                setPersonName("");
                setPersonCountry("");
                setShowToaster(true);
                setOpenSnackbar(true);
                setProjectName([]);
            }
        });
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleMenuChange = (event, selectedValue) => {
        let ids = projectIds;

        if (event.target.value.includes(selectedValue.props.value)) {
            ids.push(selectedValue.props.id);
            setProjectIds(ids);
        } else {
            const index = projectIds.indexOf(selectedValue.props.id);
            if (index > -1) {
                ids.splice(index, 1);
                setProjectIds(ids);
            }
        }
        
        const {
            target: { value },
        } = event;
        setProjectName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className={classes.createPersonContainer}>
            <div className={classes.personHeader}>Create Person</div>
            <div className={classes.txtFieldContainer}>
            <TextField
                label="Person Name"
                required
                value={personName}
                variant="outlined"
                onChange={(e) => setPersonName(e.target.value)}
            />
            <TextField
                label="Person Country"
                required
                value={personCountry}
                variant="outlined"
                onChange={(e) => setPersonCountry(e.target.value)}
            />
        </div>
        <div className={classes.projectMenu}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Projects</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={projectName}
                    onChange={handleMenuChange}
                    
                    input={<OutlinedInput label="Name" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                {console.log('handleMenuChange: ', projectIds)}
                {projectList.map((project) => (
                    <MenuItem
                        id={project.projectId}
                        key={project.projectId}
                        value={project.projectName}
                    >
                    <Checkbox checked={projectName.indexOf(project.projectName) > -1} />
                    <ListItemText primary={project.projectName} />
                    </MenuItem>
                ))
                }
                </Select>
            </FormControl>
            </div>

            <div className={classes.submitBtn} onClick={handleSubmit}>
            <Button type="submit" variant="contained" color="primary">
                Create
            </Button>
            </div>
            {showToaster && (
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Person is created successfully!
                </Alert>
            </Snackbar>
            )}
        </div>
    );
}

export default CreatePerson;
