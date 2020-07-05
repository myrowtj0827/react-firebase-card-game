import { RootState } from "MyTypes"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux";
import Home from 'views/home/Home';
import {getRooms} from 'domains/home/redux/selectors';
import {
    loadRooms,
    updateRooms,
    createRoom,
    joinRoom,
} from 'domains/home/redux/actions';

const mapStateToProps = (state: RootState) => ({
    rooms: getRooms(state),
})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            loadRooms,
            updateRooms,
            createRoom,
            joinRoom,
        },
        dispatch,
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home)
