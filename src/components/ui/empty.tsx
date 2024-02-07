import { Button, Empty as _Empty } from "antd";

interface emptyProps {
  children?: React.ReactNode;
  linkText?: string;
  onLinkClick?: any;
}

export const Empty = ({ children, linkText, onLinkClick }: emptyProps) => (
  <_Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    style={{ paddingBottom: 20 }}
    description={<span>{children}</span>}
  >
    {linkText && (
      <Button type="primary" onClick={onLinkClick}>
        {linkText}
      </Button>
    )}
  </_Empty>
);
