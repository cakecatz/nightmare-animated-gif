# nightmare animated gif [![CircleCI](https://circleci.com/gh/cakecatz/nightmare-animated-gif/tree/master.svg?style=svg)](https://circleci.com/gh/cakecatz/nightmare-animated-gif/tree/master)

[Nightmare](https://github.com/segmentio/nightmare) plugin for generating animated gif.

## Install

```bash
npm i nightmare-animated-gif
```

## Usage

Use `.use(animatedGif.captureAs(label))` like `.screenshot()`.  
After that, you can use `generate(label)` for generate animated gif 😎

```javascript
var Nightmare = require('nightmare');
var animatedGif = require('nightmare-animated-gif');
var nightmare = Nightmare();

nightmare
  .goto('http://yahoo.com')
  .use(animatedGif.captureAs('search'))
  .type('form[action*="/search"] [name=p]', 'github nightmare')
  .use(animatedGif.captureAs('search'))
  .click('form[action*="/search"] [type=submit]')
  .wait('#main')
  .use(animatedGif.captureAs('search'))
  .end()
  .then(() => {
    animatedGif.generate('search', './search.gif', {
      repeat: 0, // forever
      delay: 1000,
      quality: 10,
    });  
  });
```

**generated gif**

![animated_gif](https://cloud.githubusercontent.com/assets/6136383/16363987/25690ae0-3c17-11e6-876c-65f31547257f.gif)


## Documentation

### Settings

#### `generate(label, output, encoderOptions)`

- `encoderOptions` is [gifencoder](https://github.com/eugeneware/gifencoder)'s option.  
  You can see full options at [here](https://github.com/eugeneware/gifencoder/blob/master/lib/GIFEncoder.js#L37).

## LICENSE
MIT
