import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";

// -- action
import { Actions } from "../reducers";
const { ConfigActions } = Actions;

//-- Call Api
import { ConfigApi } from "../api";

//-- Constants
import { NameStorage } from "../../constants";

//-- Utils
import { Base } from "../../utils";

//-- Config
import { Themes } from "../../config";

function* fetchConfigSaga(action: any) {
  try {
    let { payload } = action;
    let res = yield call(ConfigApi.getConfig);
    if (res?.data) {
      yield put(ConfigActions.CONFIG_SUCCESS(res?.data));
    }
  } catch (err) {
    let { message } = err;
    console.log("[Error - Config]", err);
    yield put(ConfigActions.CONFIG_FAILED(message));
  }
}

function* fetchThemeSaga(action: any) {
  try {
    let {
      payload: { theme },
    } = action;

    if (!theme) {
      let dataTheme = yield Base.GetItemStorage(
        `persist:${NameStorage.Root}`,
        "config"
      );

      if (dataTheme) {
        dataTheme = dataTheme["themes"];
        dataTheme = yield Base.isEmptyObject(dataTheme);
        if (dataTheme) return;
      }

      theme = Themes[0];
      return yield put(ConfigActions.THEMES_SUCCESS(theme));
    }

    theme = yield Base.findItemArr(Themes, "key", theme);
    yield put(ConfigActions.THEMES_SUCCESS(theme));
  } catch (err) {
    let { message } = err;
    console.log("[Error - Themes]", err);
    yield put(ConfigActions.THEMES_FAILED(message));
  }
}

export default function* configSaga() {
  yield all([
    takeLatest(ConfigActions.CONFIG_REQUEST, fetchConfigSaga),
    takeLatest(ConfigActions.THEMES_REQUEST, fetchThemeSaga),
  ]);
}
