import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
interface ICard{
  isDragging:boolean
}
const Card = styled.div<ICard>`  /*드래그가 가능한 카드*/
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow:${props=> props.isDragging ? "0px 0px 25px rgba(0,0,0,0.5)":"none"};
`;

interface IDragabbleCardProps { //Board에서주는 프롭스들을정의해놓은타입
  toDoId: number;
  toDoText: string;
  index: number;
} 

function DragabbleCard({ toDoId,toDoText,index }: IDragabbleCardProps) {
  // console.log(toDo, "has been rendered");
  return (
    <Draggable draggableId={toDoId.toString()} index={index}>
      {(magic,snapshot) => ( //1번째인자에 DraggableProvided 받아오고 두번째 인자에DraggableStateSnapshot을받아온다
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);