const puppeteer = require('puppeteer')


async function dataScrap(url, userName){

  const browser = await puppeteer.launch({headless : false});
  const page = await browser.newPage();
  await page.goto(url,{ waitUntil: "domcontentloaded" });

  const names = await page.evaluate(()=>{
    const  data =Array.from(document.querySelectorAll(".seller-name a")).map(x=>x.innerText);
    return data;
  })

  browser.close()
  return names
}


export default function handler(req, res) {
  dataScrap("https://www.fiverr.com/search/gigs?query=laravel&source=top-bar&search_in=everywhere&search-autocomplete-original-term=laravel","raihan").then(user=>{
    res.status(200).json({ user })
  })
}
