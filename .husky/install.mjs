// Skip husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(O);
}
const husky = (await import('husky')).default;
console.log(husky());
