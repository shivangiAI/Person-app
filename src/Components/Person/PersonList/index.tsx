import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@material-ui/core";
import { usePersonStyles } from '../styles';
import CreatePerson from '../CreatePerson';
import { fetchRequest } from '../../../Utils/fetchAPI'
import { DataTestIds } from '../../../Constants/DataTestIds';

interface Person {
    personId: string;
    personName: string;
    personCountry: string;
}

function PersonList() {
    const classes = usePersonStyles();
    const [persons, setPersons] = useState(Array<Person>);
    const [showProgressIndicator, setShowProgressIndicator] = useState(false)
    const [showAddPerson, setShowAddPerson] = useState(false);
    const [projectList, setProjectList] = useState([]);

    const handleLoadPerson = async() => {
        setShowProgressIndicator(true);
        try {
            const res = await fetchRequest(
                'https://localhost:7124/persons',
                'GET',
                undefined,
            );
            if (res) {
                setShowProgressIndicator(false);
                setPersons(res);
            }
        } catch (e) {
            throw new Error();
        }
    }

    const handleAddPerson = async() => {
        setShowAddPerson(true)
        try {
            const res = await fetchRequest(
                'https://localhost:7124/projects',
                'GET',
                undefined,
            );
            if (res) {
                setProjectList(res);
            }
        } catch (e) {
            throw new Error();
        }
    }

    return (
        <div className={classes.personListWrapper}>
            <TableContainer component={Paper}>
                <label className={classes.personHeader}>Person Details</label>
                {showProgressIndicator &&
                    <div data-testid={DataTestIds.PROGRESS_INDICATOR}><CircularProgress /></div>
                }
                {persons.length > 0 ?
                    <div data-testid={DataTestIds.PERSON_LIST}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Person Id</TableCell>
                                    <TableCell align="right">Person Name</TableCell>
                                    <TableCell align="right">Person Country</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {persons && persons.length > 0 && persons.map((person, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell align="right">{person.personId}</TableCell>
                                        <TableCell align="right">{person.personName}</TableCell>
                                        <TableCell align="right">{person.personCountry}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Button type="submit" variant="contained" color="primary" onClick={handleLoadPerson}>
                                            Refresh
                                        </Button>
                                    </TableCell>
                                </TableRow>   
                            </TableBody>
                        </Table>
                    </div>
                :
                    <div className={classes.loadPerson}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleLoadPerson} data-testid={DataTestIds.LOAD_PERSONS}>
                            Load Persons
                        </Button>
                    </div>           
                }
            </TableContainer>
            {!showAddPerson &&
                <Button type="submit" variant="outlined" color="primary" onClick={handleAddPerson} data-testid={DataTestIds.ADD_PERSON}>
                    Add Person
                </Button>
            }
            {showAddPerson &&
                <CreatePerson projectList={projectList} />
            }
        </div>
    )
}

export default PersonList;