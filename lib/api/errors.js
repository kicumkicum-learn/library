const Errors = {
	/**
	 * @enum {number}
	 */
	codes: {
		NOT_FIND_ITEM_IN_DATABASE: 1,
		INPUT_DATA_IS_EMPTY: 2
	},
	/**
	 * @type {Object<Errors.codes, string>}
	 */
	messages: {
		[this.codes.NOT_FIND_ITEM_IN_DATABASE]: 'Not find item in database',
		[this.codes.INPUT_DATA_IS_EMPTY]: 'Input data is empty'
	}
};


/**
 * @param code
 * @return {string}
 */
Errors.getMessage = function(code) {
	return Errors.messages[code];
};

/**
 * @param code
 * @return {Error}
 */
Errors.getError = function(code) {
	return new Error(code);
};

/**
 */
let Error = class {
	/**
	 * @param {number} code
	 */
	constructor(code) {
		/**
		 * @type {number}
		 * @private
		 */
		this._code = code;
	}

	/**
	 * @return {number}
	 */
	get code() {
		return this._code;
	}

	/**
	 * @return {string}
	 */
	get message() {
		return Errors.getMessage(this._code);
	}

	toString() {
		return JSON.stringify({
			'code': this.code,
			'message': this.message
		});
	}
};


/**
 * @type {Errors}
 */
module.exports = Errors;