import React from 'react';
import Grid from '@material-ui/core/Grid';
import RoomItem from "containers/home/RoomItem";

interface Props {
    rooms: any
    joinRoom: Function
}

/*interface RoomItemProps {
    key: number
    room: any
    joinRoom: Function
}

export function RoomItem({
                             key,
                             room,
                             joinRoom,
                         }: RoomItemProps & RouteComponentProps<{}>) {
    const classes = useStyles();
    const [name, setName] = useState('');

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
            <Paper className={classes.room}>
                <Card className={classes.card} variant="outlined">
                    <CardContent className={classes.players}>
                        {
                            room.players.map((player, index) => (
                                <>
                                    <Avatar
                                        key={index}
                                        onClick={history.push(`room/${}/${}`)}
                                    >
                                        {player.name.toUpperCase().charAt(0)}
                                    </Avatar>
                                    <Box ml={1}/>
                                </>
                            ))
                        }
                    </CardContent>
                    {
                        room.players &&
                        room.players.length !== 4 &&
                        <CardActions>
                            <TextField
                                id="standard-basic"
                                label="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                style={{backgroundColor: 'white'}}
                            />
                            <Button
                                className={classes.button}
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
}*/

export default function RoomsArea({
                                      rooms,
                                      joinRoom,
                                  }: Props) {
    console.log(rooms);
    return (
        <Grid
            container
            direction='row'
        >
            {
                rooms && rooms.map((room) => (
                    <RoomItem
                        key={room.id}
                        room={room}
                        joinRoom={joinRoom}
                    />
                ))
            }
        </Grid>
    );
}
