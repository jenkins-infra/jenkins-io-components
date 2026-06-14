function managerEntries(entry = []) {
  return [...entry, require.resolve('./manager')];
}

const config = (entry = [], _options) => {
  return [...entry];
};

module.exports = {
  managerEntries,
  config,
};
