import {RootState} from "MyTypes"
import {bindActionCreators, Dispatch} from "redux"
import {connect} from "react-redux"
import {
    getRoomPlayers,
    getRoomScoreData,
    getNumberOfPlayers,
} from "domains/room/redux/selectors"
import {
    updateRoomScore,
} from 'domains/room/redux/actions'
import ScoreSheet from "views/room/top/components/ScoreSheet";

const mapStateToProps = (state: RootState) => ({
    numberOfPlayers: getNumberOfPlayers(state),
    players: getRoomPlayers(state),
    scoreData: getRoomScoreData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            updateRoomScore,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ScoreSheet)
