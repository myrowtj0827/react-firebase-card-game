import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

/*theme.palette.common.black*/

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: 'gray',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        backgroundColor: 'gray',
        /*'&:nth-of-type(odd)': {
            backgroundColor: 'transparent',
        },*/
    },
}))(TableRow);

function createData(calories: number, fat: number, carbs: number, protein: number) {
    return {calories, fat, carbs, protein};
}

const rows = [
    createData(1, 1,1,1),
    createData(1, 1,1,1)
];

const useStyles = makeStyles({
    table: {},
});

export default function ScoreTable() {
    const classes = useStyles();

    return (
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell align="right">Me</StyledTableCell>
                    <StyledTableCell align="right">Player2</StyledTableCell>
                    <StyledTableCell align="right">Player3</StyledTableCell>
                    <StyledTableCell align="right">Player4</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, index) => (
                    <StyledTableRow key={index}>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                    </StyledTableRow>
                ))}
                <StyledTableRow>
                    <StyledTableCell align="right"><input type='text' /></StyledTableCell>
                    <StyledTableCell align="right"><input type='text' /></StyledTableCell>
                    <StyledTableCell align="right"><input type='text' /></StyledTableCell>
                    <StyledTableCell align="right"><input style={{zIndex: 100,}} type='text' /></StyledTableCell>
                </StyledTableRow>
            </TableBody>
        </Table>
    );
}
