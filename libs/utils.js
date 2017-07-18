export const Reducer = amount => {
  if (amount < Math.pow(10, 6)) {
    var num = amount / Math.pow(10, 3);
    if (num % 1 != 0) return num.toFixed(2) + "Ki";
    return num + "Ki";
  } else if (amount < Math.pow(10, 9)) {
    var num = amount / Math.pow(10, 6);
    if (num % 1 != 0) return num.toFixed(2) + "Mi";
    return num + "Mi";
  } else if (amount < Math.pow(10, 12)) {
    var num = amount / Math.pow(10, 9);
    if (num % 1 != 0) return num.toFixed(2) + "Gi";
    return num + "Gi";
  } else if (amount < Math.pow(10, 15)) {
    var num = amount / Math.pow(10, 12);
    if (num % 1 != 0) return num.toFixed(2) + "Ti";
    return num + "Ti";
  }
};
