import styled from "styled-components";
import { Title } from "../components/Title";
import { Dropdown } from "../components/Dropdown";
import { colors } from "../assets/styles/colors";
import { Checkbox } from "../components/Checkbox";
import { MainButton } from "../components/MainButton";
import { useTranslation } from "react-i18next";
import { IPost } from "../store/posts";
import React, { useEffect, useMemo, useState } from "react";
import { useClientsState } from "../store/clients";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { TextInput } from "../components/TextInput";
import { usePostsActions } from "../store/posts/hooks";

const StyledModal = styled.div`
  border-radius: 20px;
  width: 80%;
  max-width: 1200px;
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
  & input {
    padding: 8px 20px;
  }
`;

const FileLink = styled.a`
  display: block;
  word-break: break-all;
  margin-bottom: 5px;
`;

//Templates
const dash = "___ ";

const template0 = (post: IPost) => {
  return "";
};

const template1 = (post: IPost) => {
  const tempStartDate = post.start_date ? post.start_date : dash;
  const tempComittee = post.committee
    ? `<strong>${post.committee}</strong>`
    : dash;
  const tempLocation = post.location ? post.location : dash;
  const tempSessionItems = Array.isArray(post.cmt_session_items)
    ? post.cmt_session_items.map((i) => i.name).join(", ")
    : dash;
  //files
  const filesKeys =
    typeof post.files == "object" ? Object.keys(post.files) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: any) => {
          let list = [key];
          post.files[key].forEach((item: any) =>
            list.push(`<a href=${item}>${item}</a>`)
          );
          return list.join("<br>") + "<br>";
        })
        .join("<br>")
    : dash;
  //result
  return `שלום רב,<br>
  ביום ${tempStartDate} יתקיים דיון בוועדת ${tempComittee} בנושא:  ${tempSessionItems} <br>
  הדיון יתקיים ב  ${tempLocation} <br>
  להלן חומרי רקע: ${tempFiles}`;
};

const template3 = (post: IPost) => {
  const tempDateTime = post.datetime_knesset ? post.datetime_knesset : dash;
  const tempArticle = post.article_by_line ? post.article_by_line : dash;
  const tempPageContent = post.pulished_page_content
    ? post.pulished_page_content
    : dash;
  const tempLink = post.link ? `<a href="${post.link}">${post.link}</a>` : dash;
  return `שלום רב,<br>
  להלן הודעה לעיתונות מדיון שהתקיים ב – (${tempDateTime}) ב ${tempArticle}<br>
  <br>
  ${tempPageContent}<br>
  לינק לידיעה: ${tempLink}
  `;
};

const template4 = (post: IPost) => {
  const tempStartDate = post.start_date ? post.start_date : dash;
  const tempItems = post.cmt_session_items
    ? post.cmt_session_items.map((item: any) => item.name).join(", ")
    : dash;
  const tempComittee = post.committee
    ? `<strong>${post.committee}</strong>`
    : dash;
  const filesKeys =
    typeof post.files == "object" ? Object.keys(post.files) : null;

  const tempFiles = filesKeys
    ? filesKeys
        .map((key: any) => {
          let list = [key];
          post.files[key].forEach((item: any) =>
            list.push(`<a href=${item}>${item}</a>`)
          );
          if (key === "פרוטוקול ועדה") return list.join("<br>") + "<br>";
        })
        .join("<br>")
    : dash;
  return `שלום רב, <br>
  מצ"ב פרוטוקול דיון שהתקיים ב – (${tempStartDate}) בוועדת ${tempComittee}  בנושאים: <br>
  ${tempItems} <br>
  קובץ: ${tempFiles}
  `;
};

