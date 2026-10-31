import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 900, "height": 1000})
        await page.goto("http://localhost:4321/blog/blog/2026-10-30-ai-deployment-is-becoming-an-industry/", wait_until="networkidle")
        # try to find and click a dark mode toggle
        btn = await page.query_selector("button")
        html = await page.content()
        if 'data-theme' in html:
            print("has data-theme attr in markup")
        # try clicking the sun/moon icon near top right
        try:
            await page.click("text=☀", timeout=1000)
        except Exception as e:
            print("click by text failed", e)
        await page.wait_for_timeout(300)
        theme = await page.evaluate("document.documentElement.getAttribute('data-theme')")
        print("theme after click attempt:", theme)
        figs = await page.query_selector_all(".essay-figure")
        if figs:
            await figs[0].scroll_into_view_if_needed()
            await page.wait_for_timeout(200)
            await page.screenshot(path="dark_mode_check.png")
        await browser.close()

asyncio.run(main())
