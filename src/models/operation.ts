import i18n from "~/i18n";

const op = [
  { value: 0, label: i18n.t("Equal") },
  { value: 1, label: i18n.t("NotEqual") },
  { value: 2, label: i18n.t("GreaterThan") },
  { value: 3, label: i18n.t("LessThan") },
  { value: 4, label: i18n.t("GreaterThanOrEqual") },
  { value: 5, label: i18n.t("LessThanOrEqual") },
  { value: 6, label: i18n.t("Contains") },
  { value: 7, label: i18n.t("StartsWith") },
  { value: 8, label: i18n.t("EndsWith") },
];

const string = [
  { value: 0, label: i18n.t("Equal") },
  { value: 1, label: i18n.t("NotEqual") },
  { value: 6, label: i18n.t("Contains") },
  { value: 7, label: i18n.t("StartsWith") },
  { value: 8, label: i18n.t("EndsWith") },
];

const number = [
  { value: 0, label: i18n.t("Equal") },
  { value: 1, label: i18n.t("NotEqual") },
  { value: 2, label: i18n.t("GreaterThan") },
  { value: 3, label: i18n.t("LessThan") },
  { value: 4, label: i18n.t("GreaterThanOrEqual") },
  { value: 5, label: i18n.t("LessThanOrEqual") },
];

const bool = [{ value: 0, label: i18n.t("Equal") }];

const date = [
  { value: 0, label: i18n.t("Equal") },
  { value: 1, label: i18n.t("NotEqual") },
  { value: 2, label: i18n.t("GreaterThan") },
  { value: 3, label: i18n.t("LessThan") },
  { value: 4, label: i18n.t("GreaterThanOrEqual") },
  { value: 5, label: i18n.t("LessThanOrEqual") },
];


export const operation = { op, string, number, bool, date };
