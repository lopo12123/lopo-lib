## lopo-lib  

### Installation  
`npm install lopo-lib`  

### Usage  
✨ **This package contains built-in TypeScript declarations.**  
😓 **If your editor doesn't detect full ts support, try importing from a more specific location.**  

| usage | js 🤮 | ts 😋 |  |  
| --- | --- | --- | --- |
| `import { [className] } from 'lopo-lib'` | ✅ | ✅ | ✨ |  
|  |  
| `import { [className] } from 'lopo-lib/lib'` | ❌ | ✅ |  
| `import { [className] } from 'lopo-lib/lib/index[.ts]'` | ❌ | ✅ |  
| `import { [className] } from 'lopo-lib/lib[module-name[.ts]]'` | ❌ | ✅ | 😋 |
|  |  
| `import { [className] } from 'lopo-lib/dist'` | ✅ | ✅ |  
| `import { [className] } from 'lopo-lib/dist/index[.js]'` | ✅ | ✅ |  
| `import { [className] } from 'lopo-lib/dist[/module-name[.js]]'` | ✅ | ✅ | 😋 |  
|  |  
| `const { [className] } = require('lopo-lib')` | ✅ | ✅ | ✨ |  
|  |  
| `const { [className] } = require('lopo-lib/lib')` | ❌ | ✅ |  
| `const { [className] } = require('lopo-lib/lib/index[.ts]')` | ❌ | ✅ |
| `const { [className] } = require('lopo-lib/lib[/module-name[.ts]]` | ❌ | ✅ | 😋 |  
|  |  
| `const { [className] } = require('lopo-lib/dist')` | ✅ | ✅ |  
| `const { [className] } = require('lopo-lib/dist/index[.ts]')` | ✅ | ✅ |  
| `const { [className] } = require('lopo-lib/dist[/module-name[.ts]]` | ✅ | ✅ | 😋 |   


### Docs  

[click here](https://lopo12123.github.io/lopo-lib)

