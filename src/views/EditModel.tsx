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
import { TextInput } from "../components/TextInput";

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
  height: 810px;
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

const StyledInput = styled(TextInput)`
  width: calc(100% - 60px);
  margin: 0 auto 10px;
  & input {padding: 8px 20px;}
`

//Templates
const dash = "___ ";

const template0 = (post: IPost) => {
  return ''
}

const template1 = (post: IPost) => {
  const tempStartDate = post.start_date ? post.start_date : dash
  const tempComittee = post.committee ? `<strong>${post.committee}</strong>` : dash
  const tempLocation = post.location ? post.location : dash
  const tempSessionItems = Array.isArray(post.cmt_session_items) ? post.cmt_session_items.map(i => i.name).join(', ') : dash
  //files
  const filesKeys = post.files ? Object.keys(post.files) : null
  const tempFiles = filesKeys ? filesKeys.map(key => `<a href=${post.files[key]} target="_blank">${key}</a>`).join(', ') : dash
  //result
  return `שלום רב,<br>
  ביום ${tempStartDate} יתקיים דיון בוועדת ${tempComittee} בנושא:  ${tempSessionItems} <br>
  הדיון יתקיים ב  ${tempLocation} <br>
  להלן חומרי רקע: ${tempFiles}` 
}

const template2 = (post: IPost) => {
  const tempDateTime = post.datetime_knesset ? post.datetime_knesset : dash
  const tempArticle = post.article_by_line ? post.article_by_line : dash
  const tempPageContent = post.pulished_page_content ? post.pulished_page_content : dash
  const tempFiles = post.files ? `<a href=${post.files}>Files</a>` : dash


  return `שלום רב,
  להלן הודעה לעיתונות מדיון שהתקיים ב – (${tempDateTime}) ב ${tempArticle}<br>
  <br>
  ${tempPageContent}<br>
  לינק לידיעה: ${tempFiles}
  `
}

const template3 = (post: IPost) => {
  const tempStartDate = post.start_date ? post.start_date : dash
  const tempItems = post.cmt_session_items ? post.cmt_session_items.map((item:any) => item.name).join(', ') : dash
  const filesKeys = post.files ? Object.keys(post.files) : null
  const tempFiles = filesKeys ? filesKeys.map(key => `<a href=${post.files[key]} target="_blank">${key}</a>`).join(', ') : dash
  return `שלום רב, <br>
  מצ"ב פרוטוקול דיון שהתקיים ב – (${tempStartDate}) בוועדת committee  בנושאים: <br>
  ${tempItems} <br>
  קובץ: ${tempFiles}
  `
}

const template4 = (post: IPost) => {
  
  const tempUpdatedDate = post.last_updated_date ? post.last_updated_date : dash
  const tempTitle = post.title ? post.title : null
  const tempInitiators = post.initiators ? post.initiators.map((i: any) => `${i.first_name} ${i.last_name}`).join(', ') : dash
  const tempSummaryLaw = (post.summary_law && typeof post.summary_law === 'string') ? post.summary_law : dash
  const filesKeys = post.files ? Object.keys(post.files) : null
  const tempFiles = filesKeys ? filesKeys.map(key => `<a href=${post.files[key]} target="_blank">${key}</a>`).join(', ') : dash
  console.log(tempFiles)
  return `שלום רב,
  היום, date(${tempUpdatedDate})  הצעות החוק status: <br>
  פ/2321 – ${tempTitle} של ח"כ ${tempInitiators} <br>
  תקציר הצעת החוק: ${tempSummaryLaw} <br>
  שם הח"כ המציע : ${tempInitiators} <br>
  קובץ מלא של הצעת החוק: <br>
  ${tempFiles}
  `
}

const template5 = (post: IPost) => {
  return `template5`
}

const template6 = (post: IPost) => {
  return `template6`
}


const template7 = (post: IPost) => {
  return `template7`
}

const template8 = (post: IPost) => {
  return `template8`
}

const template9 = (post: IPost) => {
  return `template9`
}

const template10 = (post: IPost) => {
  return `template10`
}

const template11 = (post: IPost) => {
  return `template11`
}

const template12 = (post: IPost) => {
  return `template12`
}

const template13 = (post: IPost) => {
  return `template13`
}

const template14 = (post: IPost) => {
  return `template14`
}

const template15 = (post: IPost) => {
  return `template15`
}

const template16 = (post: IPost) => {
  return `template16`
}

const template17 = (post: IPost) => {
  return `template17`
}


// Templates Object
const templates = {
  options: [
    { item: '', value: 0, emailTheme: '' },
    { item: '1כנסת: הפצת לו"ז לעדכון בודד', value: 1 },
    { item: '2כנסת: הודעה לעיתונות', value: 2 },
    { item: '3כנסת: פרוטוקול דיוני ועדות', value: 3 },
    { item: '4עדכון מהכנסת – הצעות חוק שהונחו לדיון ', value: 4 },
    { item: '5כנסת: שאילתות', value: 5 },
    { item: '6כנסת: הצעות לסדר יום', value: 6 },
    { item: '7כנסת: פרוטוקולים', value: 7 },
    { item: '8כנסת: דיון מהיר', value: 8 },
    { item: '9ישיבת ממשלה – סדר יום', value: 9 },
    { item: '10ממשלה: סיכום ישיבת ממשלה', value: 10 },
    { item: '11ממשלה: סדר יום ועדת שרים לענייני חקיקה', value: 11 },
    { item: '12ממשלה: ועדת שרים לענייני חקיקה החלטות- שליחת החלטה פרטנית', value: 12 },
    { item: '13ממשלה: תזכיר חוק', value: 13 },
    { item: '14ממשלה: חקיקת משנה – קובץ תקנות', value: 14 },
    { item: '15ממשלה: חקיקת משנה - קובץ התקנות – שיעורי מכס, מס קניה ותשלומי חובה', value: 15 },
    { item: '16ממשלה: חקיקת משנה – קובץ תקנות חיקוקי שלטון מקומי', value: 16 },
    { item: '17ממשלה: עדכוני חקיקה – ילקוט הפרסומים', value: 17 },
  ],
  0: template0,
  1: template1,
  2: template2,
  3: template3,
  4: template4,
  5: template5,
  6: template6,
  7: template7,
  8: template8,
  9: template9,
  10: template10,
  11: template11,
  12: template12,
  13: template13,
  14: template14,
  15: template15,
  16: template16,
  17: template17,
}



interface IProps {
  post: IPost;
}

const EditModel = ({ post }: IProps) => {
  const { t } = useTranslation();
  //Templates Dropdown
  const [template, setTemplate] = useState('');
  //Email theme
  const [emailTheme, setEmailTheme] = useState('')
  //Text Editor
  const [text, setText] = useState("");
  // All Clients (dropdown)
  const { clients } = useClientsState();
  const { onGetClients } = useClientsActions();
  const [clientsList, setClientsList] = useState(" ");
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


  //Fetch all clients list
  useEffect(() => {
    console.log(post);
    onGetClients();
  }, []);

  const handleChangeTemplate = (val: string) => {
    //@ts-ignore
    setText(templates[val](post))
    setTemplate(val)
  }

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
            onSelect={(e) => handleChangeTemplate(e)}
            value={template}
            options={templates.options}
            label={t("emails_content-formats")}
          />

          <StyledInput value={emailTheme} onChange={(val) => setEmailTheme(val)} placeholder={t('email_theme')} label={t('email_theme')}/>

          <SunEditor
            setDefaultStyle="font-size: 20px;"
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
