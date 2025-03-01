
/**
 * Helper function to determine content type from filename
 */
export const getContentTypeFromFileName = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "pdf":
      return "application/pdf";
    case "txt":
      return "text/plain";
    case "html":
      return "text/html";
    case "json":
      return "application/json";
    default:
      return "application/octet-stream";
  }
};
