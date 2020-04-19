const gulp = require('gulp');
const path = require('path');
const spawn = require('child_process').spawn;

const tsBrowser = require('@hopin/wbt-ts-browser');
const css = require('@hopin/wbt-css');
const clean = require('@hopin/wbt-clean');
const html = require('@hopin/wbt-html-assets');
const fs = require('fs-extra');
const browserSync = require('browser-sync').create();

const hopinstyleguide = require('@hopin/hugo-styleguide');
const basetheme = require('@hopin/hugo-base-theme');
const gftheme = require('./index');

/**
 * Build theme package
 */
const themeSrc = path.join(__dirname, 'src');
const themeDst = path.join(__dirname, 'build');

gulp.task('clean', gulp.series(
  clean.gulpClean([
    themeDst,
  ]),
))

gulp.task('typescript', gulp.series(
  tsBrowser.gulpBuild('gauntface.theme', {
    src: themeSrc,
    dst: themeDst,
  })
))

gulp.task('css', gulp.series(
  css.gulpBuild({
    src: themeSrc,
    dst: themeDst,
  }, {
    importPaths: [themeSrc],
    preserve: false,
    cssVariablesDir: path.join(__dirname, 'src', 'static', 'css', 'variables'),
  }),
))

gulp.task('copy', gulp.series(
  () => {
    return gulp.src(path.join(themeSrc, '**/*.{toml,json,html,svg,jpg,jpeg,gif,png,js}'))
      .pipe(gulp.dest(themeDst));
  }
))

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'typescript',
    'css',
    'copy',
  ),
))

/**
 * Build styleguide site
 */

const styleguideDir = path.join(__dirname, 'styleguide');
const styleguidePublicDir = path.join(__dirname, 'styleguide', 'public');

gulp.task('clean-example', gulp.series(
  clean.gulpClean([
    path.join(styleguideDir, 'public'),
    path.join(styleguideDir, 'themes'),
    path.join(styleguideDir, 'content'),
  ])
))

gulp.task('gauntface-theme', async () => {
  const themeDir = path.join(styleguideDir, 'themes', 'gauntface')

  await fs.remove(themeDir);

  await gftheme.copyTheme(themeDir);
})

gulp.task('styleguide-theme', async () => {
  const themeDir = path.join(styleguideDir, 'themes', 'hopin-styleguide')
  const contentDir = path.join(styleguideDir, 'content');

  await fs.remove(themeDir);
  await fs.remove(contentDir);

  await hopinstyleguide.copyTheme(themeDir);
  await hopinstyleguide.copyContent(contentDir);
})

gulp.task('base-theme', async () => {
  const themeDir = path.join(styleguideDir, 'themes', 'hopin-base-theme')

  await fs.remove(themeDir);

  await basetheme.copyTheme(themeDir);
})

gulp.task('themes', gulp.parallel(
  'gauntface-theme',
  'styleguide-theme',
  'base-theme',
))

gulp.task('hugo-version', () => {
  return new Promise((resolve, reject) => {
    const versionCmd = spawn('hugo', ['version'], {
      stdio: 'inherit',
      cwd: styleguideDir,
    });
    versionCmd.on('error', (err) => {
      console.error('Failed to run hugo server: ', err);
      reject(err);
    });
    versionCmd.addListener('exit', (code) => {
      if (code != 0) {
        reject(new Error(`Exited with non-zero code '${code}'`));
        return
      }
      resolve();
    });
  });
})

gulp.task('hugo-build', () => {
  return new Promise((resolve, reject) => {
    const buildCmd = spawn('hugo', [], {
      stdio: 'inherit',
      cwd: styleguideDir,
    });
    buildCmd.on('error', (err) => {
      console.error('Failed to run hugo server: ', err);
      reject(err);
    });
    buildCmd.addListener('exit', (code) => {
      if (code != 0) {
        reject(new Error(`Exited with non-zero code '${code}'`));
        return
      }
      resolve();
    });
  });
})

gulp.task('html', html.gulpProcessFiles({
  htmlPath: styleguidePublicDir,
})
);

gulp.task('build-styleguide', gulp.series(
  gulp.parallel(
    'build',
    'clean-example',
  ),
  'themes',
  'hugo-version',
  'hugo-build',
  'html',
))

/**
 * The following are tasks are helpful for local dev and testing
 */

let serverInstance;

async function startServer() {
  serverInstance = spawn('hugo', ['server', '-D', '--ignoreCache', '--port=1314'], {
    stdio: 'inherit',
    cwd: styleguideDir,
  });
  serverInstance.on('error', (err) => {
    console.error('Failed to run hugo server: ', err);
  });
  serverInstance.addListener('exit', (code) => {
    console.error('Hugo server has exited: ', code);
    setTimeout(startServer, 500);
  });
}

gulp.task('hugo-server', startServer);

gulp.task('restart-server', async () => {
  if (!serverInstance) {
    return;
  }
  serverInstance.kill();
});

gulp.task('watch-theme', () => {
  const opts = {
    ignoreInitial: false,
  };
  return gulp.watch(
    [path.join(themeSrc, '**', '*')],
    opts,
    gulp.series('build', 'gauntface-theme', 'restart-server'),
  );
});

gulp.task('watch',
  gulp.series(
    'build',
    'themes',
    gulp.parallel(
      'watch-theme',
      'hugo-server',
    ),
  )
);

gulp.task('browser-sync', async () => {
  browserSync.init({
    server: {
      baseDir: styleguidePublicDir,
    }
  });
});

gulp.task('prod',
  gulp.series(
    'build-styleguide',
    'browser-sync',
  )
);