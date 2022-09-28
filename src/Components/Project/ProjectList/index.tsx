import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@material-ui/core";
import { useProjectStyles } from '../styles/index.ts';
import axios from "axios";
import CreateProject from '../CreateProject/index.tsx';

interface Project {
    projectId: string;
    projectName: string;
}

function PersonList() {
    const classes = useProjectStyles();
    const [projects, setProjects] = useState(Array<Project>);
    const [showProgressIndicator, setShowProgressIndicator] = useState(false)
    const [showAddProject, setShowAddProject] = useState(false);
    const [personList, setPersonList] = useState([]);

    const handleLoadProject = () => {
        setShowProgressIndicator(true);
        axios.get('https://localhost:7124/projects').then((res) => {
            console.log('aaaaaaaaa: ', res);
            if (res.status === 200) {
                setShowProgressIndicator(false);
                setProjects(res.data);
            }
        })
    }

    const handleAddPerson = () => {
        setShowAddProject(true)
        axios
            .get("https://localhost:7124/persons", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setPersonList(res.data);
                    console.log('aaaaaaaaaa: ', res);
                } 
            });
    }

    return (
        <div className={classes.personListWrapper}>
            <TableContainer component={Paper}>
                <label className={classes.personHeader}>Project Details</label>
                {showProgressIndicator &&
                    <div><CircularProgress /></div>
                }
                {projects.length > 0 ?
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Project Id</TableCell>
                                <TableCell align="right">Project Name</TableCell>
                                <TableCell align="right">Persons</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects && projects.length > 0 && projects.map((person, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell align="right">{person.projectId}</TableCell>
                                    <TableCell align="right">{person.projectName}</TableCell>
                                    <TableCell align="right">
                                        {person.persons.map((p) => {
                                            return (<span>{p.personName + ' '}</span>)
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button type="submit" variant="contained" color="primary" onClick={handleLoadProject}>
                                        Refresh
                                    </Button>
                                </TableCell>
                            </TableRow>   
                        </TableBody>
                    </Table>
                :
                    <div className={classes.loadPerson}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleLoadProject}>
                            Load Projects
                        </Button>
                    </div>           
                }
            </TableContainer>
            {!showAddProject &&
                <Button type="submit" variant="outlined" color="primary" onClick={handleAddPerson} className={classes.addPerson}>
                    Add Person
                </Button>
            }
            {showAddProject &&
                <CreateProject personList={personList} />
            }
        </div>
    )
}

export default PersonList;
