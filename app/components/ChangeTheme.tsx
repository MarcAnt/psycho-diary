import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

import cx from "clsx";
import classes from "../theme.module.css";
import { TbMoon, TbSun } from "react-icons/tb";

export default function ChangeTheme() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <TbSun className={cx(classes.icon, classes.light)} />
      <TbMoon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
