export const range = n => [...Array(n).keys()];

export const gqlReady = ({ error, data }) =>
  error == undefined && data != undefined;
