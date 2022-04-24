const _toString = Object.prototype.toString
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * 检查对象是否包含某个属性
 * @param {Object} obj 对象
 * @param {String} key 属性键值
 */
function hasOwn(obj, key) {
	return hasOwnProperty.call(obj, key)
}

/**
 * 参数是否为JavaScript的简单对象
 * @param {Object} obj 
 * @returns {Boolean} true|false
 */
function isPlainObject(obj) {
	return _toString.call(obj) === '[object Object]'
}

/**
 * 是否为函数
 * @param {String} fn 函数名
 */
function isFn(fn) {
	return typeof fn === 'function'
}

/**
 * 深度克隆对象
 * @param {Object} obj
 */
function deepClone(obj) {
	return JSON.parse(JSON.stringify(obj))
}


/**
 * 解析客户端上报的参数
 * @param {String} str 字符串参数
 * @param {Object} context 附带的上下文
 */
function parseUrlParams(str, context) {
	if (!str || typeof str !== 'string') {
		return str
	}
	const params = str.split('&').reduce((res, cur) => {
		const arr = cur.split('=')
		return Object.assign({
			[arr[0]]: arr[1]
		}, res)
	}, {})
	//原以下数据要从客户端上报，现调整为如果以下参数客户端未上报，则通过请求附带的context参数中获取
	let convertParams = {}
	if (context.hasOwnProperty('APPID')) {
		convertParams = {
			//appid
			ak: 'APPID',
			//当前登录用户编号
			uid: 'uid',
			//设备编号
			did: 'DEVICEID',
			//系统
			p: 'OS',
			//客户端ip
			ip: 'CLIENTIP',
			//客户端的UA
			ua: 'CLIENTUA',
			//当前服务空间信息 {spaceId:'xxx',provider:'tencent'}
			spi: 'SPACEINFO',
			//云函数调用来源
			fs: 'SOURCE'
		}
	} else if (context.hasOwnProperty('appId')) {
		convertParams = {
			//appid
			ak: 'appId',
			//当前登录用户编号
			uid: 'uid',
			//设备编号
			did: 'deviceId',
			//系统
			p: 'os',
			//客户端ip
			ip: 'clientIP',
			//客户端的UA
			ua: 'userAgent',
			//当前服务空间编号
			spid: 'spaceId',
			//当前服务空间提供商
			sppd: 'provider'
		}
	}
	context = context ? context : {}
	//console.log('context', context)
	for (let key in convertParams) {
		if (!params[key] && context[convertParams[key]]) {
			params[key] = context[convertParams[key]]
		}
	}

	return params
}

//解析url
function parseUrl(url) {
	if (typeof url !== "string" || !url) {
		return false
	}
	const urlInfo = url.split('?')
	return {
		path: urlInfo[0],
		query: urlInfo[1] ? decodeURI(urlInfo[1]) : ''
	}
}


let createConfig
try {
	createConfig = require('uni-config-center')
} catch (e) {}

//获取配置文件信息
function getConfig(file, key) {
	if (!file) {
		return false
	}

	const uniConfig = createConfig && createConfig({
		pluginId: 'uni-stat'
	})

	if (!uniConfig || !uniConfig.hasFile(file + '.json')) {
		console.error('Not found the config file')
		return false
	}

	const config = uniConfig.requireFile(file)

	return key ? config[key] : config
}


module.exports = {
	hasOwn,
	isPlainObject,
	isFn,
	deepClone,
	parseUrlParams,
	parseUrl,
	getConfig
}