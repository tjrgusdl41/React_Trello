import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
const Wrapper = styled.div`
  width:100vw;
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  justify-content: center;
  align-items: flex-start;
  display: flex;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult ) => {
    console.log(info); 
    const { destination, draggableId, source } = info; 
    if (destination?.droppableId === source.droppableId) {//도착지의 droppableId(BOX이름) 이랑 출발한droppableId 가 같으면 
      //똑같은 박스에서 움직이는 로직관리
      setToDos((allBoards) => { //투두에서 모든 박스들을 받아와서
        const boardCopy = [...allBoards[destination?.droppableId]]; //전체보드 객체안의 현재보드를 전체복사한다
        boardCopy.splice(source.index, 1);//시작점의 index에 1개요소 제거함.
        boardCopy.splice(destination?.index, 0, draggableId);//도착점의 index에 0개요소를 draggableId(즉 이동시킨 카드로 바꿈)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      //cross board movement
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;