const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080');

  // Wait for preloader to finish (assuming it takes a few seconds)
  await page.waitForSelector('#main-menu', { state: 'visible', timeout: 30000 });
  await page.screenshot({ path: 'v_menu.png' });

  // Start game
  await page.click('#start-game');

  // Wait for office
  await page.waitForSelector('#game-screen.active', { timeout: 30000 });
  await page.screenshot({ path: 'v_office_start.png' });

  // Check tutorial visibility
  const tutorialVisible = await page.isVisible('#tutorial-overlay:not(.hidden)');
  console.log('Tutorial visible:', tutorialVisible);
  if (tutorialVisible) {
      await page.screenshot({ path: 'v_tutorial.png' });
      // Click GOT IT
      await page.click('#tutorial-got-it');
      await page.waitForSelector('#tutorial-overlay.hidden');
      console.log('Tutorial dismissed');
  }

  // Pan Right to see CAMERA button
  // We need to move mouse to right edge
  await page.mouse.move(750, 300); // Assuming 800x600 default
  await page.waitForTimeout(2000); // Wait for rotation
  await page.screenshot({ path: 'v_office_right.png' });

  // Pan Left to see VENTS button
  await page.mouse.move(50, 300);
  await page.waitForTimeout(4000); // Wait for rotation back to left
  await page.screenshot({ path: 'v_office_left.png' });

  await browser.close();
})();
