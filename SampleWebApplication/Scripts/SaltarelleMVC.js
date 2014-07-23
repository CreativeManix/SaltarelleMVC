(function() {
	'use strict';
	var $asm = {};
	global.SaltarelleMVC = global.SaltarelleMVC || {};
	ss.initAssembly($asm, 'SaltarelleMVC');
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.MVC
	var $MVC = function() {
	};
	$MVC.__typeName = 'MVC';
	$MVC.registerAssembly = function(assembly) {
		var types = ss.getAssemblyTypes(assembly);
		for (var $t1 = 0; $t1 < types.length; $t1++) {
			var type = types[$t1];
			if (ss.referenceEquals(ss.getTypeName(ss.getBaseType(type)), ss.getTypeName($SaltarelleMVC_Controller))) {
				var ci = new $SaltarelleMVC_ControllerInfo();
				ci.controllerType = type;
				var $t2 = ss.getMembers(type, 8, 28);
				for (var $t3 = 0; $t3 < $t2.length; $t3++) {
					var item = $t2[$t3];
					console.log(item.sname);
					var ai = new $SaltarelleMVC_ActionInfo();
					ai.name = item.sname;
					var s = ss.safeCast(eval(ss.getTypeFullName(type) + '.prototype.' + item.sname + '.toString().match (/function\\s*\\w*\\s*\\((.*?)\\)/)[1].split (/\\s*,\\s*/);'), Array);
					ss.arrayAddRange(ai.parameterNames, s);
					if (!ci.actions.containsKey(item.name.toLowerCase())) {
						ci.actions.add(item.name.toLowerCase(), ai);
					}
				}
				$MVC.controllers.add(ss.replaceAllString(ss.getTypeName(type).toLowerCase(), 'controller', ''), ci);
			}
		}
	};
	$MVC.HandleRequest = function() {
		var parametrs = $MVC.ParseURL(window.location.hash);
		var url = ss.cast(parametrs['#url'], String);
		if (ss.isNullOrEmptyString(url)) {
			return;
		}
		var paths = url.split(String.fromCharCode(47));
		var c = paths[0];
		var a = paths[1];
		if (!$MVC.controllers.containsKey(c)) {
			throw new ss.InvalidOperationException(c + ' Controller not found');
		}
		var ci = $MVC.controllers.get_item(c);
		if (!ci.actions.containsKey(a)) {
			throw new ss.InvalidOperationException(a + ' Action not found');
		}
		var ai = ci.actions.get_item(a);
		var ctrler = ss.createInstance(ci.controllerType);
		var inputs = [];
		if (ss.isValue($MVC.$_FormModel)) {
			ss.add(inputs, $MVC.$_FormModel);
			$MVC.$_FormModel = null;
		}
		for (var $t1 = 0; $t1 < ai.parameterNames.length; $t1++) {
			var p = ai.parameterNames[$t1];
			ss.add(inputs, parametrs[p]);
		}
		var result = null;
		switch (inputs.length) {
			case 1: {
				result = ss.safeCast(ctrler[ai.name](inputs[0]), $SaltarelleMVC_ActionResult);
				break;
			}
			case 2: {
				result = ss.safeCast(ctrler[ai.name](inputs[0], inputs[1]), $SaltarelleMVC_ActionResult);
				break;
			}
			case 3: {
				result = ss.safeCast(ctrler[ai.name](inputs[0], inputs[1], inputs[2]), $SaltarelleMVC_ActionResult);
				break;
			}
			case 4: {
				result = ss.safeCast(ctrler[ai.name](inputs[0], inputs[1], inputs[2], inputs[3]), $SaltarelleMVC_ActionResult);
				break;
			}
			case 5: {
				result = ss.safeCast(ctrler[ai.name](inputs[0], inputs[1], inputs[2], inputs[3], inputs[4]), $SaltarelleMVC_ActionResult);
				break;
			}
			default: {
				result = ss.safeCast(ctrler[ai.name](inputs), $SaltarelleMVC_ActionResult);
				break;
			}
		}
		if (ss.isValue(result)) {
			if (ss.isInstanceOfType(result, $SaltarelleMVC_ViewActionResult)) {
				$MVC.defaultViewHandler.renderView(ss.safeCast(result, $SaltarelleMVC_ViewActionResult));
			}
		}
	};
	$MVC.ParseURL = function(query) {
		var values = {};
		var vars = query.split(String.fromCharCode(38));
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split(String.fromCharCode(61));
			var key = decodeURIComponent(pair[0]);
			var value = decodeURIComponent(pair[1]);
			if (!ss.keyExists(values, key)) {
				values[key] = value;
			}
			else if (ss.isInstanceOfType(values[key], String)) {
				var r = [];
				ss.add(r, values[key]);
				ss.add(r, value);
				values[key] = r;
			}
			else {
				var v = ss.cast(values[key], Array);
				ss.add(v, value);
			}
		}
		return values;
	};
	$MVC.nav = function(path) {
		if (ss.referenceEquals($MVC.lastPath, path)) {
			$MVC.HandleRequest();
		}
		else {
			window.location.href = '#url=' + path;
		}
		$MVC.lastPath = path;
		//HandleRequest();
	};
	$MVC.SubmitForm = function(form) {
		var data = {};
		var values = $(form).serializeArray();
		for (var $t1 = 0; $t1 < values.length; $t1++) {
			var value = values[$t1];
			data[value.name] = value.value;
		}
		$MVC.$_FormModel = data;
		$MVC.nav(form.getAttribute('action'));
		return false;
	};
	global.MVC = $MVC;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.ActionInfo
	var $SaltarelleMVC_ActionInfo = function() {
		this.name = null;
		this.parameterNames = [];
	};
	$SaltarelleMVC_ActionInfo.__typeName = 'SaltarelleMVC.ActionInfo';
	global.SaltarelleMVC.ActionInfo = $SaltarelleMVC_ActionInfo;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.ActionResult
	var $SaltarelleMVC_ActionResult = function() {
		this.model = null;
	};
	$SaltarelleMVC_ActionResult.__typeName = 'SaltarelleMVC.ActionResult';
	global.SaltarelleMVC.ActionResult = $SaltarelleMVC_ActionResult;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.Controller
	var $SaltarelleMVC_Controller = function() {
	};
	$SaltarelleMVC_Controller.__typeName = 'SaltarelleMVC.Controller';
	global.SaltarelleMVC.Controller = $SaltarelleMVC_Controller;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.ControllerInfo
	var $SaltarelleMVC_ControllerInfo = function() {
		this.name = null;
		this.actions = new (ss.makeGenericType(ss.Dictionary$2, [String, $SaltarelleMVC_ActionInfo]))();
		this.controllerType = null;
	};
	$SaltarelleMVC_ControllerInfo.__typeName = 'SaltarelleMVC.ControllerInfo';
	global.SaltarelleMVC.ControllerInfo = $SaltarelleMVC_ControllerInfo;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.NoneActionResult
	var $SaltarelleMVC_NoneActionResult = function() {
		$SaltarelleMVC_ActionResult.call(this);
	};
	$SaltarelleMVC_NoneActionResult.__typeName = 'SaltarelleMVC.NoneActionResult';
	global.SaltarelleMVC.NoneActionResult = $SaltarelleMVC_NoneActionResult;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.View
	var $SaltarelleMVC_View$1 = function(TModel) {
		var $type = function() {
			this.model = ss.getDefaultValue(TModel);
			this.$content = new ss.StringBuilder();
		};
		ss.registerGenericClassInstance($type, $SaltarelleMVC_View$1, [TModel], {
			execute: function() {
			},
			writeLiteral: function(o) {
				this.$content.append(o);
			},
			write: function(o) {
				this.$content.append(o);
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$SaltarelleMVC_View$1.__typeName = 'SaltarelleMVC.View$1';
	ss.initGenericClass($SaltarelleMVC_View$1, $asm, 1);
	global.SaltarelleMVC.View$1 = $SaltarelleMVC_View$1;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.ViewActionResult
	var $SaltarelleMVC_ViewActionResult = function() {
		this.viewName = null;
		$SaltarelleMVC_ActionResult.call(this);
	};
	$SaltarelleMVC_ViewActionResult.__typeName = 'SaltarelleMVC.ViewActionResult';
	global.SaltarelleMVC.ViewActionResult = $SaltarelleMVC_ViewActionResult;
	////////////////////////////////////////////////////////////////////////////////
	// SaltarelleMVC.ViewHandler
	var $SaltarelleMVC_ViewHandler = function() {
		this.$views = new (ss.makeGenericType(ss.Dictionary$2, [String, Object]))();
	};
	$SaltarelleMVC_ViewHandler.__typeName = 'SaltarelleMVC.ViewHandler';
	global.SaltarelleMVC.ViewHandler = $SaltarelleMVC_ViewHandler;
	ss.initClass($MVC, $asm, {});
	ss.initClass($SaltarelleMVC_ActionInfo, $asm, {});
	ss.initClass($SaltarelleMVC_ActionResult, $asm, {});
	ss.initClass($SaltarelleMVC_Controller, $asm, {
		view: function(view, model) {
			var $t1 = new $SaltarelleMVC_ViewActionResult();
			$t1.viewName = view;
			$t1.model = model;
			return $t1;
		},
		none: function() {
			return new $SaltarelleMVC_NoneActionResult();
		},
		renderView: function(view, model) {
			var $t1 = new $SaltarelleMVC_ViewActionResult();
			$t1.viewName = view;
			$t1.model = model;
			var r = $t1;
			$MVC.defaultViewHandler.renderView(r);
		}
	});
	ss.initClass($SaltarelleMVC_ControllerInfo, $asm, {});
	ss.initClass($SaltarelleMVC_NoneActionResult, $asm, {}, $SaltarelleMVC_ActionResult);
	ss.initClass($SaltarelleMVC_ViewActionResult, $asm, {}, $SaltarelleMVC_ActionResult);
	ss.initClass($SaltarelleMVC_ViewHandler, $asm, {
		init: null,
		renderView: null,
		registerNamedView: function(name, view) {
			this.$views.add(name, view);
		},
		getNamedView: function(name) {
			return this.$views.get_item(name);
		}
	});
	$MVC.controllers = new (ss.makeGenericType(ss.Dictionary$2, [String, $SaltarelleMVC_ControllerInfo]))();
	$MVC.defaultViewHandler = null;
	$MVC.lastPath = '';
	$MVC.$_FormModel = null;
})();
