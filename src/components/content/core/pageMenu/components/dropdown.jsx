import * as icons from "~/components/ui/icons";

import i18n from "~/i18n";
///________________________________________________________________
const Dropdown = ({ items, show, close }) => {
  const handleItemClick = (action) => {
    if (action) {
      action();
    }
    close();
  };
  ////______________________________________________________________
  return (
    <div className="page-menu-dropdown" data-show={show}>
      {(items ?? []).map((item, index) => (
        <div
          key={index}
          className="page-menu-dropdown-item"
          data-separator={item.separator}
          data-hidden={item.hidden}
          onClick={() => handleItemClick(item.onClick)}
        >
          <span className={"svg-" + item.iconColor}>{icons[item.icon]}</span>
          {i18n.t(item.text)}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
