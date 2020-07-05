import {RootState} from "MyTypes"
import {bindActionCreators, Dispatch} from "redux"
import {connect} from "react-redux"
import {
    getRoomId,
    getRoomStatus,
    getBottomAreaData,
    getLeftAreaData,
    getRightAreaData,
    getTopAreaData,
    getJustJoinedPlayer,
    getSingleReplaceCardResult,
} from "domains/room/redux/selectors"
import {
    updateRoom,
    shuffleAction,
    initializeJoinedPlayer,
    initializeSingleReplaceCardResult,
    showAllCards,
} from 'domains/room/redux/actions'
import {setMyName} from "domains/home/redux/actions";
import {showChoiceCards} from "domains/card/redux/actions";
import Room from "views/room/Room"

const mapStateToProps = (state: RootState) => ({
    // roomId: getRoomId(state),
    justJoinedPlayer: getJustJoinedPlayer(state),
    status: getRoomStatus(state),
    bottomAreaData: getBottomAreaData(state),
    topAreaData: getTopAreaData(state),
    rightAreaData: getRightAreaData(state),
    leftAreaData: getLeftAreaData(state),
    singleReplaceCardResult: getSingleReplaceCardResult(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            setMyName,
            updateRoom,
            shuffleAction,
            initializeJoinedPlayer,
            initializeSingleReplaceCardResult,
            showChoiceCards,
            showAllCards,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Room)
