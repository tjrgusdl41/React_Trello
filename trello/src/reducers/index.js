import { combineReducers } from "redux"; //여러개의 리듀서를 합쳐주는 역할 // 합쳐진 리듀서를 루트리듀서라 부름
import listsReducer from "./listReducer";
export default combineReducers({
  lists: listsReducer,
});
