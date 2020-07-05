import React from 'react';
import Grid from '@material-ui/core/Grid';

interface Props {

}

export default function Header({}: Props) {
    return (
            <Grid container direction='row'>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={8}>
                    <h1 style={{color: 'white'}}>Let's have a good use of Corona!</h1>
                </Grid>
                <Grid item xs={2}>

                </Grid>
            </Grid>
    );
}