const template6 = (post: IPost) => {
  const tempUpdatedDate = post.last_updated_date
    ? new Date(post.last_updated_date).toISOString().slice(0, 10)
    : dash;
  const tempTitle = post.title ? post.title : null;
  const tempInitiators = post.initiators
    ? post.initiators
        .map((i: any) => `${i.first_name} ${i.last_name}`)
        .join(", ")
    : dash;
  const tempSummaryLaw =
    post.summary_law && typeof post.summary_law === "string"
      ? post.summary_law
      : dash;
  const tempStatus = post.status ? post.status : dash;

  const filesKeys =
    typeof post.files == "object" ? Object.keys(post.files) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: any) => {
          let list = [key];
          post.files[key].forEach((item: any) =>
            list.push(`<a href=${item}>${item}</a>`)
          );
          return list.join("<br>") + "<br>";
        })
        .join("<br>")
    : dash;
  return `שלום רב,<br>
  היום, ${tempUpdatedDate}  הצעות החוק ${tempStatus}: <br>
  פ/2321 – ${tempTitle} של ח"כ ${tempInitiators} <br>
  תקציר הצעת החוק: ${tempSummaryLaw} <br>
  שם הח"כ המציע : ${tempInitiators} <br>
  קובץ מלא של הצעת החוק: <br>
  ${tempFiles}
  `;
};

const template8 = (post: IPost) => {
  const tempSubmitDate = post.submit_date ? post.submit_date : dash;
  const tempSubcategory = post.subcategory ? post.subcategory : dash;
  const tempGovMinistry = post.gov_ministry ? post.gov_ministry : dash;
  const tempTitle = post.title ? post.title : dash;
  const tempFirstName = post.initiator?.first_name
    ? post.initiator?.first_name
    : dash;
  const tempLastName = post.initiator?.last_name
    ? post.initiator?.last_name
    : dash;
  const filesKeys =
    typeof post.files == "object" ? Object.keys(post.files) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: any) => {
          let list = [key];
          post.files[key].forEach((item: any) =>
            list.push(`<a href=${item}>${item}</a>`)
          );
          return list.join("<br>") + "<br>";
        })
        .join("<br>")
    : dash;
  return `ב${tempSubmitDate} תעלה במליאת הכנסת שאילתה ${tempSubcategory} לשר ה ${tempGovMinistry} בנושא ${tempTitle} של חה"כ ${tempFirstName} ${tempLastName}. <br>
  תוכן שאילתא: <br>
  ${tempFiles}  
  `;
};

const template9 = (post: IPost) => {
  const tempTitle = post.title ? post.title : dash;
  const tempFirstName = post.initiator?.first_name
    ? post.initiator.first_name
    : dash;
  const tempLastName = post.initiator?.last_name
    ? post.initiator.last_name
    : dash;
  const tempSubCategory = post.subcategory ? post.subcategory : dash;
  const tempStatus = post.status ? post.status : dash;
  return `ביום _______ ה – (תאריך) תעלה במליאת הכנסת הצעה לסדר היום בנושא ${tempTitle} של חה"כ ${tempFirstName} ${tempLastName}. <br>
  הצעה ${tempSubCategory},   ${tempStatus}
  `;
};

const template10 = (post: IPost) => {
  const tempStartDate = post.start_date ? post.start_date : dash;
  const tempPlenumItems = Array.isArray(post.plenum_session_items)
    ? post.plenum_session_items.map((item) => item.name).join("<br>")
    : dash;
  const filesKeys =
    typeof post.files == "object" ? Object.keys(post.files) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: any) => {
          let list = [key];
          post.files[key].forEach((item: any) =>
            list.push(`<a href=${item}>${item}</a>`)
          );
          if (key === "פרוטוקול מליאה") return list.join("<br>") + "<br>";
        })
        .join("<br>")
    : dash;
  return `שלום רב, <br>
  מצ"ב קטע מפרוטוקול הדיון שהתקיים ב ${tempStartDate} במליאת הכנסת בנושאים ${tempPlenumItems}. <br>
  ${tempFiles}
  `;
};

