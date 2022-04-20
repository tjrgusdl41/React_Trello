import { red } from "@material-ui/core/colors";
import { useRef } from "react";
import { Droppable,Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { Provider } from "react-redux";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
const Wrapper = styled.div<{isDragging:boolean}>` /*보드 회색 색갈의 의 카드*/
  width:300px;
  padding-top:10px ; 
  padding: 10px 0px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display:flex;
  flex-direction:column;  /*아이템들이 세로로정렬됨*/
`;
const Button = styled.button`
  position: absolute;
  top: 6px;
  right: 10px;
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  index: number;
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
const Form = styled.form`
  width:100%;
  input{/** styledcomponents안에있는 요소에 이렇게접근가능 */
    width:100%;
  }
`
interface IForm{
  toDo: string;
}
const Header = styled.div<{isDragging:boolean}>`
  padding-top: 10px;
  border-radius: 5px 5px 0 0;
  transition: background-color 0.2s ease-in-out;
    background-color: ${(props) =>
    props.isDragging ? "#fd965b" : props.theme.boardColor};
  position: relative;
  justify-content: space-between;
`;
const Input = styled.input`
  width: 80%;
  padding: 10px;
  border-style: none;
  border-radius: 5px;
  margin-bottom: 16px;
  outline: none;
  `
function Board({ toDos, boardId ,index}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState)
  const { register, setValue, handleSubmit } = useForm<IForm>(); //setValue("1","2")1의값을 2로만든다
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),//Date.now()만큼 고유한 값은 없다 ㅋㅋ
      text:toDo, 
    }
    setToDos(allBoards => { //이전에있는보드들과 추가한보드로 새로운투두리스트를반환한다
      return{
        ...allBoards, //기존에있던보드와
        [boardId]: [ //입력한보드의
          ...allBoards[boardId], //기존에에있던카드들과
          newToDo //새로운투두를 추가해서
        ] //리턴한다
      }
    })
    setValue("toDo","")
  }
  const onDelete = (boardId: string) => {
    setToDos((allboards) => {
      const boardsList = Object.keys(allboards).filter(
        (board) => board !== boardId
      );
      let boards = {};
      boardsList.map((board) => {
        boards = { ...boards, [board]: allboards[board] };
      })
      localStorage.setItem("boards", JSON.stringify({ ...boards }));
      return { ...boards };
    });
  }
  return (
    <Draggable draggableId={boardId} index={index}>
      {(provided, snapshot) => (
          <Wrapper key={index} ref={provided.innerRef} isDragging={snapshot.isDragging} {...provided.draggableProps}>
      <Header {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
      <Title>{boardId}</Title>
      <Button onClick={()=>onDelete(boardId)}>❌</Button>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input {...register("toDo", { required: true })} type="text" placeholder={`Add ask on ${boardId}`}></Input>
        </Form>
        </Header>
    <Droppable droppableId={boardId}>
      {(magic,info) => (
          <Area isDraggingOver={info.isDraggingOver} draggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} /> /*DroppableBoard(Board)에서 
            DraggableCard(Card)로 props를 전달할 때 todo 객체를 통채로 보내면 위와 같은 에러가 발생할 
            수 있으므로 객체에서 값을 꺼내서 따로따로 보내야 합니다.*/
          ))}
          {magic.placeholder}
          </Area>
      )}
      </Droppable>
      </Wrapper>
      )}
      </Draggable>
  );
}
export default Board;