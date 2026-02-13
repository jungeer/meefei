import dayjs from "dayjs";

/** 纪念日起始日期 */
const START_DATE_STR = "1800-02-20";

/** dayjs 对象 */
export const START_DATE = dayjs(START_DATE_STR);

/** 用于展示的日期字符串 YYYY.MM.DD */
export const START_DATE_DISPLAY = START_DATE.format("YYYY.MM.DD");

/** 伴侣昵称 */
export const PARTNER_1 = "小慧";
export const PARTNER_2 = "俊哥";

/** 站点标题（用于 document.title） */
export const SITE_TITLE = `${PARTNER_1}&${PARTNER_2}`;
