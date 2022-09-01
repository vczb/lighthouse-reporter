const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const generateLighthoseReport = async (urls: string[]) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: [
      "accessibility",
      "best-practices",
      "performance",
      "pwa",
      "seo",
    ],
    port: chrome.port,
  };

  let data = [];

  for await (const url of urls) {
    const runnerResult = await lighthouse(url, options);

    const result = {
      url,
      accessibility: runnerResult.lhr.categories.accessibility.score * 100,
      best: runnerResult.lhr.categories["best-practices"].score * 100,
      performance: runnerResult.lhr.categories.performance.score * 100,
      pwa: runnerResult.lhr.categories.pwa.score * 100,
      seo: runnerResult.lhr.categories.seo.score * 100,
    };

    data.push(result);
    console.log("Report is done for", runnerResult.lhr.finalUrl);
  }

  console.log("Report finished");

  await chrome.kill();

  return data;
};

export default generateLighthoseReport;
