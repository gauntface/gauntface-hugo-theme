# Gauntface Hugo Theme

[![Build and Test](https://github.com/gauntface/gauntface-hugo-theme/workflows/Build%20and%20Test/badge.svg)](https://github.com/gauntface/gauntface-hugo-theme/actions?query=workflow%3A%22Build+and+Test%22) [![Publish](https://github.com/gauntface/gauntface-hugo-theme/workflows/Publish/badge.svg)](https://github.com/gauntface/gauntface-hugo-theme/actions?query=workflow%3APublish)

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