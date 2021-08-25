let plugins = [
  // vant插件的按需加载
  [
    'import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
]

//在打包的时候，加入移除控制台输出插件
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}


// 得到时间戳
const Timestamp = new Date().getTime();


module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: plugins,
}