class storage {
	constructor() {
		this.mystorage = window.localStorage
	}

	setData(key, data) {
		this.mystorage.setItem(key, data)
	}

	getData(key) {
		return this.mystorage.getItem(key)
	}

	removeData(key) {
		this.mystorage.removeItem(key)
	}
}

export default storage