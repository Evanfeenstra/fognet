module.exports = {
  webpack: (config, { dev }) => {
    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    )
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif)$/i,
        loaders: [
          'file-loader?outputPath=static/',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ,
      {
        test: /\.worker\.js$/,
        use: { 
          loader: 'worker-loader',
          options: { inline: true }
        }
      }
    )
    return config
  }
}