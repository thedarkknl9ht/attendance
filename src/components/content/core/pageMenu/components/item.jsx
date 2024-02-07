import { useState } from "react";
////________________________________________________________________
import clsx from "clsx";
////________________________________________________________________
import * as icons from "~/components/ui/icons";

import i18n from "~/i18n";

import { useOutsideClick } from "~/hooks/useOutsideClick";
////________________________________________________________________
import Dropdown from "./dropdown";
////________________________________________________________________
const Item = ({
  text,
  items,
  isActive,
  icon,
  iconColor,
  separator,
  disabled,
  onClick,
}) => {
  const refContainer = useOutsideClick(() => setShow(false));
  ////______________________________________________________________
  const [show, setShow] = useState(false);
  ////______________________________________________________________
  const handleClick = () => {
    if (disabled !== true)
      if (onClick) {
        onClick();
      } else if (items !== undefined) {
        setShow(true);
      }
  };
  ////______________________________________________________________
  return (
    <div
      ref={refContainer}
      className={clsx("page-menu-item", isActive ? "is-active" : "")}
      data-separator={separator}
      data-disabled={disabled}
    >
      <div
        className={clsx(
          "page-menu-button",
          show && onClick === undefined ? "is-active" : ""
        )}
        data-single={onClick === undefined || items === undefined}
        onClick={handleClick}
      >
        <span className={"svg-" + iconColor}>{icons[icon]}</span>
        <span className="page-menu-button-text" hidden={!text}>
          {i18n.t(text)}
        </span>
        <span
          className="svg-icon svg-icon-xs"
          hidden={items === undefined || onClick !== undefined}
          onClick={() => (disabled !== true ? setShow(true) : undefined)}
        >
          {icons["IDown"]}
        </span>
      </div>
      <div
        className={clsx("page-menu-dropdown-toggle", show ? "is-active" : "")}
        hidden={items === undefined || onClick === undefined}
        onClick={() => (disabled !== true ? setShow(true) : undefined)}
      >
        <span className="svg-icon svg-icon-xs">{icons["IDown"]}</span>
      </div>
      <Dropdown items={items} show={show} close={() => setShow(false)} />
    </div>
  );
};

export default Item;
