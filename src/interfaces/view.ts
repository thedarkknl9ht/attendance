export interface view {
  userID?: string;
  viewType?: "table" | "form" | "report";
  viewName?: string;
  viewID: string;
  viewStatus: "Personal" | "Shared";
  description?: string | null;
  viewOptions?: string;
  items?: any[];
  isDefault?: boolean;
  standardView?: boolean;
}
