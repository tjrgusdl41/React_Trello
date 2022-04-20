import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import AddBoard from "./Components/AddBoard";
import Board from "./Components/Board";
import RemoveBoard from "./Components/RemoveBoard";
const Wrapper = styled.div`
  width:100vw;
  display: flex;
  max-width: 1500px;
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
  const onDragEnd = (info: DropResult) => {
        console.log(info); 
    const { destination, draggableId, source } = info; 
    //보드순서옮길떄
    if (!destination) return;
     if (source.droppableId === "Boards") {
      setToDos((allBoards) => {
        const boardsList = Object.keys(allBoards);
        const taskObj = boardsList[source.index];
        boardsList.splice(source.index, 1);
        boardsList.splice(destination.index, 0, taskObj);
        let boards = {};
        boardsList.map((board) => {
          boards = { ...boards, [board]: allBoards[board] };
        });
        localStorage.setItem(
          "boards",
          JSON.stringify({
            ...boards,
          })
        );
        return { ...boards };
      });
      return;
    }
    if (destination?.droppableId === source.droppableId) {//도착지의 droppableId(BOX이름) 이랑 출발한droppableId 가 같으면 
      //똑같은 박스에서 움직이는 로직관리
      setToDos((allBoards) => { //투두에서 모든 박스들을 받아와서
        const boardCopy = [...allBoards[destination?.droppableId]]; //전체보드 객체안의 현재보드를 전체복사한다
        const taskObj = boardCopy[source.index]; //옮기려고하는 to do object전체를 가져다줌
        boardCopy.splice(source.index, 1);//시작점의 index에 1개요소 제거함.
        boardCopy.splice(destination?.index, 0, taskObj);//도착점의 index에 0개요소를 draggableId(즉 이동시킨 카드로 바꿈)
        return {
          ...allBoards, //이전에가지고있는 보드들과
          [source.droppableId]: boardCopy,//시작점의이름 ex)"todo":bordCopy
          //나머지보드를 반환한다
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      //cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; //시작점 보드
        const destinationBoard = [...allBoards[destination.droppableId]] //도착점보드복사
         const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1); //시작점의 index에 1개요소 제거함.
        destinationBoard.splice(destination?.index, 0, taskObj)//도착점의 index에 0개요소를 draggableId(즉 이동시킨 카드로 바꿈)
        return {
          ...allBoards, //이전보드
          [source.droppableId]: sourceBoard, //출발점의보드
          [destination.droppableId]: destinationBoard, //도착점의보드 모두 리턴
        }
      })
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>    
      <Wrapper>
        <AddBoard />
        <Droppable droppableId="Boards" direction="horizontal" type="BOARD">
          {(provided, snapshot) => (
            <Boards ref={provided.innerRef} {...provided.droppableProps}>
          {Object.keys(toDos).map((boardId,index) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} index={index}/>
          ))}
              {provided.placeholder}
        </Boards>
          )}
        </Droppable>
                  
        {/* <RemoveBoard boardId={"Remove"} /> */}
      </Wrapper>
    </DragDropContext>
  );
}

export default App;