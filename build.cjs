const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy all HTML files to dist
const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
htmlFiles.forEach(file => {
  fs.copyFileSync(file, path.join('dist', file));
  console.log(`Copied ${file} to dist/`);
});

// Copy CSS directory to dist
if (fs.existsSync('css')) {
  if (!fs.existsSync('dist/css')) {
    fs.mkdirSync('dist/css', { recursive: true });
  }
  fs.readdirSync('css').forEach(file => {
    fs.copyFileSync(path.join('css', file), path.join('dist', 'css', file));
    console.log(`Copied css/${file} to dist/css/`);
  });
}

// Copy JS directory to dist
if (fs.existsSync('js')) {
  if (!fs.existsSync('dist/js')) {
    fs.mkdirSync('dist/js', { recursive: true });
  }
  fs.readdirSync('js').forEach(file => {
    fs.copyFileSync(path.join('js', file), path.join('dist', 'js', file));
    console.log(`Copied js/${file} to dist/js/`);
  });
}

console.log('Build complete!');