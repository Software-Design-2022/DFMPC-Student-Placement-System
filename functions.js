export const multiply = (a, b) => {
    return a * b;
  };
  
  export const makeLowerCase = (string) => {
    return string.toLowerCase();
  };
  
  //function to get current date data from device and returns it as a date string
  export function getCurrentDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
  
    return day + "-" + month + "-" + year;
  }

  //function to find differences between date to determine if date should be kept
export function difference(start)
{
  let date = new Date();
  let date2 = new Date(start);
  let diff = Math.ceil((date2 - date) / (1000 * 3600 * 24));
  return diff;
}
