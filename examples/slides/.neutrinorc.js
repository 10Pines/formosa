module.exports = {
  use: [
    [
      '@neutrinojs/airbnb', 
      {
        eslint: {
          rules: {
            "react/prefer-stateless-function": 'off'
          }
        }
      }
    ],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'formosa-slides'
        }
      }
    ]
  ]
};
