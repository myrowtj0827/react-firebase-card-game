import {all} from "redux-saga/effects"
import home from 'domains/home/sagas'
import room from 'domains/room/sagas'

export default function* rootSaga() {
    yield all([
        home(),
        room(),
    ])
}
