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

/** 根据天数动态生成标题与描述 */
function getMilestoneLabel(days) {
  if (days === 1) return { title: "在一起", desc: "我们开始的第一天" };
  if (days === 183) return { title: "半年纪念", desc: "我们走过半年" };
  if (days === 1000) return { title: "千日纪念", desc: "一千天 ❤️" };

  const hundreds = Math.floor(days / 100);
  if (days % 100 === 0 && hundreds >= 1) {
    return { title: `${hundreds}百日`, desc: `在一起 ${days} 天` };
  }

  const years = Math.floor(days / 365);
  if (
    years >= 1 &&
    (days === 365 * years || Math.abs(days - 365 * years) <= 2)
  ) {
    const y = Math.round(days / 365);
    const yearLabel =
      ["", "一", "两", "三", "四", "五", "六", "七", "八", "九", "十"][y] ||
      String(y);
    return { title: `${yearLabel}周年`, desc: `${days} 天快乐` };
  }

  return { title: `第 ${days} 天`, desc: `${days} 个日夜` };
}

/** 根据当前天数动态生成里程碑节点 */
function generateMilestoneDays(todayDays) {
  const set = new Set([1]);

  // 整百天：100, 200, 300... 至 超过今天的下两个整百
  const nextHundred = Math.ceil((todayDays + 1) / 100) * 100;
  for (let d = 100; d <= nextHundred + 100; d += 100) {
    set.add(d);
  }

  // 半年（约 183 天）
  if (todayDays >= 83 || nextHundred >= 200) set.add(183);

  // 周年：365, 730, 1095...
  const yearsAhead = Math.ceil((todayDays + 1) / 365) + 1;
  for (let y = 1; y <= yearsAhead; y++) {
    set.add(365 * y);
  }

  // 千日
  if (todayDays >= 800 || nextHundred >= 1000) set.add(1000);

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
