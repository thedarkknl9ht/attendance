import { Card, Spin } from "antd";

import PageMenu from "./pageMenu";

interface pageContentProps {
  loading?: boolean;
  menu?: any[] | false;
  children: React.ReactNode;
}

const contentStyle = {
  margin: "0 24px",
};

const PageContent = (props: pageContentProps) => (
  <Card style={contentStyle}>
    <PageMenu items={props.menu} />
    <Spin spinning={props.loading === true}>{props.children}</Spin>
  </Card>
);

export default PageContent;