const template11 = (post: IPost) => {
  const tempCat = post.cat ? post.cat : dash;
  const tempSubCategory = post.subcategory ? post.subcategory : dash;
  const tempTitle = post.title ? post.title : dash;
  const tempFirstName = post.initiator ? post.initiator.first_name : dash;
  const tempLastName = post.initiator ? post.initiator.last_name : dash;
  const tempStatus = post.status ? post.status : dash;
  const tempCommittee = post.committee
    ? `<strong>${post.committee}</strong>`
    : dash;
  const filesKeys =
    typeof post.files == "object" ? Object.keys(post.files) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: any) => {
          let list = [key];
          post.files[key].forEach((item: any) =>
            list.push(`<a href=${item}>${item}</a>`)
          );
          return list.join("<br>") + "<br>";
        })
        .join("<br>")
    : dash;
  //result
  return `${tempCat} מסוג ${tempSubCategory} בנושא ${tempTitle} של חה"כ  ${tempFirstName} ${tempLastName} ${tempStatus}.<br>
  הדיון ישובץ במהלך השבועיים הקרובים ב ${tempCommittee}.<br>
  ${tempFiles}`;
};

const template12 = (post: IPost) => {
  const tempMeetingDate = post.meeting_date ? post.meeting_date : dash;
  const tempDescription = post.description ? post.description : dash;

  const filesKeys = post.files_govdata ? Object.keys(post.files_govdata) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: string, index: number) => {
          return `${index + 1}. ${key}<br>
      דברי הסבר: ${tempDescription}<br>
      קובץ עם פירוט מלא: <a href= ${post.files_govdata[key]}>${
            post.files_govdata[key]
          }</a>`;
        })
        .join("<br>")
    : dash;

  return `שלום רב, <br>
  ביום ${tempMeetingDate} תתכנס הממשלה לישיבתה השבועית. <br>
  על סדר היום: <br>
  ${tempFiles}
  `;
};

const template13 = (post: IPost) => {
  const tempMeetingDate = post.meeting_date ? post.meeting_date : dash;
  const filesKeys = post.files_govdata ? Object.keys(post.files_govdata) : null;
  const tempFiles = filesKeys
    ? filesKeys
        .map((key: string, index: number) => {
          return `${index + 1}. ${key}<br>
      קובץ עם פירוט מלא: <a href= ${post.files_govdata[key]}>${
            post.files_govdata[key]
          }</a>`;
        })
        .join("<br>")
    : dash;
  return `שלום רב,<br>
  ב${tempMeetingDate} התכנסה הממשלה לישיבתה השבועית.<br>
  להלן החלטותיה: <br>
  ${tempFiles}
  `;
};

const template14 = (post: IPost) => {
  const tempMeetingDate = post.meeting_date ? post.meeting_date : dash;
  const tempLink = post.link ? `<a href="${post.link}">${post.link}</a>` : dash;
  return `שלום רב,<br>
  ביום ראשון ה- ${tempMeetingDate} תתכנס ועדת שרים לענייני חקיקה.<br>
  על סדר היום:<br>
  <br>
  <ul>
    <li>פ/_____ (שם הצעת החוק) של חה"כ ________.</li>
    <li>פ/_____ (שם הצעת החוק) של חה"כ ________.</li>
    <li>פ/_____ (שם הצעת החוק) של חה"כ ________.</li>
    <li>טיוטת חוק שהוכנה ע"י משרד _______ לבצע התאמה של המשרד הרלוונטי למשל: משרד הבריאות/ האנרגיה/ ביטחון פנים</li>
  </ul>
  מצ"ב נוסח הצעות החוק.<br>
  ${tempLink}
  `;
};

const template15 = (post: IPost) => {
  const tempMeetingDate = post.meeting_date ? post.meeting_date : dash;
  return `שלום רב, <br>
  ביום ראשון ה- ${tempMeetingDate} ועדת שרים לענייני חקיקה. <br>
  להלן  החלטותיה: <br>
  פ/_____ (שם הצעת החוק) של חה"כ ________ - הממשלה תמכה בהצעת החוק (במקרה של תמיכה).<br>
  פ/_____ (שם הצעת החוק) של חה"כ ________ - הממשלה התנגדה להצעת החוק (במקרה של התנגדות)
  `;
};

