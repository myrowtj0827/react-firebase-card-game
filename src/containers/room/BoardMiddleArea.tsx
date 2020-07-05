import {RootState} from "MyTypes"
import {bindActionCreators, Dispatch} from "redux"
import {connect} from "react-redux"
import {getChoiceCardsVisible} from "domains/card/redux/selectors";
import {
    getBottomAreaData,
    getRoomDecks,
    getSingleReplaceCardVisible,
    getVictoryCards,
} from "domains/room/redux/selectors";
import {
    trickAction,
    supposeReplaceAction,
    supposePlayAction,
} from 'domains/room/redux/actions'
import {setSelectedChoiceCard} from "domains/card/redux/actions";
import BoardMiddleArea from "views/room/middle/components/board-area/BoardMiddleArea";

const mapStateToProps = (state: RootState) => ({
    choiceCardsVisible: getChoiceCardsVisible(state),
    decks: getRoomDecks(state),
    bottomAreaData: getBottomAreaData(state),
    singleReplaceCardVisible: getSingleReplaceCardVisible(state),
    victoryCards: getVictoryCards(state),
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            setSelectedChoiceCard,
            trickAction,
            supposeReplaceAction,
            supposePlayAction,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BoardMiddleArea)
