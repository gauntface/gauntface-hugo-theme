# Gauntface Hugo Theme

![Build and Publish to NPM](https://github.com/gauntface/gauntface-hugo-theme/workflows/Build%20and%20Publish/badge.svg)

This repo contains a theme to use with gauntface.com

## Installing

### Step 1: Install via NPM

```
npm install --save @gauntface/hugo-theme
```

### Step 2: Use via Gulp

```
const gftheme = require('@gauntface/hugo-theme');

gulp.task('gauntface-theme', () => {
  return gftheme.copyTheme(path.join(__dirname, `themes`, 'gauntface'));
})
```

### Step 3: Add to Config

Then add the `hopin-styleguide` to your sites config:

```
{
    "baseURL": "...",
    "languageCode": "...",
    "title": "...",
    "publishDir": ".public",

    "theme": ["...", "gauntface", "hopin-base-theme"],
}
```

### Step 4: Add parameters

There are a few optional parameters you will might want to set in your site config:

```
{
    "params": {
        "description": "This is the site description",
        "themecolor": "#C0FFEE",
        "googleanalytics": "UA-123456789-1"
    }
}
```