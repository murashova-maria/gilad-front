import styled from "styled-components";
import { Title } from "../components/Title";
import { Dropdown } from "../components/Dropdown";
import { colors } from "../assets/styles/colors";
import { Checkbox } from "../components/Checkbox";
import { MainButton } from "../components/MainButton";
import { useTranslation } from "react-i18next";

const StyledModal = styled.div`
  border-radius: 20px;
  width: 80%;
  background-color: #fff;
  border: 1px solid #C2FFFD;
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

const DirectLink = styled.a`
  color: #000;
  margin-left: 35px;
`;

const TemplatesDropdown = styled(Dropdown)`
  margin: 0px 30px 10px;
  width: calc(100% - 60px);
  margin-top: 25px;
`;

const Content = styled.div`
  height: 300px;
  overflow-y: auto;
  text-align: right;
  line-height: 1.25;
  margin: 0 30px;
  & > h2 {
    font-size: 24px;
    margin-bottom: 10px;
    font-family: "Gilroy-R", sans-serif;
  }
  & > p {
    margin-bottom: 30px;
  }
  & span {
    font-family: "Gilroy-B", sans-serif;
  }
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
  padding: 0 20px;
`;

const PostTitle = styled.p`
  font-family: "Gilroy-B";
  font-size: 30px;
  margin-bottom: 10px;
`;

const PostText = styled.p`
  font-size: 20px;
