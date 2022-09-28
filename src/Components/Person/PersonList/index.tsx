import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from "@material-ui/core";
import { usePersonStyles } from '../styles/index.ts';
import axios from "axios";
import CreatePerson from '../CreatePerson/index.tsx';

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

    const handleLoadPerson = () => {
        setShowProgressIndicator(true);
        axios.get('https://localhost:7124/persons').then((res) => {
            console.log('aaaaaaaaa: ', res);
            if (res.status === 200) {
                setShowProgressIndicator(false);
                setPersons(res.data);
            }
        });
    }

    const handleAddPerson = () => {
        setShowAddPerson(true)
        axios
            .get("https://localhost:7124/projects", {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setProjectList(res.data);
                    console.log('aaaaaaaaaa: ', res);
                } 
            });
    }

    return (
        <div className={classes.personListWrapper}>
            <TableContainer component={Paper}>
                <label className={classes.personHeader}>Person Details</label>
                {showProgressIndicator &&
                    <div><CircularProgress /></div>
                }
                {persons.length > 0 ?
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
                :
                    <div className={classes.loadPerson}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleLoadPerson}>
                            Load Persons
                        </Button>
                    </div>           
                }
            </TableContainer>
            {!showAddPerson &&
                <Button type="submit" variant="outlined" color="primary" onClick={handleAddPerson} className={classes.addPerson}>
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