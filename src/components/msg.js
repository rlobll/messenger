import styled from "styled-components";
import { IMsg } from "./timeline";
import { auth, db, storage } from "../routes/firebase.ts";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 0fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-family: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`;

export default function Msg({ username, photo, msg, userId, id }: IMsg) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm("이 메세지를 삭제하겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "msg", id));
      if (photo) {
        const photoRef = ref(storage, `msgs/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{msg}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
