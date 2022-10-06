import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@material-ui/core";
import { useProjectStyles } from '../styles';
import CreateProject from '../CreateProject';
import { fetchRequest } from '../../../Utils/fetchAPI';
import { DataTestIds } from '../../../Constants/DataTestIds';

interface IPerson {
    personCountry: string;
    personId: number;
    personName: string;
    projectDTOs: any;
}
interface Project {
    persons: Array<IPerson>;
    projectId: string;
    projectName: string;
}

function ProjectList() {
    const classes = useProjectStyles();
    const [projects, setProjects] = useState(Array<Project>);
    console.log('projects: ', projects);
    const [showProgressIndicator, setShowProgressIndicator] = useState(false)
    const [showAddProject, setShowAddProject] = useState(false);
    const [personList, setPersonList] = useState([]);

    const handleLoadProject = async() => {
        setShowProgressIndicator(true);
        try {
            const res = await fetchRequest(
                'https://localhost:7124/projects',
                'GET',
                undefined,
            );
            if (res) {
                setShowProgressIndicator(false);
                setProjects(res);
            }
        } catch (e) {
            throw new Error();
        }
    }

    const handleAddPerson = async() => {
        setShowAddProject(true);
        try {
            const res = await fetchRequest(
                'https://localhost:7124/persons',
                'GET',
                undefined,
            );
            if (res) {
                setPersonList(res);
            }
        } catch (e) {
            throw new Error();
        }
    }

    return (
        <div className={classes.personListWrapper}>
            <TableContainer component={Paper}>
                <label className={classes.personHeader}>Project Details</label>
                {showProgressIndicator &&
                    <div data-testid={DataTestIds.PROGRESS_INDICATOR}><CircularProgress /></div>
                }
                {projects.length > 0 ?
                    <div data-testid={DataTestIds.PROJECT_LIST}>
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
                    </div>
                :
                    <div className={classes.loadPerson}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleLoadProject} data-testid={DataTestIds.LOAD_PROJECTS}>
                            Load Projects
                        </Button>
                    </div>           
                }
            </TableContainer>
            {!showAddProject &&
                <Button type="submit" variant="outlined" color="primary" onClick={handleAddPerson} data-testid={DataTestIds.ADD_PROJECT}>
                    Add Project
                </Button>
            }
            {showAddProject &&
                <CreateProject personList={personList} />
            }
        </div>
    )
}

export default ProjectList;
