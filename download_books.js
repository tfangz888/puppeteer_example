// mkdir
// sudo aptitude install libnss3
// npm i puppeteer
// npm init
// npm install

'use strict';

const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('http://bjzc.org/lib/');

  const resultsSelector = 'tbody a';
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  const links = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const title = anchor.textContent.trim();
      return `${anchor.href}`;
    });
  }, resultsSelector);
  
  var index;
  for (index in links) {
    console.log(links[index]);
    if (links[index].substr(-3) == "pdf"){
      continue;
    }
    const page2 = await browser.newPage();
    await page2.goto(links[index]);
    const booksSelector = 'tbody a';
    await page2.waitForSelector(booksSelector);
    const links2 = await page2.evaluate(booksSelector => {
    const anchors2 = Array.from(document.querySelectorAll(booksSelector));
      return anchors2.map(anchor2 => {
        const title2 = anchor2.textContent.trim();
        return `${title2} ---- ${anchor2.href}`;
      });
    }, booksSelector);
  console.log(links2.join('\n'));
  await page2.close();
  }

  // await browser.close();
})();


