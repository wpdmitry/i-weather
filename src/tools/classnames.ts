export default (...args: any[]) =>
  args.filter(arg => typeof arg === "string").join(" ");
