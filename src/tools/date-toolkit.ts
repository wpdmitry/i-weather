import fnsFormat from "date-fns/format";
import { ru } from "date-fns/locale";

function format(date: Date, format: string, { locale = ru }: { locale?: Locale } = {}) {
  return fnsFormat(date, format, { locale });
}

function formatToWeekName(date: Date, upper = false) {
  const name = format(date, "eeee");
  return upper ? name[0].toUpperCase() + name.slice(1) : name;
}

export default { format, formatToWeekName };