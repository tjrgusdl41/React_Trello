import { red } from "@material-ui/core/colors";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div` /*보드 회색 색갈의 의 카드*/
  width:300px;
  padding-top:10px ; 
  padding: 10px 0px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display:flex;
  flex-direction:column;  /*아이템들이 세로로정렬됨*/
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
interface IAreaProps{
  isDraggingOver:boolean; //Draggable 이 도착했는가?
  draggingFromThis:boolean; //Draggable 이 떠났는가?
}
const Area = styled.div<IAreaProps>`
padding: 20px;
flex-grow:1;
background-color: ${props => props.isDraggingOver ? "#dfe6e9" : props.draggingFromThis ? "#b2bec3" : "transparent" /*부모색받아옴*/} ; /*props들 받아와서 Draggable 가 도착했는 area를 핑크색으로바꿔주고 Draggable이 떠난자리를 빨간색 노란색으로바꿔준다*/
transition: background-color 0.3s ease-in-out;
` 
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
    <Droppable droppableId={boardId}>
      {(magic,info) => (
          <Area isDraggingOver={info.isDraggingOver} draggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} index={index} toDo={toDo} />
          ))}
          {magic.placeholder}
          </Area>
      )}
      </Droppable>
      </Wrapper>
  );
}
export default Board;