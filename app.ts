const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const url = "https://vczb.github.io/";

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance", "seo"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(url, options);

  const report = runnerResult.report;
  fs.writeFileSync("lhreport.json", report);
  console.log("Report is done for", runnerResult.lhr.finalUrl);

  const result = {
    performance: runnerResult.lhr.categories.performance.score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
  };

  console.log("Score was:\n", result);

  await chrome.kill();
})();
