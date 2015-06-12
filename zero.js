/* Class $_ /s { */
;(function( win ) {
	/* static /s { */
	function _getElemById( name, context ) {
		return context.getElementById( name );
	}
	function _getElemByClass( name, context ) {
		var ret = [], elements, classArr;

		if ( context.getElementsByClassName ) {
			elements = context.getElementsByClassName( name );
			for ( var i = 0, len = elements.length; i < len; i++ ) {
				ret.push(elements[i]);
			}
		} else {
			elements = context.getElementsByTagName("*");
			for ( var i = 0, len = elements.length;i < len;i++ ) {
				classArr = elements[i].className.split(" ");
				for ( var j = 0, length = classArr.length;j < length;j++ ) {
					if ( classArr[j] == name ) {
						ret.push( elements[i] );
						break;
					}
				}
			}
		}

		return ret;
	}
	function _getElemByTag( name, context ) {
		var ret = [], elements;
		
		elements = context.getElementsByTagName( name );
		for ( var i = 0, len = elements.length; i < len; i++ ) {
			ret.push(elements[i]);
		}

		return ret;
	}
	function _isEmptyObject( obj ) {
		for ( var i in obj ) {
			return false;
		}

		return true;
	}
	function _isArray( obj ) {
		return str_proto.call( obj ) === "[object Array]";
	}
	function _isRealObject( obj ) {
		return str_proto.call( obj ) === "[object Object]";
	}
	function _isBoolean( obj ) {
		return typeof( obj ) === "boolean";
	}
	function _isObject( obj ) {
		return typeof( obj ) === "object";
	}
	function _isFunction( obj ) {
		return typeof( obj ) === "function";
	}
	function _isWindow( obj ) {
		return obj && _isObject(obj) && "setInterval" in obj;
	}
	function _isPlainObject( obj ) {
		if ( !obj || _isRealObject( obj ) || obj.nodeType || _isWindow( obj ) ) {
			return false;
		}

		try {
			if ( obj.constructor &&
				!own_proto.call(obj, "constructor") &&
				!own_proto.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			return false;
		}

		for ( var key in obj ) {}

		return key === undefined || own_proto.call( obj, key );
	}
	/* } static /e */

	var str_proto = Object.prototype.toString,
		own_proto = Object.prototype.hasOwnProperty;

	// constructor
	function $_( selector, context ) {
		return new $_.fn.init( selector, context );
	}
	
	// $_.prototype
	$_.fn = $_.prototype = {
		version: "1.0",
		author: "zjanhoo",
		email: "zjanhoo@163.com",
		constructor: $_,
		selector: "",
		length: 0,
		init: function( selector, context ) {
			var elems;

			if ( !selector ) return this;
			if ( !context || !context.nodeType ) context = document;
			
			if ( selector.nodeType ) {
				this[0] = selector;
				this.length = 1;
				this.context = context;

				return this;
			}

			if ( typeof(selector) === "string" && $_.trim(selector).length > 0 ) {
				var firstChar = selector.charAt(0),
					selectStr = selector.substr(1);

				if ( firstChar == "#" || firstChar == "." ) {
					if ( firstChar == "#" ) {
						elems = _getElemById( selectStr, context );
					} else {
						elems = _getElemByClass( selectStr, context );
					}
				} else {
					elems = _getElemByTag( $_.trim(selector), context );
				}

				return $_.makeElement( elems, selector, context, this );
			}

			return this;
		},
		size: function() {
			return this.length;
		},
		get: function( i ) {
			i = isNaN(i) ? 0 : i;
			i = i >= this.length ? (this.length - 1) : (i < 0 ? 0 : i);

			return this[i];
		},
		eq: function( i ) {
			i = isNaN(i) ? 0 : i;
			i = i >= this.length ? (this.length - 1) : (i < 0 ? 0 : i);

			return $_(this[i]);
		}
	};

	$_.fn.init.prototype = $_.fn;

	$_.extend = $_.fn.extend = function() {
		var target = arguments[0] || {}, i = 1, length = arguments.length, deep = false, options;

		if ( _isBoolean(target) ) {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}

		if ( !_isObject(target) && !_isFunction(target) ) {
			target = {};
		}

		if ( length == i ) {
			target = this;
			--i;
		}

		for ( ; i < length; i++ ) {
			if ( (options = arguments[ i ]) != null ) {
				for ( var name in options ) {
					var src = target[ name ], copy = options[ name ];

					if ( target === copy ) {
						continue;
					}

					if ( deep && copy && typeof copy === "object" && !copy.nodeType ) {
						target[ name ] = $_.extend( deep, 
							src || ( copy.length != null ? [ ] : { } )
						, copy );
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		return target;
	};
    
    $_.extend({
		makeElement: function( elems, selector, context, ob ) {
			if ( !elems ) return ob;
			if ( elems.nodeType ) {
				ob[0] = elems;
				ob.length = 1;
			} else {
				for ( var i = 0, len = elems.length; i < len; i++ ) {
					ob[i] = elems[i];
				}
				ob.length = elems.length;
			}

			ob.context = context;
			ob.selector = selector;

			return ob;
		},
        trim: function( str ) {	// 清除字符串两边空格
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
	});

    win.$_ = win.zj = win.zero = $_;
})( window );
/* } Class $_ /e */
