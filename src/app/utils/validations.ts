const urlPattern = /^https?:\/\/[^\s$.?#].[^\s]*$/;

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return urlPattern.test(url);
  } catch (err) {
    return false;
  }
}
