// Style Dictionary pipeline: tokens/**/*.json (W3C DTCG format) -> src/styles/tokens/*.css
//
// All token $values are authored as final, ready-to-use CSS strings (e.g. "0.25rem",
// "#2f7f5f", "cubic-bezier(0.4, 0, 0.2, 1)"), so the CSS output only needs name
// generation + $-reference resolution — no unit/color value transforms are registered.
// This keeps the pipeline predictable and easy to extend to new platforms (iOS/Android/
// JS) later without revisiting how values were authored.
import StyleDictionary from 'style-dictionary';

const CORE_SOURCE = ['tokens/core/**/*.json'];

const sd = new StyleDictionary({
  source: CORE_SOURCE,
  log: { verbosity: 'verbose' },
  platforms: {
    core: {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'tokens-core.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: false },
        },
      ],
    },
  },
});

const sdLight = new StyleDictionary({
  source: [...CORE_SOURCE, 'tokens/semantic/light.json'],
  log: { verbosity: 'verbose' },
  platforms: {
    light: {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'tokens-light.css',
          format: 'css/variables',
          options: { selector: ':root', outputReferences: false },
          filter: (token) => token.filePath === 'tokens/semantic/light.json',
        },
      ],
    },
  },
});

const sdDark = new StyleDictionary({
  source: [...CORE_SOURCE, 'tokens/semantic/dark.json'],
  log: { verbosity: 'verbose' },
  platforms: {
    dark: {
      transforms: ['attribute/cti', 'name/kebab'],
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'tokens-dark.css',
          format: 'css/variables',
          options: { selector: '.dark', outputReferences: false },
          filter: (token) => token.filePath === 'tokens/semantic/dark.json',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
await sdLight.buildAllPlatforms();
await sdDark.buildAllPlatforms();
