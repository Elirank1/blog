import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 900, "height": 1200})
        await page.goto("http://localhost:4321/blog/blog/2026-10-30-ai-deployment-is-becoming-an-industry/", wait_until="networkidle")
        await page.screenshot(path="page_top.png", full_page=False)
        # scroll to hero figure
        el = await page.query_selector(".essay-figure")
        if el:
            await el.scroll_into_view_if_needed()
            await page.wait_for_timeout(200)
            await page.screenshot(path="page_hero_figure.png", full_page=False)
        figs = await page.query_selector_all(".essay-figure")
        print("num figures found:", len(figs))
        for i, f in enumerate(figs):
            await f.scroll_into_view_if_needed()
            await page.wait_for_timeout(150)
            await f.screenshot(path=f"live_figure_{i}.png")
        await browser.close()

asyncio.run(main())
