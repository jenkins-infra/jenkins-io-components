function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

const config = (entry = [], _options) => {
  return [...entry];
};

module.exports = {
  managerEntries,
  config,
};
