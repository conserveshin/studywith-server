export const isAnyUndefined = (...args: any[]) => {
  args.forEach(arg => {if (arg === undefined) return true});
  return false;
};