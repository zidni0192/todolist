import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
function* fetchUser(action) {
    try {
        // do api call
        const data = yield call(fetchData);
        yield put({ type: "USER_FETCH_SUCCEEDED", user: data });
    } catch (e) {
        console.log(e);
    }
}

function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

async function fetchData() {
    try {
        const response = await fetch("https://randomuser.me/api");
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}
export default mySaga