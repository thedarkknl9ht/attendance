import { operation } from "../models/operation";
import * as usersViews from "../models/usersViews";
import * as products from "../models/products";
import * as units from "../models/units";
import * as others from "../models/others";
import * as attributes from "../models/attributes";
import * as regions from "../models/regions";
import * as report from "../models/report";
import * as security from "../models/security";
import * as users from "../models/users";
import * as workflow from "../models/workflow";
import * as entities from "../models/legalEntities";
import * as sales from "../models/sales";
import * as attachments from "../models/attachments";
import * as dashboard from "../models/dashboard";
import * as inventory from "~/models/inventory";
import * as cashBanks from "~/models/cashBanks";
import * as financial from "~/models/financial";

export const inputSources: any = {
  operation,
  ...usersViews,
  ...products,
  ...units,
  ...attributes,
  ...others,
  ...regions,
  ...report,
  ...security,
  ...users,
  ...workflow,
  ...entities,
  ...sales,
  ...attachments,
  ...dashboard,
  ...inventory,
  ...cashBanks,
  ...financial,
};
