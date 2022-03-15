export const emailRegex = {
  email: '[a-zA-Z0-9.-_-!#$%&\'*+-/=?^_`{|}~]{1,}@[a-zA-Z.-]{2,}[.]{1}([a-zA-Z]{2,3}|(aero|coop|info|museum|name))'
};
export const websiteUrlRegex = {
  url: /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)+\/$/g
};
export const urlApiRegex = {
  url: /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)+v1\/$/g
};

