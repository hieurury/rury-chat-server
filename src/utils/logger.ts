import tutorials from "src/utils/tutorials";

const c = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  green:   '\x1b[32m',
  yellow:  '\x1b[33m',
  cyan:    '\x1b[36m',
  white:   '\x1b[37m',
  gray:    '\x1b[90m',
  bgGreen: '\x1b[42m',
  red:     '\x1b[31m',
};

const color = (code: string, text: string) => `${code}${text}${c.reset}`;

export const printBanner = (port: number, mongoStatus: string) => {
  const url       = color(c.cyan + c.bold, `http://localhost:${port}`);
  const prodUrl   = color(c.cyan + c.bold, 'https://chatserver.hieurury.id.vn');
  const mongo     = color(c.green + c.bold, mongoStatus);
  const divider   = color(c.gray, '─'.repeat(52));
  const tag       = color(c.bgGreen + c.bold, ' READY ');
  const tagMethod = color(c.yellow + c.bold, 'GET');
  const arrowDim  = color(c.gray, '›');
    console.clear();
    console.log(`
    ${divider}

    ${tag}  ${color(c.white + c.bold, 'Server is up and running')}

    ${arrowDim}  Local:    ${url}
    ${arrowDim}  Network:  ${prodUrl}
    ${arrowDim}  MongoDB:  ${mongo}
    ${divider}
        ${tagMethod}  Tutorials:
        ${Object.keys(tutorials).map(key => `\n        ${arrowDim}  ${key}:  ${color(c.green + c.bold, tutorials[key as keyof typeof tutorials])}`).join('')}
  `);
};