import React, { useState } from "react";
import { useProjectStyles } from "../styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import OutlinedInput from '@mui/material/OutlinedInput';  
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { fetchRequest } from "../../../Utils/fetchAPI";
import { DataTestIds } from "../../../Constants/DataTestIds";

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
    const [personName, setPersonName] = useState<any>([]);
    const { personList } = props;
    const [personIds, setPersonIds] = useState<any>([]);

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

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        const data = {
            projectName,
            personIds
        };
        try {
            const res = await fetchRequest(
                "https://localhost:7124/api/Project",
                "POST",
                data,
            );
    
            if (res) {
                setProjectName("");
                setShowToaster(true);
                setOpenSnackbar(true);
                setPersonName([]);
            }
        } catch(error) {
            throw new Error();
        }
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

    const handleMenuChange = (event: SelectChangeEvent<typeof personName>, selectedValue: any) => {
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
        <div data-testid={DataTestIds.CREATE_PROJECT_WRAPPER}>
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
                    {personList.map((project: any) => (
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

            <div onClick={handleSubmit}>
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
        </div>
    );
}

export default CreateProject;
