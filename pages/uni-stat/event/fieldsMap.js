export default [{
	title: '事件ID',
	field: 'event_key',
}, {
	title: '事件名称',
	field: 'event_name',
}, {
	title: '触发用户数',
	field: 'user_count',
	tooltip: '访问人数',
}, {
	title: '触发次数',
	field: 'event_count',
	tooltip: '',
}, {
	title: '人均次数',
	field: 'event_count/user_count',
	computed: 'event_count/user_count',
	tooltip: '',
}]