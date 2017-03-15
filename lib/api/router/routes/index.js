/**
 * @type {{
 *      create: function(DataBase): Routes
 * }}
 */
module.exports = {
	/**
	 * @param {DataBase} db
	 * @return {Routes}
	 */
	create: (db) => {
		return {
			authors: require('./authors')(db),
			books: require('./books')(db),
			coauthoredBooks: require('./coauthored-books')(db)
		}
	}
};

/**
 * @typedef {{
 *      authors: IRoute,
 *      books: IRoute,
 *      coauthoredBooks: IRoute
 * }}
 */
let Routes;


/**
 * @typedef {{
 *      get: function(...*): *,
 *      post: function(...*): *
 * }}
 */
let IRoute;
