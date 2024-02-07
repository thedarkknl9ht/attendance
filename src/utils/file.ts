export const getFile = (filePath: string) => {
  return {
    fileName: filePath.replace(/^.*[\\/]/, "").replace(/\.[^/.]+$/, ""),
    fileType: filePath
      .replace(/^.*[\\/]/, "")
      .split(".")
      .pop(),
    originalFileName: filePath.replace(/^.*[\\/]/, ""),
  };
};
