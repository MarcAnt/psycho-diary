import { Text } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.locale("es");

const ShowDate = ({ date }: { date: Date | string }) => {
  return (
    <Text c="dimmed" fs={"italic"} size="sm" component="span">
      {dayjs(date).locale("es").format("DD/MM/YYYY HH:mm")} {" - "}
      {dayjs(date).locale("es").fromNow()}
    </Text>
  );
};

export default ShowDate;
