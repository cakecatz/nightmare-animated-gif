# nightmare animated gif [![CircleCI](https://circleci.com/gh/cakecatz/nightmare-animated-gif/tree/master.svg?style=svg)](https://circleci.com/gh/cakecatz/nightmare-animated-gif/tree/master)

[Nightmare](https://github.com/segmentio/nightmare) plugin for generating animated gif.

## Install

```bash
npm i nightmare-animated-gif
```

## Usage

Use `.use(animatedGif.add(label))` like `.screenshot()`.  
After that, you can use `generate(label)` for generate animated gif 😎

```javascript
var Nightmare = require('nightmare');
var nightmare = Nightmare();

nightmare
  .goto('http://yahoo.com')
  .use(animatedGif.add('search'))
  .type('form[action*="/search"] [name=p]', 'github nightmare')
  .use(animatedGif.add('search'))
  .click('form[action*="/search"] [type=submit]')
  .wait('#main')
  .use(animatedGif.add('search'))
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

![animated_gif](./search.gif)

## Documentation

### Settings

#### `generate(label, output, encoderOptions)`

- `encoderOptions` is [gifencoder](https://github.com/eugeneware/gifencoder)'s option.  
  You can see full options at [here](https://github.com/eugeneware/gifencoder/blob/master/lib/GIFEncoder.js#L37).

## LICENSE
MIT