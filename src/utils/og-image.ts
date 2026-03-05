import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';

export async function generateOgImage(title: string, description: string, date: string) {
  // Load font files from public directory (resolved from project root)
  const fontData = fs.readFileSync(path.join(process.cwd(), 'public/fonts/inter-regular.ttf'));
  const fontDataBold = fs.readFileSync(path.join(process.cwd(), 'public/fonts/inter-bold.ttf'));

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0F0F13 0%, #1a1028 50%, #0F0F13 100%)',
          fontFamily: 'Inter',
        },
        children: [
          // Top bar with accent line
          {
            type: 'div',
            props: {
              style: {
                width: '80px',
                height: '4px',
                background: 'linear-gradient(90deg, #967FDB, #B8A4E8)',
                borderRadius: '2px',
              },
            },
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                flex: 1,
                justifyContent: 'center',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: title.length > 60 ? '40px' : '48px',
                      fontWeight: 700,
                      color: '#ffffff',
                      lineHeight: 1.2,
                      margin: 0,
                      letterSpacing: '-0.02em',
                    },
                    children: title,
                  },
                },
                description ? {
                  type: 'p',
                  props: {
                    style: {
                      fontSize: '20px',
                      color: '#94a3b8',
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: '85%',
                    },
                    children: description.length > 120 ? description.slice(0, 117) + '...' : description,
                  },
                } : null,
              ].filter(Boolean),
            },
          },
          // Bottom bar: author + date
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#e2e8f0',
                          },
                          children: 'Eliran Keren',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '18px',
                            color: '#475569',
                          },
                          children: '|',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: '18px',
                            color: '#B8A4E8',
                          },
                          children: 'Deeplica',
                        },
                      },
                    ],
                  },
                },
                date ? {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '16px',
                      color: '#64748b',
                    },
                    children: date,
                  },
                } : null,
              ].filter(Boolean),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fontDataBold,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
