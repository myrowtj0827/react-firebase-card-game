import {RootState} from "MyTypes"
import {bindActionCreators, Dispatch} from "redux"
import {connect} from "react-redux"
import {
    cardReplaceClickAction,
    playAction,
} from 'domains/room/redux/actions'
import {cardPlayClickAction} from "domains/card/redux/actions";
import {
    getChoiceCardsVisible,
    getSelectedPlayCard,
} from "domains/card/redux/selectors";
import LeftCards from "views/room/bottom/components/LeftCards";

const mapStateToProps = (state: RootState) => ({
    choiceCardsVisible: getChoiceCardsVisible(state),
    selectedPlayCard: getSelectedPlayCard(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            cardReplaceClickAction,
            cardPlayClickAction,
            playAction,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LeftCards)
