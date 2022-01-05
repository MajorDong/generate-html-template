const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  // launch headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('title');

  const htmlTag = 'script';
  await page.evaluate((tagName) => {
    const elements = document.querySelectorAll(tagName);
    for (let i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  }, htmlTag);


  const html = await page.content();
  fs.writeFile(path.resolve('./page.html'), html, _ => console.log('HTML saved'));

  await browser.close();
})();