export const calculatePi = () =>{
  let time = 100000;
  setTimeout(() => {
    time--
  }, 1000);
  return time
}