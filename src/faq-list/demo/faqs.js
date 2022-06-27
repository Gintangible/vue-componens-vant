const FAQ = [{
  problem: 'nofilter',
  answer: 'nofilter<br>nofilternofilternofilternofilternofilternofilter',
}, {
  filter: ['f1', 'f2'],
  problem: '问题1',
  answer: '换行换行换行换行问题1的回答<br>问题1的回答问题1的回-换行\n问题1的回答问题1的回答问题1的回答问题1的回答问题1的回答',
}, {
  filter: ['f1', 'f2'],
  problem: '问题2',
  answer: '问题2的回答问<br>题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答问题2的回答',
},{
  filter: ['f1'],
  problem: '只显示f1',
  answer: '只显示f1只显示f1<br>只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1只显示f1',
},{
  filter: ['f2'],
  problem: '只显示f2',
  answer: '只显示f2只显示f2只<br>显示f2只显示f2只显示f2只显示f2只显示f2只显示f2只显示f2只显示f2只显示f2只显示f2',
},{
  filter: ['f1', 'f2'],
  problem: '问题3',
  answer: '问题3的回答问题3的回<br>答问题3的回答问题3的回答问题3的回答问题3的回答问题3的回答问题3的回答问题3的回答问题3的回答',
},];

export default FAQ;
