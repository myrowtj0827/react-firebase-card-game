import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ActionBar from "./components/ActionBar";
import {Box} from "@material-ui/core";
import MiddleArea from "./components/MiddleArea";
import Header from "./components/Header";
import firebase from 'utils/firebase'

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: 'center',
        background: '#10181c url(data:image/jpeg;base64,/9j/7gAOQWRvYmUAZMAAAAAB/9sAQwAEAwMEAwMEBAMEBAQEBQYJBgYFBQYLCAkHCQ0MDg4NDA0NDhAVEg4PExANDRIZExQWFhgYGA8SGhwaFxwWGBgX/9sAQwEEBAQGBQYLBgYLFw8NDxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcX/8AAEQgAZABkAwERAAIRAQMRAf/EABgAAQEBAQEAAAAAAAAAAAAAAAECAAMI/8QAKBABAAICAgEDAwUBAQAAAAAAAQARAiESMVEiQWEycZEDE0KBoVKx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEE/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A8aLYhNLK5WhXtKpriX5hCeuBNuNgwq8NY2siKs8wOauOTTKNia5XAxldFsKyODpgOFqsIvkd3IOTp11Kql07b+8Il+rfmFbKh9MChPdYROXcKcgPpYDimra1CJyetwpTHiV3A2LothGyfn3hWrHjfvAxWPe4QXl8wqwMiRDxDZA52uy6lU2JT35hGCm3/wAhWVX03/UIcfUU/mBXAkEZLdY2faUYy9st/eAcfn/IVVc+oRPJCoV0x1iXIhgchcbJVIUW9QG+WrhBbg1Cqw92EXIOeS45XKAHJuFPIqrgS+loYFJpdfiEDblV6uFbL0umAhd7OvEInJevaoU5HGqYCbq068QgV0XqFZKBHcITdWwBU6ff2gbicbvcKrgY7dkiI5Px+JVLSWd+8IwBt6hQ5b1VfaBQGZ8+YQ/tn3kErvVV9pVYRKe/aEAbNkKck/j19oQ41lpN+0B/bPO5BWXTA5mVY1UqsCbYC+rqEBlxsqFV+n1Ii4HLlxyddyjArftCm7A1r5hEl4NpCqwbyWtQjpIOSuLVyhcdLRqAKrx+YGbwdMKau2iEDk9GiBsrxrdwEOXi6gCoUdQocUBuBR6qurhArj15ganjd68QMY/9QBy+CFVx5bIRuHl1AF3ohWQSzvxCMCvq6hWUGiAgZHzCN+2+YBlWOiBisjeoBT1CnIvogYTjVbgXh9MiKYHLFARJVAPiBTT0VCJxQfUQqv0+2EdJByUM1TUoO8rCFVqqrfmEAuCwrOPbX+whcm6IGcssXcDVe6/2AOWuMApwRYVVct1CDlxKICuQCuoG+v2gF8DRAOLV+0Krgr6oQOXff5hWyP5EIwOTuFZaa3CHjyLPxAzjk/UwBeLW4GoyL8QDbpuFLWGoQgZkDccqr/IF5fSyDmcePzKoxgVl01AMeNeqBX6fTIi4HI4231KA+rUKrVFXcInGr9XUKrGuev6hHSQf/9k=) repeat',
        paddingTop: '5vh',
        width: '100vw',
        height: '95vh',
    },
}));

interface Props {
    rooms: any
    loadRooms: Function
    updateRooms: Function
    createRoom: Function
    joinRoom: Function
}

export default function Home({
                                 rooms,
                                 loadRooms,
                                 updateRooms,
                                 createRoom,
                                 joinRoom,
                             }: Props) {
    useEffect(() => {
        loadRooms();
        listenRooms();
    }, []);

    const listenRooms = () => {
        firebase.firestore().collection("rooms").where("active", "==", true)
            .onSnapshot(function (querySnapshot) {
                let rooms = [];
                querySnapshot &&
                querySnapshot.forEach(function(doc) {
                    rooms.push({id: doc.id, ...doc.data()});
                });
                updateRooms(rooms);
            });
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Header/>
            <ActionBar
                createRoom={createRoom}
            />
            <Box mb={1}/>
            <MiddleArea
                rooms={rooms}
                joinRoom={joinRoom}
            />
        </div>
    );
}