const template16 = (post: IPost) => {
  const tempName = post.name ? post.name : dash;
  const tempMinistry = post.ministry ? post.ministry : dash;
  const tempDescription = post.description ? post.description : dash;
  const tempExpirationDate = post.exp_date ? post.exp_date : dash;
  const tempLink = post.link ? `<a href="${post.link}">${post.link}</a>` : dash;

  return `שלום רב,<br>
  מצ"ב תזכיר חוק ${tempName} שהוכן ע"י ${tempMinistry}.<br>
  תמצית התיקון:<br>
  ${tempDescription}<br>
  ${tempExpirationDate} באמצעות הקישור שלהלן:<br>
  אתר החקיקה הממשלתי - ${tempName} <br>
  ${tempLink}`;
};

const template17 = (post: IPost) => {
  const tempFileName = post.file_name ? post.file_name : dash;
  const tempFileDate = post.file_date ? post.file_date : dash;
  const titlesKeys = post.title_and_page
    ? Object.keys(post.title_and_page)
    : null;
  const tempTitles = titlesKeys
    ? titlesKeys
        .map((key: string) => {
          return `בעמ' ${key} - ${post.title_and_page[key]} <br>`;
        })
        .join("")
    : dash;
  return `שלום רב,<br>
  <br>
  מצ"ב קובץ התקנות מס' ${tempFileName} שפורסם בתאריך ${tempFileDate} בו מפורסמות:<br> 
   ${tempTitles}`;
};

const template18 = (post: IPost) => {
  const tempFileName = post.file_name ? post.file_name : dash;
  const tempFileDate = post.file_date ? post.file_date : dash;
  const titlesKeys = post.title_and_page
    ? Object.keys(post.title_and_page)
    : null;
  const tempTitles = titlesKeys
    ? titlesKeys
        .map((key: string) => {
          return `בעמ' ${key} - ${post.title_and_page[key]} <br>`;
        })
        .join("")
    : dash;
  return `שלום רב,<br>
  <br>
  מצ"ב קובץ התקנות חיקוקי שלטון מקומי מס' ${tempFileName} שפורסם בתאריך ${tempFileDate} בו מפורסמות:<br>
  ${tempTitles}`;
};

const template19 = (post: IPost) => {
  const tempFileName = post.file_name ? post.file_name : dash;
  const tempFileDate = post.file_date ? post.file_date : dash;
  const titlesKeys = post.title_and_page
    ? Object.keys(post.title_and_page)
    : null;
  const tempTitles = titlesKeys
    ? titlesKeys
        .map((key: string) => {
          return `בעמ' ${key} - ${post.title_and_page[key]} <br>`;
        })
        .join("")
    : dash;
  return `שלום רב,<br>
  <br>
  מצ"ב קובץ התקנות שיעורי מכס, מס קניה ותשלומי חובה מס' ${tempFileName} שפורסם בתאריך ${tempFileDate} בו מפורסמות:<br>
   ${tempTitles}`;
};

const template20 = (post: IPost) => {
  const tempFileName = post.file_name ? post.file_name : dash;
  const tempFileDate = post.file_date ? post.file_date : dash;
  const titlesKeys = post.title_and_page
    ? Object.keys(post.title_and_page)
    : null;
  const tempTitles = titlesKeys
    ? titlesKeys
        .map((key: string) => {
          return `בעמ' ${key} - ${post.title_and_page[key]} <br>`;
        })
        .join("")
    : dash;
  return `שלום רב,<br>
  <br>
  מצ"ב ילקוט הפרסומים מס' ${tempFileName} שפורסם בתאריך ${tempFileDate} בו מפורסמות:<br>
  ${tempTitles}
  `;
};

