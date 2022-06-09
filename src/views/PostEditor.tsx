import styled from "styled-components";
import { colors } from "../assets/styles/colors";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";
import { MainButton } from "../components/MainButton";

const Editor = styled.div`
  width: 530px;
  padding-top: 20px;
  border-radius: 20px;
  border: 1px solid ${colors.blue_green};
  background-color: #fff;
`;

const EditorTitle = styled.h2`
  text-align: center;
  font-family: "Gilroy-B", sans-serif;
  font-size: 24px;
  line-height: 30px;
  color: ${colors.graphite_5};
  margin-bottom: 20px;
`;

const Post = styled.div`
  padding: 0 20px 20px;
  height: 550px;
  overflow-y: auto;
`;

const PostTitle = styled.h3`
  font-family: "Gilroy-B", sans-serif;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
`;

const PostText = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-indent: 10px;
`;

const Selector = styled.div`
  padding: 20px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);
`;

const SelectorTitle = styled.p`
  text-align: center;
  font-family: "Open Sans";
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: ${colors.graphite_6};
`;

const SelectorSubtitle = styled.p`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  color: ${colors.graphite_5};
  margin-bottom: 5px;
`;

const SelectorRow = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 15px;
`;

const SelectorItem = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-right: 10px;
`;

const SelectorItemText = styled.p`
  text-decoration: underline;
  color: ${colors.graphite_4};
  white-space: nowrap;
`;

const Btn = styled(Button)`
  display: none;
  margin: 0 auto;
  height: 1000px;
`;

const PostEditor = () => {
  return (
    <Editor>
      <EditorTitle>DIRECT EMAIL FORWARDING</EditorTitle>
      <Post>
        <PostTitle>
          Canada posts significant jobs gains as COVID restrictions lift
        </PostTitle>
        <PostText>
          Ac, elit consectetur convallis nibh venenatis. Mauris tellus,
          imperdiet tellus vitae dictum accumsan faucibus blandit. Sapien,
          cursus lobortis ut ut egestas elit turpis ut. Elit turpis tristique
          vestibulum tortor pulvinar faucibus sed gravida nam. Sodales habitant
          curabitur morbi varius lectus rutrum velit scelerisque. Mauris sapien
          placerat est tempor, tempus. Nam nunc eu nunc odio. Sociis nec tellus
          libero suscipit dignissim nibh elementum lectus non. Integer arcu sed
          facilisi eget. Laoreet mauris eu tempus sit facilisis tempus volutpat
          velit. Pellentesque imperdiet tortor et est. Ultrices massa purus
          nulla egestas egestas vel semper augue cursus. Vestibulum ipsum nisl,
          aliquet nunc, sit nec lacinia eget non. Sociis fermentum, pretium
          tristique nisl nam in facilisis. Massa accumsan commodo risus sit
          posuere purus mattis diam. Dui faucibus pellentesque cras massa
          gravida massa. Eget orci a, orci congue enim diam, lorem arcu.
          Condimentum viverra nunc risus facilisi etiam amet diam congue.
        </PostText>
      </Post>
      <Selector>
        <SelectorTitle>Select clients</SelectorTitle>
        <SelectorSubtitle>All clients</SelectorSubtitle>
        <SelectorRow>
          <SelectorItem>
            <Checkbox
              checked={false}
              disabled={false}
              setIsCheckedCreate={(val: any) => console.log(val)}
            />
            <SelectorItemText>Client Name 1</SelectorItemText>
          </SelectorItem>
          <SelectorItem>
            <Checkbox
              checked={false}
              disabled={false}
              setIsCheckedCreate={(val: any) => console.log(val)}
            />
            <SelectorItemText>Client Name 1</SelectorItemText>
          </SelectorItem>
          <SelectorItem>
            <Checkbox
              checked={false}
              disabled={false}
              setIsCheckedCreate={(val: any) => console.log(val)}
            />
            <SelectorItemText>Client Name 1</SelectorItemText>
          </SelectorItem>
        </SelectorRow>
        <SelectorSubtitle>Suggested clients</SelectorSubtitle>
        <SelectorRow>
          <SelectorItem>
            <Checkbox
              checked={false}
              disabled={false}
              setIsCheckedCreate={(val: any) => console.log(val)}
            />
            <SelectorItemText>Client Name 1</SelectorItemText>
          </SelectorItem>
          <SelectorItem>
            <Checkbox
              checked={false}
              disabled={false}
              setIsCheckedCreate={(val: any) => console.log(val)}
            />
            <SelectorItemText>Client Name 1</SelectorItemText>
          </SelectorItem>
          <SelectorItem>
            <Checkbox
              checked={false}
              disabled={false}
              setIsCheckedCreate={(val: any) => console.log(val)}
            />
            <SelectorItemText>Client Name 1</SelectorItemText>
          </SelectorItem>
        </SelectorRow>
        <MainButton wide={true} centered={true}>Send</MainButton>
      </Selector>
    </Editor>
  );
};

export default PostEditor;
