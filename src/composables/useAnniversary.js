import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import { START_DATE } from "../config";

/** 纪念日计时：从起始日算起，当天算第 1 天 */
export function getAnniversaryDays() {
  const today = dayjs().startOf("day");
  const start = START_DATE.startOf("day");
  const diffDays = today.diff(start, "day");
  return Math.max(1, diffDays + 1);
}

/** 带数字动画的纪念日 */
export function useAnniversary(options = {}) {
  const { duration = 1800, delay = 600 } = options;
  const days = ref(0);
  const targetDays = getAnniversaryDays();

  onMounted(() => {
    const runCountAnimation = () => {
      const startTime = performance.now();
      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(2, -10 * progress);
        days.value = Math.floor(eased * targetDays);
        if (progress < 1) requestAnimationFrame(updateCount);
        else days.value = targetDays;
      };
      requestAnimationFrame(updateCount);
    };
    setTimeout(runCountAnimation, delay);
  });

  return { days, targetDays };
}
