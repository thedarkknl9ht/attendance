/**
 * * Default Table View
 * ? View - Search - Filter - Sort - Actions (Delete)
 */

import { Content } from "~/components/content";

import {  Report,  } from "~/library/components";

import { ReportProvider } from "~/library/services";

import data from "~/data/document.json";

import { ViewsProvider } from "~/services/context/views";

import reportMenu from "~/pages/common/menu/report";

const List = ({ breadcrumb }: any) => {
  const items = [
    { dataIndex: "invoiceID" },
    { dataIndex: "invoiceDate" },
    { dataIndex: "invoiceTime" },
    { dataIndex: "customerID" },
    { dataIndex: "customerName" },
    { dataIndex: "shippingAddress" },
    { dataIndex: "totalInvoice" },
    { dataIndex: "currency" },
    { dataIndex: "paymentType" },
    { dataIndex: "status" },
  ];

  const columns: any = [
    { title: "Product ID", dataIndex: "productID" },
    { title: "Product Name", dataIndex: "productName" },
    { title: "Product Type", dataIndex: ["product", "productType"] },
    {
      title: "Product Category ID",
      dataIndex: "productCategoryID",
      groupBy: true,
    },
    {
      title: "Product Category Name",
      dataIndex: "productCategoryName",
      groupBy: true,
    },
    { title: "Group", dataIndex: "group" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Amount", dataIndex: "amount" },
  ];

  return (
    <ViewsProvider name="reportTemplate" type="report">
      <Content title="Report Title" breadcrumb={breadcrumb} menu={reportMenu("")}>
        <ReportProvider data={data} allowFilter={true}>
          <Report.Section>
            <Report.Title title="Report Title" />
            <Report.Divider
              name="subtitle"
              title="this is report title description"
              type="secondary"
              orientation="left"
              orientationMargin={0}
            />
          </Report.Section>
          <Report.Section>
            <Report.Descriptions
              name="header"
              items={items}
              bordered={true}
              size="small"
            />
          </Report.Section>
          <Report.Space />
          <Report.Section>
            <Report.Details
              name="report"
              columns={columns}
              dataSource="invoiceDetails"
              keyField="key"
            />
          </Report.Section>
        </ReportProvider>
      </Content>
    </ViewsProvider>
  );
};
export default List;
