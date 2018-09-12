<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/ludat/formosa/master/demo/src/assets/logo.svg">
</p>

# formosa - Angular binding for formosa

[![npm version](https://badge.fury.io/js/formosa.svg)](https://badge.fury.io/js/formosa),
[![Build Status](https://travis-ci.org/ludat/formosa.svg?branch=master)](https://travis-ci.org/ludat/formosa)
[![Coverage Status](https://coveralls.io/repos/github/ludat/formosa/badge.svg?branch=master)](https://coveralls.io/github/ludat/formosa?branch=master)
[![dependency Status](https://david-dm.org/ludat/formosa/status.svg)](https://david-dm.org/ludat/formosa)
[![devDependency Status](https://david-dm.org/ludat/formosa/dev-status.svg?branch=master)](https://david-dm.org/ludat/formosa#info=devDependencies)

## Demo

View all the directives in action at https://ludat.github.io/formosa

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-formosa` via:
```shell
npm install --save ngx-formosa
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-formosa`:
```js
map: {
  'ngx-formosa': 'node_modules/ngx-formosa/bundles/ngx-formosa.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-formosa';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-formosa';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-formosa';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2018 Lucas David Traverso. Licensed under the MIT License (MIT)

