import styled from "styled-components";
import { Title } from "../components/Title";
import { Dropdown } from "../components/Dropdown";
import { colors } from "../assets/styles/colors";
import { Checkbox } from "../components/Checkbox";
import { MainButton } from "../components/MainButton";
import { useTranslation } from "react-i18next";
import { IPost } from "../store/posts";
import { useEffect, useState } from "react";
import { useClientsActions, useClientsState } from "../store/clients";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const StyledModal = styled.div`
  border-radius: 20px;
  width: 80%;
  background-color: #fff;
  border: 1px solid #c2fffd;
  box-shadow: 0px 8px 25px rgb(0 0 0 / 5%);
`;

const StyledTitle = styled(Title)`
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const TemplatesDropdown = styled(Dropdown)`
  margin: 0px 30px 10px;
  width: calc(100% - 60px);
  margin-top: 25px;
`;

const TextEditor = styled.textarea`
  height: 300px;
  width: 100%;
  overflow-y: auto;
  text-align: right;
  line-height: 1.25;
  resize: none;
`;

const Selector = styled.div`
  padding: 10px 30px;
  background: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 20px 20px;
`;

const SelectorTitle = styled.h3`
  text-align: center;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  color: ${colors.graphite_6};
`;

const SelectorLabel = styled.p`
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 18px;
  line-height: 1.4;
  color: ${colors.graphite_5};
  margin-bottom: 5px;
`;

const ClientBox = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin: 0 10px 20px 0;
`;

const ClientName = styled.p`
  font-family: "Gilroy-R", sans-serif;
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: underline;
  color: ${colors.graphite_4};
`;

const ClientDropdown = styled(Dropdown)`
  margin-bottom: 20px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const InitialPost = styled.div`
  padding: 15px 20px;
  height: 700px;
  overflow-y: auto;
`;

const PostItem = styled.div`
  margin-bottom: 27px;
`;

const Initiators = styled.div`
  margin-bottom: 35px;
`;

const Initiator = styled.div`
  margin-bottom: 10px;
`;

const PostKey = styled.p`
  font-family: Open-Sans;
  font-weight: 700;
  word-break: break-all;
  font-size: 20px;
`;

const PostValue = styled.p`
  font-family: Open-Sans;
  word-break: break-all;
  font-size: 20px;
  margin-bottom: 8px;
`;

const PostLink = styled.a`
  font-family: Open-Sans;
  word-break: break-all;
  color: inherit;
`;

const PostDocLink = styled.a`
  font-weight: 700;
  font-size: 24px;
  text-decoration: none;
  color: ${colors.graphite_5};
