import asyncio, glob, os
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 700, "height": 560})
        for svgfile in sorted(glob.glob("*.svg")):
            svg = open(svgfile).read()
            html = f"<html><body style='margin:0;padding:20px;background:#fff'>{svg}</body></html>"
            await page.set_content(html)
            await page.wait_for_timeout(150)
            out = svgfile.replace(".svg", ".png")
            el = await page.query_selector("svg")
            await el.screenshot(path=out)
            print("rendered", out)
        await browser.close()

asyncio.run(main())
