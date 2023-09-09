module.exports.sanitizeFileName = (fileName) => {
  // Replace spaces and other potentially problematic characters
  return fileName.replace(/[^\w.-]/g, '_');
};
