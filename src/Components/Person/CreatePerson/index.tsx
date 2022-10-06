import React, { useState } from "react";
import { usePersonStyles } from "../styles";
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

interface ISelectedValueProps {
    children: Array<any>;
    id: number;
    value: string
}
interface ISelectedValue {
    props: ISelectedValueProps
}
interface IPersons {
    personId: number;
    personName: string;
    personCountry: string;
    personDTOs: any;
}
interface IProject {
    projectId: number;
    projectName: string;
    persons: Array<IPersons>
}

// interface ICreatePersonProps  {
//     projectList: 
// }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreatePerson(props: any) {
    console.log('props: ', props);
    const classes = usePersonStyles();
    const [personName, setPersonName] = useState("");
    const [personCountry, setPersonCountry] = useState("");
    const [showToaster, setShowToaster] = useState(true);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [projectName, setProjectName] = useState<any>([]);
    const { projectList } = props;
    const [projectIds, setProjectIds] = useState<Array<number>>([]);

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

    const handleSubmit = async(event: any): Promise<void> => {
        event.preventDefault();
        const data = {
            personName,
            personCountry,
            projectIds
        };
        try {
            const res = await fetchRequest(
                "https://localhost:7124/api/Person",
                "POST",
                data,
            );
    
            if (res) {
                setPersonName("");
                setPersonCountry("");
                setShowToaster(true);
                setOpenSnackbar(true);
                setProjectName([]);
            }
        } catch(error) {
            throw new Error();
        }
    }

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleMenuChange = (event:SelectChangeEvent<typeof personName>, selectedValue: any) => {
        let ids: Array<number> = projectIds;

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
        <div className={classes.createPersonContainer} data-testid={DataTestIds.CREATE_PERSON_WRAPPER}>
            <div className={classes.personHeader}>Create Person</div>
            <div className={classes.txtFieldContainer}>
                <TextField
                    label="Person Name"
                    required
                    value={personName}
                    variant="outlined"
                    onChange={(e) => setPersonName(e.target.value)}
                    data-testid={DataTestIds.PERSON_NAME}
                />
                <TextField
                    label="Person Country"
                    required
                    value={personCountry}
                    variant="outlined"
                    onChange={(e) => setPersonCountry(e.target.value)}
                    data-testid={DataTestIds.PERSON_COUNTRY}
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
                    renderValue={(selected: any) => selected.join(', ')}
                    MenuProps={MenuProps}
                    data-testid={DataTestIds.PROJECT_MENU}
                >
                {projectList.map((project: any) => (
                    <MenuItem
                        id={project.projectId}
                        key={project.projectId}
                        value={project.projectName}
                    >
                        <Checkbox checked={projectName.indexOf(project.projectName) > -1} data-testid={DataTestIds.PROJECT_CHECKBOX} />
                        <ListItemText primary={project.projectName} />
                    </MenuItem>
                ))
                }
                </Select>
            </FormControl>
            </div>

            <div onClick={handleSubmit}>
                <Button type="submit" variant="contained" color="primary" data-testid={DataTestIds.ADD_PERSON_BUTTON}>
                    Add Person
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
