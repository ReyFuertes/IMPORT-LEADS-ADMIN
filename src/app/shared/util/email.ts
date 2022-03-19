export const emailRegex = {
  email: '[a-zA-Z0-9.-_-!#$%&\'*+-/=?^_`{|}~]{1,}@[a-zA-Z.-]{2,}[.]{1}([a-zA-Z]{2,3}|(aero|coop|info|museum|name))'
};
export const websiteUrlRegex = {
  url: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?\/$'
};
export const urlApiRegex = {
  url: '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?api\/v1\/$'
};

