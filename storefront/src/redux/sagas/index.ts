import { fork } from "redux-saga/effects";
import ConfigSaga from "./ConfigSaga";

export default function* rootSaga() {
  yield fork(ConfigSaga);
}