// Templates Object
const templates = {
  options: [
    { item: "", value: 0 },
    {
      item: '1כנסת: הפצת לו"ז לעדכון בודד',
      value: 1,
      tag: "כנסת",
      cat: "ישיבות הוועדות",
    },
    //{ item: "", value: 2 },
    {
      item: "3כנסת: הודעה לעיתונות",
      value: 3,
      tag: "כנסת",
      cat: "הודעות לעיתונות",
    },
    {
      item: "4כנסת: פרוטוקול דיוני ועדות",
      value: 4,
      tag: "כנסת",
      cat: "ישיבות הוועדות",
    },
    //{ item: "", value: 5 },
    {
      item: "6כנסת: הצעות חוק שהונחו לדיון",
      value: 6,
      tag: "כנסת",
      cat: "הצעות חוק",
    },
    //{ item: "", value: 7 },
    { item: "8כנסת: שאילתות", value: 8, tag: "כנסת", cat: "שאילתות" },
    {
      item: "9כנסת: הצעות לסדר יום",
      value: 9,
      tag: "כנסת",
      cat: "הצעות לסדר-יום",
    },
    {
      item: "10כנסת: פרוטוקולים",
      value: 10,
      tag: "כנסת",
      cat: "ישיבות המליאה",
    },
    {
      item: "11כנסת: דיון מהיר",
      value: 11,
      tag: "כנסת",
      cat: "הצעות לסדר-יום",
    },
    {
      item: "12ממשלה: ישיבת ממשלה – סדר יום",
      value: 12,
      tag: "ממשלה",
      cat: "סדר היום לישיבת הממשלה",
    },
    {
      item: "13ממשלה: סיכום ישיבת ממשלה",
      value: 13,
      tag: "ממשלה",
      cat: "הודעות מזכיר הממשלה",
    },
    {
      item: "14ממשלה: סדר יום ועדת שרים לענייני חקיקה",
      value: 14,
      tag: "ממשלה",
      cat: "סדר יום ועדות שרים",
    },
    {
      item: "15ממשלה: ועדת שרים לענייני חקיקה החלטות- שליחת החלטה פרטנית",
      value: 15,
      // Не нужен автовыбор, т.к. идентичен 14-му шаблону
      //tag: "ממשלה",
      //cat: "סדר יום ועדות שרים",
    },
    { item: "16ממשלה: תזכיר חוק", value: 16, tag: "ממשלה", cat: "תזכיר חוק" },
    {
      item: "17ממשלה: חקיקת משנה – קובץ תקנות",
      value: 17,
      tag: "ממשלה",
      cat: "קובץ תקנות",
    },
    {
      item: "18ממשלה: חקיקת משנה - קובץ התקנות – שיעורי מכס, מס קניה ותשלומי חובה",
      value: 18,
      tag: "ממשלה",
      cat: "קובץ תקנות שיעורי מכס, מס קניה ותשלומי חובה",
    },
    {
      item: "19ממשלה: חקיקת משנה – קובץ תקנות חיקוקי שלטון מקומי",
      value: 19,
      tag: "ממשלה",
      cat: "חיקוקי שלטון מקומי",
    },
    {
      item: "20ממשלה: עדכוני חקיקה – ילקוט הפרסומים",
      value: 20,
      tag: "ממשלה",
      cat: "ילקוט פרסומים",
    },
  ],
  0: template0,
  1: template1,
  3: template3,
  4: template4,
  6: template6,
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
  18: template18,
  19: template19,
  20: template20,
};