`;

//Templates
const dash = "___ ";

const firstTemplate = () => {
  return ' template'
}

// Templates Object
const templates = {
  options: [
    { item: '', value: 0 },
    { item: 'כנסת: הפצת לו"ז לעדכון בודד', value: 1 },
    { item: 'כנסת: הודעה לעיתונות', value: 2 },
    { item: 'כנסת: פרוטוקול דיוני ועדות', value: 3 },
    { item: 'עדכון מהכנסת – הצעות חוק שהונחו לדיון ', value: 4 },
    { item: 'כנסת: שאילתות', value: 5 },
    { item: 'כנסת: הצעות לסדר יום', value: 6 },
    { item: 'כנסת: פרוטוקולים', value: 7 },
    { item: 'כנסת: דיון מהיר', value: 8 },
    { item: 'ישיבת ממשלה – סדר יום', value: 9 },
    { item: 'ממשלה: סיכום ישיבת ממשלה', value: 10 },
    { item: 'ממשלה: סדר יום ועדת שרים לענייני חקיקה', value: 11 },
    { item: 'ממשלה: ועדת שרים לענייני חקיקה החלטות- שליחת החלטה פרטנית', value: 12 },
    { item: 'ממשלה: תזכיר חוק', value: 13 },
    { item: 'ממשלה: חקיקת משנה – קובץ תקנות', value: 14 },
    { item: 'ממשלה: חקיקת משנה - קובץ התקנות – שיעורי מכס, מס קניה ותשלומי חובה', value: 15 },
    { item: 'ממשלה: חקיקת משנה – קובץ תקנות חיקוקי שלטון מקומי', value: 16 },
    { item: 'ממשלה: עדכוני חקיקה – ילקוט הפרסומים', value: 17 },
  ],

  0: () => '',

}



interface IProps {
  post: IPost;
}

const EditModel = ({ post }: IProps) => {
  const { t } = useTranslation();
  //Templates Dropdown
  const [template, setTemplate] = useState("");
  //Email theme
  const [emailTheme, setEmailTheme] = useState('')
  //Text Editor
  const [text, setText] = useState("");
  // All Clients (dropdown)
  const { clients } = useClientsState();
  const { onGetClients } = useClientsActions();
  const [clientsList, setClientsList] = useState(" ");
  //Fetch all clients list
  useEffect(() => {
    console.log(post);
    onGetClients();
  }, []);

  //Selected clients (checkboxes)
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  // Add remove/clients using checkbox
  const selectClient = (client: any) => {
    if (selectedClients.includes(client.id)) {
      const index = selectedClients.indexOf(client.id);
      let newItems = [...selectedClients];
      newItems.splice(index, 1);
      setSelectedClients(newItems);
    }
    if (!selectedClients.includes(client.id)) {
      setSelectedClients((prev) => [...prev, client.id]);
    }
  };

  const keys = Object.keys(post);
  return (
    <StyledModal>
      <Container>
        <InitialPost>
          <StyledTitle>{t("emails_data-from-db")}</StyledTitle>

          {keys.map((key) => {
            // Return cases when key is source link
            if (post[key] && key === "source") {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostLink href={post[key]} target="_blank">
                    {post[key]}
                  </PostLink>
                </PostItem>
              );
            }
            // Return null when key is id(we shouldn't show id)
            if (post[key] && key === "id") {
              return null;
            }
            // Return cases when key is link
            if (post[key] && key === "link") {
              return null;
            }
            // Return cases when key is DOCX
            if (post[key] && key === "docx") {
              return (
                <PostItem key={key}>
                  <PostDocLink href={post[key]} target="_blank">
                    {key}
                  </PostDocLink>
                </PostItem>
              );
            }
            // Return cases when key is PDF
            if (post[key] && key === "pdf") {
              return (
                <PostItem key={key}>
                  <PostDocLink href={post[key]} target="_blank">
                    {key}
                  </PostDocLink>
                </PostItem>
              );
            }
            // Return cases when key is XLS
            if (post[key] && key === "xls") {
              return (
                <PostItem key={key}>
                  <PostDocLink href={post[key]} target="_blank">
                    {key}
                  </PostDocLink>
                </PostItem>
              );
            }
            // Cases when key is cmt_session_items array
            if (post[key] && key === "cmt_session_items") {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  {post[key].map((item: any, index: number) => (
                    <PostValue key={index}>{item.name}</PostValue>
                  ))}
                </PostItem>
              );
            }
            // Cases when key is plenum_session_items array
            if (post[key] && key === "plenum_session_items") {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  {post[key].map((item: any, index: number) => (
                    <PostValue key={index}>{item.name}</PostValue>
                  ))}
                </PostItem>
              );
            }
            // Cases when key is initiator object
            if (post[key] && key === "initiator") {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostValue>
                    {post[key].first_name} {post[key].last_name}
                  </PostValue>
                  <PostValue>{post[key].email}</PostValue>
                </PostItem>
              );
            }
            // Cases when key is initiators array
            if (post[key] && key === "initiators") {
              const list = post[key].map((initiator: any, index: number) => {
                return (
                  <Initiator key={index}>
                    <PostValue>
                      {initiator.first_name} {initiator.last_name}
                    </PostValue>
                    <PostValue>{initiator.email}</PostValue>
                  </Initiator>
                );
              });
              return (
                <Initiators>
                  <PostKey>{t(key)}</PostKey>
                  {list}
                </Initiators>
              );
            }
            // Return cases when value is primitive
            if (
              (post[key] && typeof post[key] === "string") ||
              typeof post[key] === "number"
            ) {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostValue>{post[key]}</PostValue>
                </PostItem>
              );
            }
            //Files
            if (post[key] && key === "files") {
              let files = Object.keys(post[key]);
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostValue>Files</PostValue>
                </PostItem>
              );
            }
          })}
        </InitialPost>

        <div>
          <StyledTitle>{t("emails_edit-title")}</StyledTitle>

          <TemplatesDropdown
            placeholder=""
            onSelect={(e) => setTemplate(e)}
            value={template}
            options={templates.options}
            label={t("emails_content-formats")}
          />

          <SunEditor
            lang="en"
            defaultValue={""}
            setContents={text}
            height="350px"
            autoFocus={true}
            onChange={(val) => setText(val)}
            setOptions={{
              buttonList: [
                ["bold", "underline", "italic", "list", "align", "fontSize"],
              ],
            }}
          />
          <Selector>
            <SelectorTitle>{t("emails_select-clients")}</SelectorTitle>
            {post.clients && post.clients.length > 0 && (
              <SelectorLabel>{t("emails_suggested-clients")}</SelectorLabel>
            )}
            {post.clients &&
              post.clients.map((client: any) => {
                return (
                  <ClientBox>
                    <Checkbox
                      checked={false}
                      setIsCheckedCreate={() => selectClient(client)}
                    />
                    <ClientName>{client.name}</ClientName>
                  </ClientBox>
                );
              })}
            <ClientDropdown
              placeholder=""
              isMultiSelect={true}
              onSelect={(e) => setClientsList(e)}
              value={clientsList}
              options={clients.map((c) => ({ item: c.name, value: c.id }))}
              label={t("emails_clients-label")}
              isReversed={true}
            />
            <BtnBox>
              <MainButton color="blue">{t("emails_edit-next")}</MainButton>
              <MainButton color="orange">{t("emails_edit-send")}</MainButton>
            </BtnBox>
          </Selector>
        </div>
      </Container>
    </StyledModal>
  );
};

export default EditModel;
