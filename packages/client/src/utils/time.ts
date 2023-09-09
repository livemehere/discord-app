import * as dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export function format(timestamp: number, format: string) {
  return dayjs(timestamp).format(format);
}
