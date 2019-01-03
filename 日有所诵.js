'use strict';

const puppeteer = require('puppeteer');

const url = '...';

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

async function delay(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      resolve();
    }, time);
  });
};

(async() => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto(url);

  await delay(10000); //delay 10 sec  延时10秒，用来手工选择列表
//  page.waitFor(200000); // does not work 发现不起作用
//  sleep(50000);  // does not work 发现不起作用

  const resultsSelector = 'tbody a';
  await page.waitForSelector(resultsSelector);
  // Extract the results from the page.
  const data = await page.evaluate(resultsSelector => {
    const anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      const title = anchor.textContent.trim();
      const url = `${anchor.href}`;
  //    return `${anchor.href}`;
      return ({
         'title' : title,
         'url'   : url});
    });
  }, resultsSelector); 

  var index;
  for (index in data) {
      const title = data[index].title;
      const url2 = data[index].url;
      console.log(title + '    ' + url2);
      const page2 = await browser.newPage();
      await page2.goto(url2);
      const selector = '#free_down_link';
      await page2.waitForSelector(selector);
      await page2.click(selector);
      await page2.waitFor(20000); // delay 20 sec  延时20秒，等文件完全下载完再关闭下载的页面
      await page2.close(); 
    //  break;
  } 

  // await browser.close();
})();


