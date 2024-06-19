import styled from "styled-components";
import PostMsgForm from "../components/post-messenger-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  overflow: scroll;
  grid-template-rows: 1fr 5fr;
`;

export default function Home() {
  return (
    <Wrapper>
      <PostMsgForm />
      <Timeline />
    </Wrapper>
  );
}
