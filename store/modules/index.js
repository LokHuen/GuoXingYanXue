/**
 * 该文件将当前文件夹下的所有.js结尾的文件全部读取出来。
 * 并导出去
 */

 const files = require.context('.', true, /\.js$/)
 const modules = {}
 
 files.keys().forEach(key => {
   // 过滤本身
   if (key === './index.js') return;
   // 切割key的首尾
   const temp = key.replace('./', '').replace('.js', '').split('/');
   const count = temp.length;
   // 如果有子文件夹，导入文件夹名字和文件夹下的 index.js文件
   if (count > 1 && temp[count - 1] !== 'index') return;
   modules[temp[0]] = files(key).default;
 });
 
 export default modules
 