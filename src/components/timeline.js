import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase.ts";
import Msg from "./msg.js";

export interface IMsg {
  id: string;
  photo?: string;
  msg: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [msg, setMsg] = useState([]);
  // 아래방식으로 알려줬는데 오류가 나타나 위의 방식으로 바꿈
  // const [msg, setMsg] = useState<IMsg[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchMsg = async () => {
      const msgQuery = query(
        collection(db, "msg"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      // const snapshot = await getDocs(msgQuery);
      // const msgs = snapshot.docs.map((doc) => {
      //   const { photo, msg, userId, username, createdAt } = doc.data();
      //   return {
      //     photo,
      //     msg,
      //     userId,
      //     username,
      //     createdAt,
      //     id: doc.id,
      //   };
      // });
      unsubscribe = await onSnapshot(msgQuery, (snapshopt) => {
        const msgs = snapshopt.docs.map((doc) => {
          const { photo, msg, userId, username, createdAt } = doc.data();
          return {
            photo,
            msg,
            userId,
            username,
            createdAt,
            id: doc.id,
          };
        });
        setMsg(msgs);
      });
    };
    fetchMsg();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {msg.map((msg) => (
        <Msg key={msg.id} {...msg} />
      ))}
    </Wrapper>
  );
}
