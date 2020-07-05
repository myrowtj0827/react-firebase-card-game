import React, {useState} from 'react';
import {withRouter, RouteComponentProps} from "react-router"
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange, deepPurple} from '@material-ui/core/colors';
import {Box} from "@material-ui/core";
import FindReplace from "@material-ui/icons/FindReplace";
import TextField from "@material-ui/core/TextField";
import ModalDialog from "../../../components/room/Modal";

const useStyles = makeStyles(theme => ({
    roomWrapper: {
        padding: 3
    },
    room: {
        height: theme.spacing(20),
    },
    card: {
        height: '100%',
        backgroundColor: '#1e272d',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center',
    },
    players: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    avatarWrapper: {
        cursor: 'pointer',
    },
    numberLabel: {
        backgroundColor: 'white',
        height: 48,
        width: 24,
        fontSize: 25,
        borderRadius: '10%',
    },
    closeButton: {
        position: 'relative',
        top: 0,
        left: '42%',
        backgroundColor: '#3f51b5',
        color: 'white',
        cursor: 'pointer',
    }
}));


interface RoomItemProps {
    key: number
    room: any
    joinRoom: Function
    deleteRoom: Function
}

 function RoomItem({
                             key,
                             room,
                             joinRoom,
     deleteRoom,
                             history
                         }: RoomItemProps & RouteComponentProps<{}>) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [modalOpened, setModalOpened] = useState(false);

    const onClickDelete = () => {
        deleteRoom(room.id);
        setModalOpened(false);
    };

    const onClickClose = () => {
        setModalOpened(false);
    };

    const onClickJoin = () => {
        const players = room && room.players;
        const index = players && players.findIndex(player => player.name === name);

        if (name.trim() !== '' && index !== -1) { // if same name exists in room
            alert('input other name');
        } else {
            if (name.trim() === '') {
                alert('Please input your name!');
            } else {
                const roomId = room && room.id;
                if (roomId)
                    joinRoom(room, name); // previous room and my name
            }
        }
    };

    return (
        <Grid
            key={key}
            item xs={3}
            className={classes.roomWrapper}>
            <ModalDialog
                title={'Are you sure you want to delete this room?'}
                open={modalOpened}
                onClickOk={onClickDelete}
                onClickCancel={onClickClose}
            />
            <Paper className={classes.room}>
                <button
                    className={classes.closeButton}
                    onClick={() => setModalOpened(true)}
                >X</button>
                <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.players}>
                        {
                            room.players.map((player, index) => (
                                <div className={classes.avatarWrapper}>
                                    <Avatar
                                        key={index}
                                        onClick={() => history.push(`room/${room.id}/${player && player.name}`)}
                                    >
                                        {player.name.toUpperCase().charAt(0)}
                                    </Avatar>
                                    <Box ml={1}/>
                                </div>
                            ))
                        }
                    </CardContent>
                    {
                        room.players &&
                        room.players.length < (room && room.numberOfPlayers) &&
                        <CardActions>
                            <span className={classes.numberLabel}>{room && room.numberOfPlayers}</span>
                            <TextField
                                id="standard-basic"
                                label="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{backgroundColor: 'white'}}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<FindReplace/>}
                                onClick={onClickJoin}
                            >
                                Join
                            </Button>
                        </CardActions>
                    }
                </Card>
            </Paper>
        </Grid>
    )
}

export default withRouter(RoomItem)
