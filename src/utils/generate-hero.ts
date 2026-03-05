/**
 * Blog Hero Image Generator
 * Uses Gemini 3 Pro Image (Nano Banana Pro) + Deeplica Design System
 *
 * Generates a branded hero image for each blog post, in Deeplica's
 * architectural watercolor visual language.
 *
 * Usage:
 *   npx tsx src/utils/generate-hero.ts "Post Title" "Short description" "slug-name"
 */

import fs from 'node:fs';
import path from 'node:path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDckOv4NtmIjOu3udN4KNGQ-l8SZwx0MJQ';
const GEMINI_MODEL = 'gemini-3-pro-image-preview';
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/heroes');

// ─── Deeplica Design System Prompt Builder ───────────────────────────

const DEEPLICA_PREFIX = `soft architectural watercolor illustration, editorial illustration style,
minimalist systems infrastructure, pastel color palette, soft pencil outlines,
subtle isometric perspective, large negative space,
Deeplica purple and soft sand tones, calm intelligent atmosphere`;

const DEEPLICA_NEGATIVE = `no robots, no humanoid AI, no glowing brain, no neural networks,
no cyberpunk, no matrix grids, no neon lighting, no photorealism,
no metallic sci-fi surfaces, no text, no words, no letters, no typography`;

/**
 * Maps blog post content themes to Deeplica visual motifs
 */
function buildDeplicaPrompt(title: string, description: string): string {
  const content = `${title} ${description}`.toLowerCase();

  // Detect themes and map to Deeplica visual motifs
  let motifs: string[] = [];

  if (content.includes('decision') || content.includes('choice') || content.includes('priorit')) {
    motifs.push('archways symbolizing decision gates');
    motifs.push('branching flow channels representing choices');
    motifs.push('a calm figure standing at a crossroads within infrastructure');
  }

  if (content.includes('system') || content.includes('infrastructure') || content.includes('architect')) {
    motifs.push('central orchestration brain with radiating flow channels');
    motifs.push('stacked architectural platforms');
    motifs.push('bridges connecting system layers');
  }

  if (content.includes('founder') || content.includes('ceo') || content.includes('operator')) {
    motifs.push('a calm human figure at the center of a coordination system');
    motifs.push('work islands with flowing task channels');
    motifs.push('signal lights indicating system activity');
  }

  if (content.includes('ai') || content.includes('automation') || content.includes('agent')) {
    motifs.push('flowing infrastructure channels connecting multiple platforms');
    motifs.push('a silent conductor orchestrating calm coordination');
    motifs.push('nodes representing integrations');
  }

  if (content.includes('productivity') || content.includes('workflow') || content.includes('pipeline')) {
    motifs.push('curved flowing channels representing task execution');
    motifs.push('work islands connected by bridges');
    motifs.push('loops transitioning from open to closed');
  }

  if (content.includes('content') || content.includes('writing') || content.includes('blog')) {
    motifs.push('flow channels carrying information through platforms');
    motifs.push('small work islands where creation happens');
    motifs.push('gentle signal lights marking progress');
  }

  if (content.includes('team') || content.includes('collaboration') || content.includes('communication')) {
    motifs.push('multiple human figures working across connected platforms');
    motifs.push('bridges linking work islands');
    motifs.push('flowing channels between team nodes');
  }

  // Default motifs if nothing specific matched
  if (motifs.length === 0) {
    motifs.push('central orchestration spine with flowing coordination channels');
    motifs.push('calm architectural platforms in soft purple tones');
    motifs.push('a human figure within a quiet infrastructure landscape');
  }

  // Take top 3 motifs max
  const selectedMotifs = motifs.slice(0, 3).join(', ');

  return `${DEEPLICA_PREFIX},
${selectedMotifs},
architectural watercolor illustration, large negative space, soft pastel tones,
the image represents the concept: "${title}".
${DEEPLICA_NEGATIVE}`;
}

// ─── Gemini API Call ─────────────────────────────────────────────────

async function generateImage(prompt: string): Promise<Buffer | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': GEMINI_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
        imageConfig: {
          aspectRatio: '16:9',
          imageSize: '2K',
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`Gemini API error (${response.status}):`, error);
    return null;
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  // REST API uses camelCase (inlineData), Python SDK uses snake_case (inline_data)
  const imagePart = parts.find((p: any) => p.inlineData || p.inline_data);

  if (!imagePart) {
    console.error('No image returned from Gemini');
    const textPart = parts.find((p: any) => p.text);
    if (textPart) console.log('Response text:', textPart.text);
    console.log('Parts received:', JSON.stringify(parts.map((p: any) => Object.keys(p)), null, 2));
    return null;
  }

  const imageData = imagePart.inlineData || imagePart.inline_data;
  return Buffer.from(imageData.data, 'base64');
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('Usage: npx tsx src/utils/generate-hero.ts "Title" "Description" "slug"');
    console.log('Example: npx tsx src/utils/generate-hero.ts "The Decision Debt" "Why unmade decisions cost more than technical debt" "decision-debt"');
    process.exit(1);
  }

  const [title, description, slug] = args;

  console.log(`\n🎨 Generating Deeplica hero image for: "${title}"`);
  console.log(`📝 Description: ${description}`);
  console.log(`📁 Slug: ${slug}\n`);

  // Build Deeplica-style prompt
  const prompt = buildDeplicaPrompt(title, description);
  console.log('🖌️  Prompt:\n', prompt, '\n');

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Generate image
  console.log('⏳ Calling Gemini 3 Pro Image...');
  const imageData = await generateImage(prompt);

  if (!imageData) {
    console.error('❌ Failed to generate image');
    process.exit(1);
  }

  // Save image
  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
  fs.writeFileSync(outputPath, imageData);
  console.log(`✅ Hero image saved: ${outputPath}`);
  console.log(`\n📋 Add to your post frontmatter:`);
  console.log(`   heroImage: /blog/images/heroes/${slug}.png`);
}

main().catch(console.error);