const emailTitles = {
  0: (post: IPost) => {
    return ``;
  },
  1: (post: IPost) => {
    return `עדכון מהכנסת – ${post.committee ? post.committee : dash}`;
  },
  3: (post: IPost) => {
    return `עדכון מהכנסת - ${post.title ? post.title : dash}`;
  },
  4: (post: IPost) => {
    return `עדכון מהכנסת – פרוטוקול ועדה`;
  },
  6: (post: IPost) => {
    return `עדכון מהכנסת – הצעות חוק שהונחו לדיון`;
  },
  8: (post: IPost) => {
    return `עדכון מהכנסת – שאילתות`;
  },
  9: (post: IPost) => {
    return `עדכון מהכנסת – הצעות לסדר יום`;
  },
  10: (post: IPost) => {
    return `עדכון מהכנסת – פרוטוקול מליאה`;
  },
  11: (post: IPost) => {
    return `עדכון מהכנסת – דיון מהיר`;
  },
  12: (post: IPost) => {
    return `ישיבת ממשלה – סדר יום`;
  },
  13: (post: IPost) => {
    return `ישיבת ממשלה – סיכום`;
  },
  14: (post: IPost) => {
    return `ועדת שרים לענייני חקיקה – סדר יום`;
  },
  15: (post: IPost) => {
    return `ועדת שרים לענייני חקיקה – החלטות`;
  },
  16: (post: IPost) => {
    const tempName = post.name ? post.name : dash;
    return `תזכיר חוק ${tempName}`;
  },
  17: (post: IPost) => {
    const tempName = post.name ? post.name : dash;
    return `כותרת: חקיקת משנה – קובץ תקנות מס' ${tempName}`;
  },
  18: (post: IPost) => {
    return `חקיקת משנה – קובץ תקנות חיקוקי שלטון מקומי `;
  },
  19: (post: IPost) => {
    return `חקיקת משנה - קובץ התקנות – שיעורי מכס, מס קניה ותשלומי חובה`;
  },
  20: (post: IPost) => {
    return `עדכוני חקיקה – ילקוט הפרסומים`;
  },
};

interface IProps {
  post: IPost;
  onNext: (post: IPost) => void;
}

