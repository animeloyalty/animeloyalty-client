module.exports = {
  resolve: {
    alias: {
      '@nestjs/swagger': `${__dirname}/webpack/@nestjs/swagger`,
      'animesync': `${__dirname}/webpack/animesync`,
      'class-transformer': `${__dirname}/webpack/class-transformer`,
      'class-validator': `${__dirname}/webpack/class-validator`,
      'node-fetch': `${__dirname}/webpack/node-fetch`
    }
  }
};
