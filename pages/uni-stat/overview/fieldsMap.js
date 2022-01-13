export default [{
	title: '受访页',
	field: 'url',
}, {
	title: '页面名称',
	field: 'title',
}, {
	title: '访问人数',
	field: 'access_users',
	tooltip: '访问人数',
	value: 0
}, {
	title: '访问次数',
	field: 'access_times',
	tooltip: '',
	value: 0
}, {
	title: '入口页次数',
	field: 'entry_count',
	tooltip: '',
	value: 0
}, {
	title: '跳出率',
	field: 'bounce_rate',
	formatter: '%',
	tooltip: '',
	value: 0
}, {
	title: '次均停留时长',
	field: 'visitAvgTime',
	computed: 'access_time/access_times',
	formatter: ':',
	tooltip: '',
	value: 0
}, {
	title: '人均停留时长 ',
	field: 'visitorAvgTime',
	computed: 'access_time/access_users',
	formatter: ':',
	tooltip: '',
	value: 0
}]