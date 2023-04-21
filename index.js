const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://habr.com/ru/all/');

    const data = await page.evaluate(() => {

        const titles = [];
        const descriptions = [];


        const titleElement = document.querySelectorAll('h2.tm-title a');
        // const title = titleElement ? titleElement.innerText : '';
      
        const bodyElement = document.querySelectorAll('.article-formatted-body');
        // const description = bodyElement ? bodyElement.innerText : '';
      
        titleElement.forEach(item => {
            titles.push(item.innerText);
        });

        bodyElement.forEach(item => {
            descriptions.push(item.innerText);
        });

        return { titles, descriptions };
      });
      
      const html = `
    <ul>
        ${data.titles.map((title, index) => `
            <li>
                <h2>${title}</h2>
                <p>${data.descriptions[index]}</p>
            </li>
        `).join('')}
    </ul>
`;

    fs.writeFile('index.html', html, err => {
        if (err) throw err;
        console.log('Изменения сохранены в файл index.html');
    });

    await browser.close();
})();

async function getPic() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/index.html');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await browser.close();
}

// getPic();