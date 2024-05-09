import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Correct way to find directory path in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sourcePath = path.join(__dirname, 'docs', 'index.html')
const targetPath = path.join(__dirname, 'docs', '404.html')

// Copy index.html to 404.html
fs.copyFileSync(sourcePath, targetPath)

// Add redirect script to 404.html
const redirectScript = `
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var location = window.location.href;
    var redirectedUrl = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirectedUrl && redirectedUrl != location) {
      history.replaceState(null, null, redirectedUrl);
    }
  });
</script>
`

let content = fs.readFileSync(targetPath, 'utf8')
content = content.replace('</head>', `${redirectScript}\n</head>`)
fs.writeFileSync(targetPath, content, 'utf8')
