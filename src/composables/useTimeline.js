import { computed } from "vue";
import { getAnniversaryDays } from "./useAnniversary";
import { START_DATE } from "../config";

/** 根据起始日 + 天数得到日期字符串 */
function formatDate(date) {
  return date.format("YYYY.MM.DD");
}

/** 根据天数计算日期（第 1 天 = 起始日当天） */
function addDays(days) {
  return START_DATE.add(days - 1, "day");
}

/** 数字转中文（1～99）。用于百/千/万时 isMultiplier 用「两」；用于周年时仅 2→两，12/22…→二 */
const DIGITS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const DIGITS_LIANG = ["", "一", "两", "三", "四", "五", "六", "七", "八", "九"];

function toChineseNumber(n, isMultiplier = false) {
  const d = isMultiplier ? DIGITS_LIANG : DIGITS;
  if (n < 1 || n > 99) return String(n);
  if (n <= 9) return d[n];
  if (n <= 19) return "十" + d[n - 10];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return d[tens] + "十" + (ones ? d[ones] : "");
}

/** 周年专用：仅 2→两，12/22/32…→十二/二十二/三十二 */
function toChineseNumberForYear(n) {
  if (n < 1 || n > 99) return String(n);
  if (n === 2) return "两";
  return toChineseNumber(n, false);
}

/** 数字转完整中文（一千一百日 等），支持 1～9999 */
function toChineseNumberFull(n) {
  if (n < 0 || n > 9999) return String(n);
  if (n === 0) return "零";

  const d = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const dLiang = ["", "一", "两", "三", "四", "五", "六", "七", "八", "九"];

  const q = Math.floor(n / 1000);
  const b = Math.floor((n % 1000) / 100);
  const s = Math.floor((n % 100) / 10);
  const g = n % 10;

  let result = "";
  let needZero = false;
  if (q > 0) {
    result += dLiang[q] + "千";
    needZero = true;
  }
  if (b > 0) {
    result += dLiang[b] + "百";
    needZero = true;
  } else if (needZero && (s > 0 || g > 0)) {
    result += "零";
    needZero = false;
  }
  if (s > 0) {
    result += d[s] + "十";
    needZero = true;
  } else if (needZero && g > 0) {
    result += "零";
    needZero = false;
  }
  if (g > 0) result += d[g];

  return result;
}

/** 大于万时仅展示万、千（临近单位），不展示百、十、个 */
function toChineseNumberOver10k(n) {
  if (n < 10000) return String(n);
  const dLiang = ["", "一", "两", "三", "四", "五", "六", "七", "八", "九"];
  const w = Math.floor(n / 10000);
  const q = Math.floor((n % 10000) / 1000);
  const wStr = w <= 9 ? dLiang[w] : toChineseNumber(w, true);
  let result = wStr + "万";
  if (q > 0) result += dLiang[q] + "千";
  return result;
}

/** 根据天数动态生成标题与描述。保留周年；大于万时只展示万、千 */
function getMilestoneLabel(days) {
  if (days === 1) return { title: "在一起", desc: "我们开始的第一天" };
  if (days === 183) return { title: "半年纪念", desc: "我们走过半年" };
  if (days === 666) return { title: "六六六日 ❤️", desc: "666 天纪念日快乐" };

  // 周年优先：一周年、两周年、十二周年……
  const years = Math.floor(days / 365);
  if (
    years >= 1 &&
    (days === 365 * years || Math.abs(days - 365 * years) <= 2)
  ) {
    const y = Math.round(days / 365);
    const yearLabel = y <= 99 ? toChineseNumberForYear(y) : String(y);
    return { title: `${yearLabel}周年 ❤️`, desc: `${days} 天快乐` };
  }

  // 百日及以上：一百日、一千一百日；大于万时仅万、千（一万一千日）
  if (days >= 100) {
    const label =
      days >= 10000
        ? toChineseNumberOver10k(days)
        : days <= 9999
          ? toChineseNumberFull(days)
          : String(days);
    const heart = days % 1000 === 0 ? " ❤️" : "";
    return { title: `${label}日${heart}`, desc: `在一起 ${days} 天` };
  }

  return { title: `第 ${days} 天`, desc: `${days} 个日夜` };
}

/** 根据当前天数动态生成里程碑节点 */
function generateMilestoneDays(todayDays) {
  const set = new Set([1]);

  // 整百天：100, 200, ... 9900（到万后不再统计百）
  const nextHundred = Math.ceil((todayDays + 1) / 100) * 100;
  for (let d = 100; d <= Math.min(nextHundred + 100, 9900); d += 100) {
    set.add(d);
  }

  // 半年（约 183 天）、666 天纪念
  if (todayDays >= 83 || nextHundred >= 200) set.add(183);
  if (todayDays >= 566 || nextHundred >= 700) set.add(666);

  // 周年：365, 730, 1095...
  const yearsAhead = Math.ceil((todayDays + 1) / 365) + 1;
  for (let y = 1; y <= yearsAhead; y++) {
    set.add(365 * y);
  }

  // 千日、万日：1000, 2000, ..., 9000, 10000, 20000（由末尾 filter 按“今日+365”截断）
  for (let k = 1; k <= 9; k++) set.add(k * 1000);
  for (let w = 1; w <= 9; w++) {
    set.add(w * 10000);
    for (let k = 1; k <= 9; k++) set.add(w * 10000 + k * 1000);
  }

  return [...set]
    .filter((d) => d >= 1 && d <= todayDays + 365)
    .sort((a, b) => a - b);
}

/** 动态生成时光轴数据 */
export function useTimeline() {
  const todayDays = getAnniversaryDays();

  const milestones = computed(() => {
    const milestoneDays = generateMilestoneDays(todayDays);

    return milestoneDays.map((days) => {
      const date = addDays(days);
      const dateStr = formatDate(date);
      const { title, desc } = getMilestoneLabel(days);
      const passed = todayDays >= days;
      const diff = passed ? todayDays - days : days - todayDays;

      return {
        days,
        date: dateStr,
        title,
        desc,
        passed,
        diff,
        statusText: passed ? `${diff} 天前` : `还有 ${diff} 天`,
      };
    });
  });

  return { milestones, todayDays };
}