const EmailEditor = ({ post, onNext }: IProps) => {
  const { t } = useTranslation();
  //Templates Dropdown
  const [template, setTemplate] = useState("");
  //Email theme
  const [emailTitle, setEmailTitle] = useState("");
  //Text Editor
  const [text, setText] = useState("");
  // All Clients (dropdown)
  const { clients } = useClientsState();
  const [clientsList, setClientsList] = useState("");
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
  //Handle template change with dropdown
  const handleChangeTemplate = (val: string) => {
    //@ts-ignore
    setText(templates[val](post));
    //@ts-ignore
    setEmailTitle(emailTitles[val](post));
    setTemplate(val);
  };

  //Template autoselect function
  const selectAccordingTemplate = () => {
    const { tag, cat } = post;
    const template = templates.options.find(
      (option) => option.cat === cat && option.tag === tag
    );
    const option = template ? template.value.toString() : "0";
    handleChangeTemplate(option);
  };

  //Handle send email (btn click)
  const { onSendEmail } = usePostsActions();
  const handleSendEmail = () => {
    let checkboxClients = clientsList.split(", ");
    if (checkboxClients[0] === "") checkboxClients = [];
    //@ts-ignore
    checkboxClients = checkboxClients.map((id) => parseInt(id, 10));
    const emailData = {
      subject: emailTitle,
      html: text,
      recipients_ids: [...checkboxClients, ...selectedClients],
      id: post.id,
      sender: post._sender,
    };
    onSendEmail(emailData);
  };

  //Fetch all clients list
  useEffect(() => {
    selectAccordingTemplate();
  }, []);

  //Clients dropdown

  const clientsOptions = useMemo(() => {
    let filtered: any = [];
    if (clients && clients.length > 0 && post.clients) {
      filtered = clients.map((c) => ({ item: c.name, value: c.id }));
      filtered = filtered.filter((option: any) =>
        post.clients.every((client: any) => client.id !== option.value)
      );
    }
    return filtered;
  }, [clients, post]);

  const keys = Object.keys(post);
  return (
    <StyledModal>
      <Container>
        <InitialPost>
          <StyledTitle>{t("emails_data-from-db")}</StyledTitle>

          {keys.map((key) => {
            // don't need to show this values(endpoint name, index in column...)
            if (key[0] === "_") {
              return null;
            }

            //Return cases when key is FILES
            if (post[key] && key === "files") {
              let listArray: any[] = [];
              let keys = Object.keys(post.files);
              keys.forEach((key) => {
                listArray.push({ type: "head", item: key });
                post.files[key].forEach((link: string) =>
                  listArray.push({ type: "link", item: link })
                );
              });
              return (
                <React.Fragment key={key}>
                  {listArray.length > 0 ? (
                    <React.Fragment>
                      <PostKey>{t(key)}</PostKey>
                      {listArray.map((item: any, index: number) => {
                        return item.type === "head" ? (
                          <PostValue key={index}>{item.item}</PostValue>
                        ) : (
                          <FileLink
                            href={item.item}
                            key={index}
                            target="_blank"
                          >
                            {item.item}
                          </FileLink>
                        );
                      })}
                    </React.Fragment>
                  ) : (
                    <PostValue>{t("emails_data-no-data")}</PostValue>
                  )}
                </React.Fragment>
              );
            }

            //Files GOV data
            if (post[key] && key === "files_govdata") {
              const keys = Object.keys(post.files_govdata);
              const elements = keys.map((item: string, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <PostValue>{item}</PostValue>
                    <FileLink href={post.files_govdata[item]} target="_blank">
                      {post.files_govdata[item]}
                    </FileLink>
                  </React.Fragment>
                );
              });
              return elements.length > 0 ? (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  {elements}
                </PostItem>
              ) : (
                "null"
              );
            }

            // don't need to show date for sorting
            if (post[key] && key === "date_for_sorting") {
              return null;
            }

            //Return cases when key is last_updated_date
            if (post[key] && key === "last_updated_date") {
              let rawDate = new Date(post[key]);
              let date = rawDate.toISOString().slice(0, 10);
              let time = rawDate.getHours() + ":" + rawDate.getMinutes();
              let formatedDate = time + " " + date;

              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostValue>{formatedDate}</PostValue>
                </PostItem>
              );
            }

            // Return cases when key is source
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

            // Return cases when key is root_link
            if (post[key] && key === "root_link") {
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
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostLink href={post[key]} target="_blank">
                    {post[key]}
                  </PostLink>
                </PostItem>
              );
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
                  {post[key].length > 0
                    ? post[key].map((item: any, index: number) => (
                        <PostValue key={index}>{item.name}</PostValue>
                      ))
                    : "null"}
                </PostItem>
              );
            }

            // Cases when key is plenum_session_items array
            if (post[key] && key === "plenum_session_items") {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  {post[key].length > 0
                    ? post[key].map((item: any, index: number) => (
                        <PostValue key={index}>{item.name}</PostValue>
                      ))
                    : "null"}
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
                <Initiators key={key}>
                  <PostKey>{t(key)}</PostKey>
                  {list.length > 0 ? list : "null"}
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

            // Reuturn 'null' string when primitive value doesn't exist
            if (!post[key]) {
              return (
                <PostItem key={key}>
                  <PostKey>{t(key)}</PostKey>
                  <PostValue>null</PostValue>
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

          <StyledInput
            value={emailTitle}
            onChange={(val) => setEmailTitle(val)}
            placeholder={t("email_theme")}
            label={t("email_theme")}
          />

          <SunEditor
            setDefaultStyle="font-size: 20px; max-width: 800px;"
            lang="he"
            defaultValue={""}
            setContents={text}
            height="350px"
            autoFocus={true}
            onChange={(val) => setText(val)}
            setOptions={{
              buttonList: [
                ["bold", "underline", "italic", "list", "align", "fontSize", "font"],
                ["link"],
              ],
              font: ['Open Sans']
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
                  <ClientBox key={client.id}>
                    <Checkbox
                      checked={selectedClients.includes(client.id)}
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
              options={clientsOptions}
              label={t("emails_clients-label")}
              isReversed={true}
            />
            <BtnBox>
              <MainButton onClick={() => onNext(post)} color="blue">
                {t("emails_edit-next")}
              </MainButton>
              <MainButton onClick={handleSendEmail} color="orange">
                {t("emails_edit-send")}
              </MainButton>
            </BtnBox>
          </Selector>
        </div>
      </Container>
    </StyledModal>
  );
};

export default EmailEditor;
