import {
  StarOutlined,
  StarFilled,
  EllipsisOutlined,
  PushpinOutlined,
  PlusOutlined,
  DesktopOutlined,
  ExclamationCircleFilled,
  HomeOutlined,
  HomeFilled,
  BarcodeOutlined,
  QrcodeOutlined,
  UserOutlined,
  SyncOutlined,
  CheckOutlined,
  DeleteOutlined,
  QuestionCircleFilled,
  InfoCircleFilled,
  CloseOutlined,
  RollbackOutlined,
  EditOutlined,
  AppstoreFilled,
  GithubOutlined,
  SmileFilled,
  CrownFilled,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  PrinterOutlined,
  FilterFilled,
  DatabaseOutlined,
  UploadOutlined,
  PaperClipOutlined,
  CloudDownloadOutlined,
  FilePdfFilled,
  FileExcelFilled,
  FileImageFilled,
  FilePptFilled,
  FileTextFilled,
  FileWordFilled,
  FileFilled,
  SwapOutlined,
  FileZipFilled,
  FileOutlined,
  ExportOutlined,
  SendOutlined,
  SaveOutlined,
  CopyOutlined,
  LayoutFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
  MoreOutlined,
  LockOutlined,
  UnlockOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

import Icon from "@ant-design/icons";

export const GoBack = (props: any) => <ExportOutlined {...props} />;

export const IDropdown = () => (
  <Icon
    component={() => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-chevron-down"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        />
      </svg>
    )}
  />
);

export const INext = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-chevron-left"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

export const IDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-chevron-down"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

export const IDots = (props: any) => <EllipsisOutlined {...props} />;

export const IInventory = (props: any) => <DatabaseOutlined {...props} />;

export const IPin = (props: any) => <PushpinOutlined {...props} />;

export const ILock = (props: any) => <LockOutlined {...props} />;

export const IUnLock = (props: any) => <UnlockOutlined {...props} />;

export const IAdd = (props: any) => <PlusOutlined {...props} />;

export const IResize = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-cursor-text"
    viewBox="0 0 16 16"
  >
    <path d="M5 2a.5.5 0 0 1 .5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0 1 10.5 1.5a.5.5 0 0 1 0 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 0 0-.436.294V7.5H9a.5.5 0 0 1 0 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 0 1 0 1 4.165 4.165 0 0 1-2.06-.566A4.561 4.561 0 0 1 8 13.65a4.561 4.561 0 0 1-.44.285 4.165 4.165 0 0 1-2.06.566.5.5 0 0 1 0-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 0 1 0-1h.5V3.228a3.49 3.49 0 0 0-.436-.294A3.166 3.166 0 0 0 5.5 2.5.5.5 0 0 1 5 2m-.704 9.29" />
  </svg>
);

export const IManage = (props: any) => <DesktopOutlined {...props} />;

export const IShared = () => (
  <Icon
    component={() => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-globe"
        viewBox="0 0 16 16"
      >
        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472M3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
      </svg>
    )}
  />
);

export const IPersonal = () => (
  <Icon
    component={() => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path
          fillRule="evenodd"
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
        />
      </svg>
    )}
  />
);

export const IExclamation = (props: any) => (
  <ExclamationCircleFilled {...props} />
);

export const IHome = (props: any) => <HomeOutlined {...props} />;

export const IHomeFilled = (props: any) => <HomeFilled {...props} />;

export const IBarcode = (props: any) => <BarcodeOutlined {...props} />;

export const IQrCode = (props: any) => <QrcodeOutlined {...props} />;

export const IUser = (props: any) => <UserOutlined {...props} />;

export const ILogOut = (props: any) => <LogoutOutlined {...props} />;

export const IExpand = (props: any) => <INext {...props} />;

export const ICollapse = (props: any) => <IDropdown {...props} />;

export const ILoading = (props: any) => <SyncOutlined spin {...props} />;

export const IUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-chevron-up"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </svg>
);

export const IRename = (props: any) => <EditOutlined {...props} />;

export const ICheck = (props: any) => <CheckOutlined {...props} />;

export const IApp = (props: any) => <AppstoreFilled {...props} />;

export const IProcurement = (props: any) => <DollarOutlined {...props} />;

export const IHelp = (props: any) => <QuestionCircleFilled {...props} />;

export const INotify = (props: any) => <InfoCircleFilled {...props} />;

export const IDelete = DeleteOutlined;

export const ICopy = (props: any) => <CopyOutlined {...props} />;

export const ISave = (props: any) => <CheckOutlined {...props} />;

export const ICancel = (props: any) => <CloseOutlined {...props} />;

export const IRevert = (props: any) => <RollbackOutlined {...props} />;

export const IEdit = (props: any) => <EditOutlined {...props} />;

export const IGithub = (props: any) => <GithubOutlined {...props} />;

export const IWelcome = (props: any) => <SmileFilled {...props} />;

export const IManagement = (props: any) => <CrownFilled {...props} />;

export const IUSer = (props: any) => <UserOutlined {...props} />;

export const ISearch = (props: any) => <SearchOutlined {...props} />;

export const ISettings = (props: any) => <SettingOutlined {...props} />;

export const IArrowUp = (props: any) => <ArrowUpOutlined {...props} />;

export const IArrowDown = (props: any) => <ArrowDownOutlined {...props} />;

export const IPrint = (props: any) => <PrinterOutlined {...props} />;

export const IExport = (props: any) => <ExportOutlined {...props} />;

export const IFilter = (props: any) => <FilterFilled {...props} />;

export const IReport = (props: any) => <DatabaseOutlined {...props} />;

export const IPageOptions = (props: any) => <SettingOutlined {...props} />;

export const IUpload = (props: any) => <UploadOutlined {...props} />;

export const IAttachments = (props: any) => <PaperClipOutlined {...props} />;

export const IDownload = (props: any) => <CloudDownloadOutlined {...props} />;

export const IPdf = (props: any) => <FilePdfFilled {...props} />;

export const IExcel = (props: any) => <FileExcelFilled {...props} />;

export const IWord = (props: any) => <FileWordFilled {...props} />;

export const IImage = (props: any) => <FileImageFilled {...props} />;

export const IFile = (props: any) => <FileFilled {...props} />;

export const IText = (props: any) => <FileTextFilled {...props} />;

export const IZip = (props: any) => <FileZipFilled {...props} />;

export const IPpt = (props: any) => <FilePptFilled {...props} />;

export const IFiles = (props: any) => <FileOutlined {...props} />;

export const ICustomLink = (props: any) => <ExportOutlined {...props} />;

export const IPost = (props: any) => <SendOutlined {...props} />;

export const IManageColumns = (props: any) => <DesktopOutlined {...props} />;

export const ISaveLayout = (props: any) => <SaveOutlined {...props} />;

export const ICustomization = (props: any) => <LayoutFilled {...props} />;

export const IHidden = (props: any) => <EyeInvisibleOutlined {...props} />;

export const IVisible = (props: any) => <EyeOutlined {...props} />;

export const IMore = (props: any) => <MoreOutlined {...props} />;

export const ISales = (props: any) => <ShoppingCartOutlined {...props} />;

export const IExpandSider = (props: any) => <FullscreenOutlined {...props} />;

export const ICollapseSider = (props: any) => (
  <FullscreenExitOutlined {...props} />
);

export const IToggle = (props: any) => <SwapOutlined {...props} />;

export const IFavourite = (props: any) => <StarOutlined {...props} />;

export const IFavouriteFilled = (props: any) => <StarFilled {...props} />;
