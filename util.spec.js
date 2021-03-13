const puppeteer = require('puppeteer');
const { generateText } = require('./util');

//The visual test use to take long, so have to change the timeout of jest
jest.setTimeout(30000);

//Unit test for util functions
//Testing partitions
test('should output name and age', () => {
  const text = generateText('Thiago', 33);
  expect(text).toBe('Thiago (33 years old)');
  const text2 = generateText('Raimunda', 56);
  expect(text2).toBe('Raimunda (56 years old)');
});

//Testing null inputs
test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)');
});

//Testing empty input
test('should output data-less text', () => {
  const text = generateText();
  expect(text).toBe('undefined (undefined years old)');
});

//e2e Tests
test('should open google', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto('http://www.google.com');
  await page.click('input[name="q"]');
  await page.type('input[name="q"]', 'test', { delay: 100 });
  //await page.type('#q', 'test', { delay: 100 });

  await page.close();
});

//e2e test with evidence
test('should make an youtube search and print the page', async () => {
  const screenshot = 'youtube.png';
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 20,
    args: ['--window-size=1920,1080'],
  });
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://youtube.com');
  await page.type('#search', 'Fleetwood Mac Dreams');
  await page.click('button#search-icon-legacy');
  await page.waitForSelector('ytd-thumbnail.ytd-video-renderer');
  await page.screenshot({ path: 'youtube_fm_dreams_list.png' });
  const videos = await page.$$('ytd-thumbnail.ytd-video-renderer');
  await videos[2].click();
  await page.waitForSelector('.html5-video-container');
  await page.screenshot({ path: screenshot });
  await browser.close();
  console.log('See screenshot: ' + screenshot);
});
