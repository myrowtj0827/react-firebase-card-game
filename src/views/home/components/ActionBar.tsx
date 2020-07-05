import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import FindReplace from "@material-ui/icons/FindReplace";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

interface Props {
    createRoom: Function
}

export default function Home({
                                 createRoom
                             }: Props) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState(4);

    const onClickCreate = () => {
        if (name.trim() !== '') {
            if (number >=2 && number <= 4)
                createRoom(name, number);
            else alert('input correct number');
        }
        else alert('input your name');
    };

    return (
        <Grid container direction='row'>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="standard-basic"
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{backgroundColor: 'white'}}
                />
                <TextField
                    id="standard-basic"
                    label="number"
                    type="number"

                    value={number}
                    onChange={(e) => setNumber(Number(e.target.value))}
                    required
                    style={{backgroundColor: 'white', width: '70px', marginLeft: 10}}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FindReplace/>}
                    onClick={() => onClickCreate()}
                >
                    Create
                </Button>
            </Grid>
            <Grid item xs={2}>

            </Grid>
        </Grid>
    );
}
