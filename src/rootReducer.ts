import { connectRouter } from "connected-react-router"
import { AnyAction, combineReducers } from "redux"
import history from "./history"
import home from 'domains/home/redux/reducers'
import room from 'domains/room/redux/reducers'
import card from 'domains/card/redux/reducers'

// TODO remove <any> later
const rootReducer = combineReducers<any>({
    router: connectRouter(history),
    // Plug in domains' reducers below
    home,
    room,
    card,
});

export default rootReducer
