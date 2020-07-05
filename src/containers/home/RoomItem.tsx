import { RootState } from "MyTypes"
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux";
import RoomItem from "views/home/components/RoomItem";
import {deleteRoom} from "domains/home/redux/actions"
import {

} from 'domains/home/redux/actions';

const mapStateToProps = (state: RootState) => ({

})

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            deleteRoom,
        },
        dispatch,
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomItem)
