import settings from '../config';

const puppeteer = require('puppeteer');

async function getNextPage(page) {
  return page.evaluate(() => document
    .querySelector(
      'div.dataTables_paginate > ul.pagination > li.next > a[title=Next]'
    )
    .click());
}

async function extractCurrentPageRows(page, columnNames) {
  return page.$$eval(
    'table[data-url="dates"] > tbody > tr',
    (rows, columns) => {
      const allRowsInPage = [];
      rows.forEach((row) => {
        const rowObject = {};
        columns.forEach((column, index) => {
          if (index === 0) {
            rowObject[column] = Date.parse(row.children[index].children[0].innerText);
          } else {
            rowObject[column] = row.children[index]?.innerText?.trim().replace(/^\$|%$|,/g, '');
          }
        });
        allRowsInPage.push(rowObject);
      });
      return allRowsInPage;
    },
    columnNames
  );
}

async function extractColumnNames(page) {
  return page.$$eval(
    'table[data-url="dates"] > thead > tr.heading > th',
    (columnHeaders) => columnHeaders.map((columnHeader) => columnHeader.getAttribute('data-data'))
  );
}

async function waitTillLoader(page) {
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('.blockOverlay')).length !== 0
  );
  await page.waitForFunction(
    () => Array.from(document.querySelectorAll('.blockOverlay')).length === 0
  );
}

async function checkNextButton(page) {
  return page.$eval(
    'div.dataTables_paginate > ul.pagination > li.next',
    (nextButton) => nextButton.getAttribute('class').includes('disabled')
  );
}

async function login(page) {
  await page.goto('https://develop.pub.afflu.net/login/');

  await page.type('input[name=username]', settings.affluentUserName);
  await page.type('input[name=password]', settings.affluentUserPassword);
  await Promise.all([
    page.click('button[type=submit]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);
}

async function selectAllColumns(page) {
  await page.$eval('a[href=\'#setupColumns2\']', (columnSetup) => columnSetup.click());
  await page.$$eval(
    '#setupColumns2 div.right-list ol.dd-list > li > button',
    (columns) => columns.forEach((column) => column.click())
  );

  await page.$eval(
    '#setupColumns2 button[onclick="TABLES.saveColumns2()"]',
    (saveColumnSetup) => saveColumnSetup.click()
  );
}
export default async function extractDatewiseData(startDate = '2019-04-30', endDate = '2020-04-01') {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [ '--disable-notifications', '--allow-silent-push' ],
      slowMo: 50,
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(180000);
    await login(page);

    await Promise.all([
      page.goto(
        // 'https://develop.pub.afflu.net/list?type=dates&startDate=2020-03-20&endDate=2020-04-01'
        `https://develop.pub.afflu.net/list?type=dates&startDate=${startDate}&endDate=${endDate}`
      ),
      // page.goto("https://develop.pub.afflu.net/list?type=dates"),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    await selectAllColumns(page);
    await waitTillLoader(page);

    const columnNames = await extractColumnNames(page);

    let allDataRows = [];
    let isNextDisabled;
    do {
      isNextDisabled = await checkNextButton(page);
      const extractedRows = await extractCurrentPageRows(page, columnNames);
      allDataRows = allDataRows.concat(extractedRows);
      !isNextDisabled && (await getNextPage(page));
      !isNextDisabled && (await waitTillLoader(page));
    } while (!isNextDisabled);
    await browser.close();
    return {
      success: true,
      rows: allDataRows,
    };
  } catch (err) {
    browser ?? (await browser.close());
    return {
      success: false,
    };
  }
}
