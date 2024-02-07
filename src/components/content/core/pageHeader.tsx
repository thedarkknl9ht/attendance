/**
 * * Page Header
 * ? Title - Description - Tags - Breadcrumb, Buttons
 */
import { useNavigate } from "react-router-dom";

import { Button, Breadcrumb, Flex, Tag, theme } from "antd";

import {
  GoBack,
  IDelete,
  IFavourite,
  IFavouriteFilled,
  ISave,
} from "~/components/ui/icons";

import {
  useAccess,
  useAuth,
  useAxiosPrivate,
  useMessage,
  useViews,
} from "~/library/hooks";

import i18n from "~/i18n";

import PageViews from "./pageView";
import {
  Divider,
  Dropdown,
  Form,
  Input,
  SelectFixed,
  Space,
} from "~/library/components";
import { useEffect } from "react";

interface props {
  title?: string;
  onBack?: Function | false;
  description?: string;
  tags?: any[];
  breadcrumb?: any[];
  extra?: any[];
  allowCustomViews?: boolean;
  children?: React.ReactNode;
}

const PageHeader = (props: props) => {
  const { token } = theme.useToken();

  const dropdownStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    minWidth: 250,
  };

  const navigate = useNavigate();

  const { hasAccess } = useAccess();

  const { auth } = useAuth();

  const { viewsLoaded } = useViews() || {};

  const handleGoBack = () => {
    if (props.onBack) props.onBack();
    else if (props.onBack !== false) {
      navigate(-1);
    }
  };

  const hasFavourite = auth?.favourites?.some(
    (e: any) => e.pageID === props.title
  );

  return (
    <div className="page-header no-print">
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={props.breadcrumb}
      />
      <Flex gap="small" wrap="wrap">
        <Space split={<Divider type="vertical" />} size={0}>
          {props.onBack && (
            <Button
              type="text"
              size="small"
              icon={<GoBack />}
              onClick={handleGoBack}
            />
          )}
          <div className="page-title">{i18n.t(props.title ?? "")}</div>
          <Dropdown
            trigger={["click"]}
            arrow={true}
            dropdownRender={() => (
              <div
                style={{
                  ...dropdownStyle,
                  direction: auth?.language === "AR" ? "rtl" : "ltr",
                }}
              >
                <UpdateFavourite title={props.title} />
              </div>
            )}
          >
            <Button
              type="text"
              icon={
                hasFavourite ? (
                  <IFavouriteFilled style={{ color: "rgb(100,100,100)" }} />
                ) : (
                  <IFavourite style={{ color: "rgb(100,100,100)" }} />
                )
              }
            />
          </Dropdown>
          {hasAccess({ name: "views", type: "read" }) &&
            props.allowCustomViews !== false &&
            viewsLoaded && <PageViews />}
          {props.description && (
            <div className="page-description">{i18n.t(props.description)}</div>
          )}
          {props.tags && (
            <div className="page-tags">
              {props.tags
                ?.filter((e: any) => !e.hidden)
                .map((item, index) => (
                  <Tag key={index} color={item.color}>
                    {i18n.t(item.text)}
                  </Tag>
                ))}
            </div>
          )}
        </Space>

        <div className="page-extra" style={{ textAlign: "end" }}>
          <Flex
            gap="small"
            wrap="wrap"
            align="end"
            style={{ flexDirection: "row-reverse" }}
          >
            {props.extra?.map((item, index) => (
              <Button key={index} type={item.type} danger={item.danger}>
                {i18n.t(item.text)}
              </Button>
            ))}
          </Flex>
        </div>
      </Flex>
      {props.children}
    </div>
  );
};

const UpdateFavourite = ({ title }: any) => {
  const { auth, refetch } = useAuth();

  const axios = useAxiosPrivate();

  const message = useMessage();

  const [form] = Form.useForm();

  const data = auth?.favourites?.find((e: any) => e.pageID === title);

  useEffect(() => {
    if (data) form.setFieldsValue(data);
    else
      form.setFieldsValue({
        userID: auth?.userID,
        pageID: title,
        pageTitle: i18n.t(title),
        pageLink: window.location.pathname,
        pageLinkType: "Same Tab",
        description: "",
      });
  }, []);

  const handleSubmit = () =>
    form.validateFields().then(
      () =>
        axios
          .post("favourites/" + (data ? "Update" : "Insert"), {
            form: form.getFieldsValue(true),
          })
          .then(() => {
            refetch();
            message.success("Favourite Updated");
          })
          .catch(() => console.log(JSON.stringify(form.getFieldsValue(true)))),
      (errors) => message.dbError("Validation Error", errors)
    );

  const handleDelete = () =>
    axios
      .post("favourites/Delete", {
        form: form.getFieldsValue(true),
      })
      .then(() => {
        refetch();
        message.success("Favourite Updated");
      });

  return (
    <Form form={form} layout="vertical">
      <Form.Item name="pageTitle" required>
        <Input />
      </Form.Item>
      <Form.Item name="pageLink">
        <Input readOnly />
      </Form.Item>
      <Form.Item name="pageLinkType">
        <SelectFixed dataSource="pageLinkType" />
      </Form.Item>
      <Space>
        <Button type="primary" icon={<ISave />} onClick={handleSubmit}>
          {i18n.t("Confirm")}
        </Button>
        {data && (
          <Button
            type="primary"
            icon={<IDelete />}
            onClick={handleDelete}
            danger
          >
            {i18n.t("Delete")}
          </Button>
        )}
      </Space>
    </Form>
  );
};

export default PageHeader;
