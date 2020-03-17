const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({headless:false,executablePath: '/media/sf_e/data/tmp/chrome/chrome',args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://baidu.com');
  await page.screenshot({path: '/tmp/example.png'});

  await browser.close();
})();

// 如果不加参数--no-sandbox, 程序会启动不起来
