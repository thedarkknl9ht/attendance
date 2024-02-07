import { Tag as _Tag } from "antd";

const { CheckableTag } = _Tag;

export const Tag = (props: any) => <_Tag {...props} />;

Tag.Checkable = CheckableTag;
