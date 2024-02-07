import { Layout } from "antd";

const { Footer } = Layout;

const PageFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
      className="no-print"
      hidden
    >
      Ant Design ©2023 Created by Ant UED
    </Footer>
  );
};

export default PageFooter;