`;

const EditModel = (props: any) => {
  const {t} = useTranslation()
  return (
    <StyledModal>
      <Container>
        <InitialPost>
          <StyledTitle>{t('emails_data-from-db')}</StyledTitle>
          <PostTitle>יתקיים דיון בוועדת</PostTitle>
          <PostText>
            שלום רב, ביום _ ה - __ בשעה ___ יתקיים דיון בוועדת __________בנושא:
            (נושא הדיון) לצרף חומרי רקע המצויים בפורטל הוועדה( הצ"ח, ניירות
            עמדה, מצגות) חשוב לפרט בדיון על סטטוס הצ"ח – כלומר באיזה שלב הכנה
            נמצאת– קריאה טרומית /ראשונה/ שנייה ושלישית. כמו – כן יש לפרט אודות
            תמצית התיקון של הצ"ח, הסבר מדיון האחרון בעניינה ( באם פורסם פרוטוקול
            הדיון) או ע"ב הודעה לעיתונות. לטובת צירוף חומר רקע אשר מצוי בפורטל
            הוועדה, יש לשמור את הקבצים בשם הוועדה, תאריך ונושא. דוגמא: ו. כלכלה
            15.11.21 – הצ"ח ביטוח לאומי ( הוראת שעה) התשפ"א 2021, על מנת להקל על
            הלקוח ועלייך בעת איתור ושיוך המידע.
          </PostText>
        </InitialPost>

        <div>
          <StyledTitle>{t('emails_edit-title')}</StyledTitle>
          <DirectLink href="#">{t('emails_direct-link')}</DirectLink>

          <TemplatesDropdown
            placeholder=""
            onSelect={(e) => console.log(e)}
            value=" "
            options={[
              { item: " ", value: " " },
              { item: "First", value: "first" },
              { item: "First", value: "third" },
              { item: "First", value: "fourth" },
            ]}
            label={t('emails_content-formats')}
          />
          <Content>
            <h2>
              <span>כותרת: עדכון מהכנסת – ועדת</span>
            </h2>
            <p>
              שלום רב, ביום _ ה - __ בשעה ___ יתקיים דיון בוועדת
              __________בנושא: (נושא הדיון) לצרף חומרי רקע המצויים בפורטל
              הוועדה( הצ"ח, ניירות עמדה, מצגות) חשוב לפרט בדיון על סטטוס הצ"ח –
              כלומר באיזה שלב הכנה נמצאת– קריאה טרומית /ראשונה/ שנייה ושלישית.
              כמו – כן יש לפרט אודות תמצית התיקון של הצ"ח, הסבר מדיון האחרון
              בעניינה ( באם פורסם פרוטוקול הדיון) או ע"ב הודעה לעיתונות. לטובת
              צירוף חומר רקע אשר מצוי בפורטל הוועדה, יש לשמור את הקבצים בשם
              הוועדה, תאריך ונושא. דוגמא: ו. כלכלה 15.11.21 – הצ"ח ביטוח לאומי (
              הוראת שעה) התשפ"א 2021, על מנת להקל על הלקוח ועלייך בעת איתור
              ושיוך המידע.
            </p>
            <h2>
              {" "}
              <span> :הפצת לו"ז הוועדות</span> – יותר מדיון אחד
            </h2>
            <p>
              כדאי לנסות לרכז את לו"ז הדיונים בוועדות במייל אחד לכל לקוח תוך
              שמירה על סדר כרונולוגי (כלומר – קודם את כל הדיונים של יום שני,
              לאחר מכן יום, שלישי, רביעי וכך הלאה).
            </p>
            <p>
              שלום רב, ביום _ ה - __ בשעה ___ יתקיים דיון בוועדת
              __________בנושא: (נושא הדיון) לצרף חומרי רקע המצויים בפורטל
              הוועדה( הצ"ח, ניירות עמדה, מצגות) חשוב לפרט בדיון על סטטוס הצ"ח –
              כלומר באיזה שלב הכנה נמצאת– קריאה טרומית /ראשונה/ שנייה ושלישית.
              כמו – כן יש לפרט אודות תמצית התיקון של הצ"ח, הסבר מדיון האחרון
              בעניינה ( באם פורסם פרוטוקול הדיון) או ע"ב הודעה לעיתונות. לטובת
              צירוף חומר רקע אשר מצוי בפורטל הוועדה, יש לשמור את הקבצים בשם
              הוועדה, תאריך ונושא. דוגמא: ו. כלכלה 15.11.21 – הצ"ח ביטוח לאומי (
              הוראת שעה) התשפ"א 2021, על מנת להקל על הלקוח ועלייך בעת איתור
              ושיוך המידע.
            </p>
            <p>
              שלום רב, ביום _ ה - __ בשעה ___ יתקיים דיון בוועדת
              __________בנושא: (נושא הדיון) לצרף חומרי רקע המצויים בפורטל
              הוועדה( הצ"ח, ניירות עמדה, מצגות) חשוב לפרט בדיון על סטטוס הצ"ח –
              כלומר באיזה שלב הכנה נמצאת– קריאה טרומית /ראשונה/ שנייה ושלישית.
              כמו – כן יש לפרט אודות תמצית התיקון של הצ"ח, הסבר מדיון האחרון
              בעניינה ( באם פורסם פרוטוקול הדיון) או ע"ב הודעה לעיתונות. לטובת
              צירוף חומר רקע אשר מצוי בפורטל הוועדה, יש לשמור את הקבצים בשם
              הוועדה, תאריך ונושא. דוגמא: ו. כלכלה 15.11.21 – הצ"ח ביטוח לאומי (
              הוראת שעה) התשפ"א 2021, על מנת להקל על הלקוח ועלייך בעת איתור
              ושיוך המידע.
            </p>{" "}
            <p>
              שלום רב, ביום _ ה - __ בשעה ___ יתקיים דיון בוועדת
              __________בנושא: (נושא הדיון) לצרף חומרי רקע המצויים בפורטל
              הוועדה( הצ"ח, ניירות עמדה, מצגות) חשוב לפרט בדיון על סטטוס הצ"ח –
              כלומר באיזה שלב הכנה נמצאת– קריאה טרומית /ראשונה/ שנייה ושלישית.
              כמו – כן יש לפרט אודות תמצית התיקון של הצ"ח, הסבר מדיון האחרון
              בעניינה ( באם פורסם פרוטוקול הדיון) או ע"ב הודעה לעיתונות. לטובת
              צירוף חומר רקע אשר מצוי בפורטל הוועדה, יש לשמור את הקבצים בשם
              הוועדה, תאריך ונושא. דוגמא: ו. כלכלה 15.11.21 – הצ"ח ביטוח לאומי (
              הוראת שעה) התשפ"א 2021, על מנת להקל על הלקוח ועלייך בעת איתור
              ושיוך המידע.
            </p>
          </Content>
          <Selector>
            <SelectorTitle>{t('emails_select-clients')}</SelectorTitle>
            <SelectorLabel>{t('emails_suggested-clients')}</SelectorLabel>
            <ClientBox>
              <Checkbox
                checked={false}
                setIsCheckedCreate={(value) => console.log(value)}
              />
              <ClientName>Client Name 1</ClientName>
            </ClientBox>
            <ClientBox>
              <Checkbox
                checked={false}
                setIsCheckedCreate={(value) => console.log(value)}
              />
              <ClientName>Client Name 1</ClientName>
            </ClientBox>
            <ClientBox>
              <Checkbox
                checked={false}
                setIsCheckedCreate={(value) => console.log(value)}
              />
              <ClientName>Client Name 1</ClientName>
            </ClientBox>
            <ClientBox>
              <Checkbox
                checked={false}
                setIsCheckedCreate={(value) => console.log(value)}
              />
              <ClientName>Client Name 1</ClientName>
            </ClientBox>
            <ClientDropdown
              placeholder=""
              isMultiSelect={true}
              onSelect={(e) => console.log(e)}
              value=" "
              options={[
                { item: " ", value: " " },
                { item: "First", value: "first" },
                { item: "First", value: "third" },
                { item: "First", value: "fourth" },
              ]}
              label={t('emails_clients-label')}
            />
            <BtnBox>
              <MainButton color="blue">{t('emails_edit-next')}</MainButton>
              <MainButton color="orange">{t('emails_edit-send')}</MainButton>
            </BtnBox>
          </Selector>
        </div>
      </Container>
    </StyledModal>
  );
};

export default EditModel;
