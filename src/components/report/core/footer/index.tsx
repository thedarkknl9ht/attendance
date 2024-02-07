import dayjs from "dayjs";

import "dayjs/locale/ar";
import styled from "styled-components";
import { Divider } from "~/library/components";
import { useAuth } from "~/library/hooks";
import { isEmpty } from "~/library/utils";

interface pageFooterProps {
  showTime?: boolean;
  showUser?: boolean;
  items?: any[];
}

const Footer = styled.div({
  bottom: 0,
  display: "flex",
  padding: "5px 20px",
  borderTop: "1px solid rgb(240, 240, 240)",
  fontSize: "smaller",
  fontFamily: "samim",
  marginTop:10
});

const Extra = styled.div({
  flexGrow: 1,
  display: "flex",
});

const Item = styled.div({
  marginInlineStart: 5,
});

const PageFooter = ({ items, showTime, showUser }: pageFooterProps) => {
  const userName = useAuth()?.auth?.userName;

  return (
    <Footer className="page-footer">
      <Extra>
        {items?.map((item: string, index: number) => (
          <Item key={index}>
            {item} {!isEmpty(item) && <Divider type="vertical" />}
          </Item>
        ))}
      </Extra>
      {showUser !== false && (
        <Item>
          <Divider type="vertical" /> {userName}
        </Item>
      )}
      {showTime !== false && (
        <Item>
          <Divider type="vertical" />
          {dayjs(new Date()).locale("ar").format("dddd, MMMM D, YYYY h:mm A")}
        </Item>
      )}
    </Footer>
  );
};

export default PageFooter;
