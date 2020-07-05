import {RootState} from "MyTypes"
import {bindActionCreators, Dispatch} from "redux"
import {connect} from "react-redux"
import {
    replaceAction,
    keepAction,
    leaveAction,
    playAction,
} from 'domains/room/redux/actions'
import {getRoomStatus} from 'domains/room/redux/selectors'
import RightArea from "views/room/bottom/components/RightArea";
import {getSelectedChoiceCard, getSelectedPlayCard} from "domains/card/redux/selectors";

const mapStateToProps = (state: RootState) => ({
    status: getRoomStatus(state),
    selectedChoiceCard: getSelectedChoiceCard(state),
    selectedPlayCard: getSelectedPlayCard(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            replaceAction,
            keepAction,
            leaveAction,
            playAction,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RightArea)
