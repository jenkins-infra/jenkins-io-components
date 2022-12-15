// my-preset/index.js

function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

const config = (entry = [], options) => {
  return [...entry];
};

module.exports = {
  managerEntries,
  config,
};
