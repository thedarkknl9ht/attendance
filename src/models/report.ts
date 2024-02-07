import i18n from "~/i18n";

export const fontWeight = [
  { value: "lighter", label: i18n.t("Lighter") },
  { value: "normal", label: i18n.t("Normal") },
  { value: "bold", label: i18n.t("Bold") },
  { value: "bolder", label: i18n.t("Bolder") },
];

export const fontSize = [
  { value: "xx-small", label: i18n.t("Ultra Small") },
  { value: "x-small", label: i18n.t("Very Small") },
  { value: "smaller", label: i18n.t("Smaller") },
  { value: "small", label: i18n.t("Small") },
  { value: "normal", label: i18n.t("Normal") },
  { value: "large", label: i18n.t("Large") },
  { value: "larger", label: i18n.t("Larger") },
  { value: "x-large", label: i18n.t("Very Large") },
  { value: "xx-large", label: i18n.t("Ultra Large") },
];

export const fontFamily = [{ value: "Tahoma" }, { value: "Arial" }];

export const textAlign = [
  { value: "start", label: i18n.t("Start") },
  { value: "center", label: i18n.t("Center") },
  { value: "end", label: i18n.t("End") },
];

export const layout = [
  { value: "vertical", label: i18n.t("Vertical") },
  { value: "horizontal", label: i18n.t("Horizontal") },
];

export const textDecoration = [
  { value: "line-through", label: i18n.t("Line Through") },
  { value: "overline", label: i18n.t("Over Line") },
  { value: "underline", label: i18n.t("Under Line") },
];

export const tableSize = [
  { value: "small", label: i18n.t("Small") },
  { value: "middle", label: i18n.t("Middle") },
  { value: "large", label: i18n.t("Large") },
];

export const tableSummary = [
  { value: "sum", label: i18n.t("Sum") },
  { value: "max", label: i18n.t("Max") },
  { value: "min", label: i18n.t("Min") },
  { value: "count", label: i18n.t("Count") },
];
