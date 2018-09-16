module.exports = {
  use: [
    [
      '@neutrinojs/airbnb', 
      {
        eslint: {
          rules: {
            "react/prefer-stateless-function": 'off',
            "no-unused-vars": 'off',
            "no-console": 'off',
            "no-debugger": 'off',
            "no-param-reassign": 'off',
            "import/prefer-default-export": 'off',
            "no-alert": 'off',
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
