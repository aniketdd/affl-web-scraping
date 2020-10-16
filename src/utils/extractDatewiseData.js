/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');

async function getNextPage(page) {
  return page.evaluate(() =>
    document
      .querySelector(
        'div.dataTables_paginate > ul.pagination > li.next > a[title=Next]'
      )
      .click()
  );
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
    (columnHeaders) =>
      columnHeaders.map((columnHeader) =>
        columnHeader.getAttribute('data-data')
      )
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

  await page.type('input[name=username]', 'developertest@affluent.io');
  await page.type('input[name=password]', 'SOpcR^37');
  // click and wait for navigation
  await Promise.all([
    page.click('button[type=submit]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);
}

/* async function selectDateRange(page) {
  // await page.click("#dashboard-report-range");
  await page.evaluate(() =>
    document.getElementById('dashboard-report-range').click()
  );
  await page.$eval(
    'input[name=daterangepicker_start]',
    (el) => (el.value = '02/30/2020')
  );
  // await page.type("input[name=daterangepicker_start]", "02/30/2020"); // "04/30/2019"
  await page.$eval('input[name=daterangepicker_end]', (el) => (el.value = ''));
  await page.type('input[name=daterangepicker_end]', '04/01/2020', {
    delay: 300,
  }); // "04/01/2020"
} */

async function selectAllColumns(page) {
  await page.$eval("a[href='#setupColumns2']", (columnSetup) =>
    columnSetup.click()
  );
  await page.$$eval(
    '#setupColumns2 div.right-list ol.dd-list > li > button',
    (columns) => columns.forEach((column) => column.click())
  );

  await page.$eval(
    '#setupColumns2 button[onclick="TABLES.saveColumns2()"]',
    (saveColumnSetup) => saveColumnSetup.click()
  );
}
export default async function extractDatewiseData(startDate = '2019-04-30', endDate='2020-04-01') {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [ '--disable-notifications', '--allow-silent-push' ],
      slowMo: 50,
    });

    const page = await browser.newPage();
    page.setDefaultTimeout(60000);
    await login(page);

    await Promise.all([
      page.goto(
        // 'https://develop.pub.afflu.net/list?type=dates&startDate=2020-03-20&endDate=2020-04-01'
        `https://develop.pub.afflu.net/list?type=dates&startDate=${startDate}&endDate=${endDate}`
      ),
      // page.goto("https://develop.pub.afflu.net/list?type=dates"),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    /* await selectDateRange(page);
    // await page.focus("div.range_inputs > button.applyBtn");
    await Promise.all([
      page.click("div.range_inputs > button.applyBtn"),
      // page.evaluate(() =>
      //   document.querySelector("div.range_inputs > button.applyBtn").click()
      // ),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]); */
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
    console.log(`final lenght:${allDataRows.length}`);
    console.log(allDataRows);
    await browser.close();
    return {
      success: true,
      rows: allDataRows,
    };
  } catch (err) {
    console.error(err);
    browser && (await browser.close());
    return {
      success: false,
    };
  }
}


