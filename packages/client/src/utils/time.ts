import * as dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export function format(timestamp: string, format: string) {
  return dayjs(timestamp).format(format);
}
