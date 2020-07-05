import {RootState} from "MyTypes"
import {bindActionCreators, Dispatch} from "redux"
import {connect} from "react-redux"
import {getRoomStatus} from 'domains/room/redux/selectors'
import Player from "components/room/Player";

const mapStateToProps = (state: RootState) => ({
    status: getRoomStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {},
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Player)
