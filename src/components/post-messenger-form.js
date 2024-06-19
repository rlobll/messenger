import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../routes/firebase.ts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  /* font-size: 14px; */
  color: white;
  background-color: black;
  width: 100%;
  resize: none; //textarea에 나타나는 크기조절 없애는거
  &::placeholder {
    /* font-size: 14px; */
  }
  &:focus {
    outline: none;
    border-color: yellow;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0;
  color: yellow;
  text-align: center;
  border-radius: 20px;
  border: 2px solid yellow;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: yellow;
  /* color: white; */
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostMsgForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  //타입스크립트 구문으로 알려줬는데 자동수정이슈로 위에 일반스크립트문법으로 바꿈 아래코드가 타입스크립트
  //const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsg(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || msg === "" || msg.length > 180) return;
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "msg"), {
        msg,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `msgs/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }
      setMsg("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={msg}
        placeholder="무슨일인가요?"
      />
      <AttachFileButton htmlFor="file">
        {file ? "선택된 사진" : "사진추가하기"}
      </AttachFileButton>
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn type="submit" value={isLoading ? "글 올리는중.." : "올리기"} />
    </Form>
  );
}
