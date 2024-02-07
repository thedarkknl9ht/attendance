/**
 * Page Content
 * ? Page Content - Breadcrumb - Page Title - Page Menu
 */

import React, { ReactNode } from "react";

import { Layout } from "antd";

import PageHeader from "./core/pageHeader";
import PageFooter from "./core/pageFooter";
import PageContent from "./core/pageContent";

interface contentProps {
  title?: string;
  description?: string;
  tags?: any[];
  extra?: any[];
  footer?: any[];
  menu?: any[] | false;
  breadcrumb?: any[];
  children: ReactNode;
  allowCustomViews?: boolean;
  hidden?: boolean;
  onBack?: Function | false;
  loading?: boolean;
}

export const Content = (props: contentProps) => {
  const {
    title,
    description,
    tags,
    extra,    
    menu,
    breadcrumb,
    children,
    allowCustomViews,
    hidden,
    onBack,
    loading,
  } = props;
  return (
    !hidden && (
      <React.Fragment>
        <Layout.Content style={{ marginBottom: 80 }}>
          <PageHeader
            title={title}
            description={description}
            tags={tags}
            extra={extra}
            breadcrumb={breadcrumb}
            allowCustomViews={allowCustomViews}
            onBack={onBack}
          />
          <PageContent loading={loading} menu={menu}>
            {children}
          </PageContent>
        </Layout.Content>
        <PageFooter />
      </React.Fragment>
    )
  );
};
