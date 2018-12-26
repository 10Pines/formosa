module.exports = {
  use: [
    '@neutrinojs/react',
    (neutrino) => {
      neutrino.config.resolve.symlinks(false);
    },
  ]
};
