const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const ngExpressions = require('angular-expressions');
const angularParser = function (tag) {
  return {
    get: tag === '.' ? function (s) {
      return s;
    } : function (s) {
      return ngExpressions.compile(tag.replace(/’/g, '\''))(s);
    }
  };
};

export const createDoc = (templatePath: string, data: any) => {
  // load the docx file as a binary
  const content = fs.readFileSync(templatePath, 'binary');
  const zip = new JSZip(content);
  const doc = new Docxtemplater();
  doc.loadZip(zip);
  doc.setOptions({ parser: angularParser });

  doc.setData(data);

  return new Promise((resolve, reject) => {
    try {
      doc.render();
    } catch (error) {
      reject(error);
      return;
    }

    const buffer = doc.getZip()
      .generate({ type: 'nodebuffer' });
    resolve(buffer);
  });
};
