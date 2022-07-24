export function emailErrorValidation(input: string) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!input || input === "" || regex.test(input) === false) {
    return true;
  }

  return false;
}

export function minChartErrorValidation(input: string) {
  const regex = /^([a-z\ ]{8,})$/i;

  if (!input || input === "" || regex.test(input) === false) {
    return true;
  }

  return false;
}
