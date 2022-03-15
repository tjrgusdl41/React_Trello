import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer);

export default store;
//스토어에는 프로젝트의 상태들이 담겨있고 리듀서를 통해 상태를 업데이트 시킨다.
