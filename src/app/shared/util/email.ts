export const emailRegex = {
  email: '[a-zA-Z0-9.-_-!#$%&\'*+-/=?^_`{|}~]{1,}@[a-zA-Z.-]{2,}[.]{1}([a-zA-Z]{2,3}|(aero|coop|info|museum|name))'
};
export const urlRegex = {
  url: /^https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)+\/$/gm
};