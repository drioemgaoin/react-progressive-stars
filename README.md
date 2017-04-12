# react progressive stars

Get the AMD module located at `react-progressive-stars.js` and include it in your project.

Here is a sample integration:

```js
require.config({
  paths: {
    'react': 'vendor/bower_components/react/react',
    'ReactProgressiveStars': 'react-progressive-stars'
  }
});

require(['react', 'ReactProgressiveStars'], function(React, ReactProgressiveStars) {

  React.render(React.createElement(ReactProgressiveStars), document.getElementById('widget-container'));

});
```

## Development

* Development server `npm start`.
* Continuously run tests on file changes `npm run watch-test`;
* Run tests: `npm test`;
* Build `npm run build`;
