import React, { useState } from "react";
import { useProjectStyles } from "../styles/index.ts";
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

function CreateProject(props: any) {
    const classes = useProjectStyles();
    const [projectName, setProjectName] = useState("");
    const [showToaster, setShowToaster] = useState(true);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [personName, setPersonName] = useState([]);
    const { personList } = props;
    const [personIds, setPersonIds] = useState([]);

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
            projectName,
            personIds
        };
        axios
        .post("https://localhost:7124/api/Project", data, {
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((res) => {
            if (res.status === 200) {
                setProjectName("");
                setShowToaster(true);
                setOpenSnackbar(true);
                setPersonName([]);
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
        let ids = personIds;
        const selectedId = selectedValue.props.id

        if (event.target.value.includes(selectedValue.props.value)) {
            ids.push(selectedId);
            setPersonIds(ids);
        } else {
            const index = personIds.indexOf(selectedId);
            if (index > -1) {
                ids.splice(index, 1);
                setPersonIds(ids);
            }
        }
        
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className={classes.createPersonContainer}>
        <div className={classes.personHeader}>Create Project</div>
        <div className={classes.txtFieldContainer}>
            <TextField
                label="Project Name"
                required
                value={projectName}
                variant="outlined"
                onChange={(e) => setProjectName(e.target.value)}
            />
        </div>
        <div className={classes.projectMenu}>
            <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Persons</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleMenuChange}
                
                input={<OutlinedInput label="Name" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {personList.map((project) => (
                        <MenuItem
                            id={project.personId}
                            key={project.personId}
                            value={project.personName}
                        >
                            <Checkbox checked={personName.indexOf(project.personName) > -1} />
                            <ListItemText primary={project.personName} />
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
                Project is created successfully!
            </Alert>
            </Snackbar>
        )}
        </div>
    );
}

export default CreateProject;
