(function() {
	'use strict';
	var $asm = {};
	global.SampleScriptLib = global.SampleScriptLib || {};
	global.SampleScriptLib.Controllers = global.SampleScriptLib.Controllers || {};
	global.SampleScriptLib.Models = global.SampleScriptLib.Models || {};
	ss.initAssembly($asm, 'SampleScriptLib');
	////////////////////////////////////////////////////////////////////////////////
	// SampleScriptLib.BootStrap
	var $SampleScriptLib_BootStrap = function() {
	};
	$SampleScriptLib_BootStrap.__typeName = 'SampleScriptLib.BootStrap';
	$SampleScriptLib_BootStrap.Boot = function() {
		console.log('Loading Assembly');
		MVC.registerAssembly($asm);
		console.log('Loading Assembly - done');
		MVC.defaultViewHandler = new $SampleScriptLib_HandlebarsViewHandler();
		MVC.defaultViewHandler.init();
		MVC.HandleRequest();
	};
	global.SampleScriptLib.BootStrap = $SampleScriptLib_BootStrap;
	////////////////////////////////////////////////////////////////////////////////
	// SampleScriptLib.HandlebarsViewHandler
	var $SampleScriptLib_HandlebarsViewHandler = function() {
		SaltarelleMVC.ViewHandler.call(this);
	};
	$SampleScriptLib_HandlebarsViewHandler.__typeName = 'SampleScriptLib.HandlebarsViewHandler';
	global.SampleScriptLib.HandlebarsViewHandler = $SampleScriptLib_HandlebarsViewHandler;
	////////////////////////////////////////////////////////////////////////////////
	// SampleScriptLib.Controllers.CustomersController
	var $SampleScriptLib_Controllers_CustomersController = function() {
		SaltarelleMVC.Controller.call(this);
	};
	$SampleScriptLib_Controllers_CustomersController.__typeName = 'SampleScriptLib.Controllers.CustomersController';
	global.SampleScriptLib.Controllers.CustomersController = $SampleScriptLib_Controllers_CustomersController;
	////////////////////////////////////////////////////////////////////////////////
	// SampleScriptLib.Models.ContactModel
	var $SampleScriptLib_Models_ContactModel = function() {
		this.Id = 0;
		this.Name = null;
	};
	$SampleScriptLib_Models_ContactModel.__typeName = 'SampleScriptLib.Models.ContactModel';
	global.SampleScriptLib.Models.ContactModel = $SampleScriptLib_Models_ContactModel;
	////////////////////////////////////////////////////////////////////////////////
	// SampleScriptLib.Models.CustomerModel
	var $SampleScriptLib_Models_CustomerModel = function() {
		this.id = 0;
		this.name = null;
	};
	$SampleScriptLib_Models_CustomerModel.__typeName = 'SampleScriptLib.Models.CustomerModel';
	global.SampleScriptLib.Models.CustomerModel = $SampleScriptLib_Models_CustomerModel;
	ss.initClass($SampleScriptLib_BootStrap, $asm, {});
	ss.initClass($SampleScriptLib_HandlebarsViewHandler, $asm, {
		init: function() {
			var $t1 = document.getElementsByClassName('View');
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var e = $t1[$t2];
				this.registerNamedView(e.id, Handlebars.compile(e.innerHTML));
			}
		},
		renderView: function(result) {
			console.log('Handling View:' + result.viewName);
			var compiledView = this.getNamedView(result.viewName);
			var output = ss.cast(compiledView(result.model), String);
			document.getElementById('ViewHost').innerHTML = output;
		}
	}, SaltarelleMVC.ViewHandler);
	ss.initClass($SampleScriptLib_Controllers_CustomersController, $asm, {
		index: function() {
			$.getJSON('/api/customers', ss.mkdel(this, function(model) {
				console.log('Request done');
				this.renderView('Orders.Index', model);
			}));
			return this.view('App.Wait', null);
		},
		view$1: function(id) {
			$.getJSON('/api/customers?id=' + id.toString(), ss.mkdel(this, function(model) {
				console.log('Request done');
				this.renderView('Orders.View', model);
			}));
			return this.view('App.Wait', null);
		},
		new$1: function() {
			window.alert('m1');
			return this.view('Contacts.New', null);
		},
		new$2: function(model) {
			window.alert('m2');
			window.alert(model.Name);
			return this.none();
		}
	}, SaltarelleMVC.Controller);
	ss.initClass($SampleScriptLib_Models_ContactModel, $asm, {});
	ss.initClass($SampleScriptLib_Models_CustomerModel, $asm, {});
	ss.setMetadata($SampleScriptLib_Controllers_CustomersController, { members: [{ name: '.ctor', type: 1, params: [] }, { name: 'Index', type: 8, sname: 'index', returnType: SaltarelleMVC.ActionResult, params: [] }, { name: 'New', type: 8, sname: 'new$1', returnType: SaltarelleMVC.ActionResult, params: [] }, { name: 'New', type: 8, sname: 'new$2', returnType: SaltarelleMVC.ActionResult, params: [$SampleScriptLib_Models_ContactModel] }, { name: 'View', type: 8, sname: 'view$1', returnType: SaltarelleMVC.ActionResult, params: [ss.Int32] }] });
})();
