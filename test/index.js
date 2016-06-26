import test from 'ava';
import Nightmare from 'nightmare';
import screenshotToGif from '../';
import fs from 'fs';
import rimraf from 'rimraf';

let nightmare;

test.beforeEach(() => {
  nightmare = new Nightmare();
});

test.afterEach(() => {
  nightmare.end();
  nightmare = null;
  rimraf('./outputs/*', () => {});
});

test.serial('Create a animated gif', async t => {
  await nightmare
    .goto(`file://${__dirname}/fixtures/index.html`)
    .viewport(800, 600)
    .use(screenshotToGif.captureAs('a'))
    .click('button#red')
    .use(screenshotToGif.captureAs('a'))
    .click('button#blue')
    .end();

  await t.notThrows(() => {
    screenshotToGif.generate('a', './outputs');
  });

  let animatedGif;
  t.notThrows(() => {
    animatedGif = fs.statSync('./outputs/a.gif');
  });

  t.true(animatedGif.isFile());
});

test.serial('Create a animated gif with specific filename', async t => {
  await nightmare
    .goto(`file://${__dirname}/fixtures/index.html`)
    .viewport(800, 600)
    .use(screenshotToGif.captureAs('b'))
    .click('button#red')
    .use(screenshotToGif.captureAs('b'))
    .click('button#blue')
    .end();

  await t.notThrows(() => {
    screenshotToGif.generate('b', './outputs/b.gif');
  });

  let animatedGif;
  t.notThrows(() => {
    animatedGif = fs.statSync('./outputs/b.gif');
  });

  t.true(animatedGif.isFile());
});

test.serial('Create 2 animated gifs', async t => {
  await nightmare
    .goto(`file://${__dirname}/fixtures/index.html`)
    .viewport(800, 600)
    .use(screenshotToGif.captureAs('c'))
    .click('button#red')
    .use(screenshotToGif.captureAs('c'))
    .use(screenshotToGif.captureAs('d'))
    .click('button#blue')
    .use(screenshotToGif.captureAs('d'))
    .end();

  await t.notThrows(() => {
    screenshotToGif.generate('c', './outputs/c.gif');
    screenshotToGif.generate('d', './outputs/d.gif');
  });

  let c, d;
  t.notThrows(() => {
    c = fs.statSync('./outputs/c.gif');
    d = fs.statSync('./outputs/d.gif');
  });

  t.true(c.isFile());
  t.true(d.isFile());
});
