'use strict';

/**
 * @ngdoc overview
 * @name softvFrostApp
 * @description
 * # softvFrostApp
 *
 * Main module of the application.
 */
angular.module('softvFrostApp', [	
		'smart-table',
		'ngSanitize', 
		'ngCsv', 
		'ngTableToCsv',	
		'ngAnimate',
		'ngSanitize',
		'ngNotify',
		'angularValidator',
		'ngStorage',
		'base64',
		'ui.router',
		'angularUtils.directives.dirPagination',
		'ngStorage',
		'ui.bootstrap',
		'blockUI',
		'ngMap',
		'permission', 'permission.ui',
		'ui.mask','ngCsv','fixed.table.header','ui.knob','angularChart'


	])
	.config(['$provide', '$urlRouterProvider', '$httpProvider', '$qProvider','blockUIConfig', function($provide, $urlRouterProvider, $httpProvider, $qProvider,blockUIConfig) {
		$qProvider.errorOnUnhandledRejections(false);
		
		$urlRouterProvider.otherwise('/auth/login');
		blockUIConfig.templateUrl = 'views/loading.html';
		
		$provide.factory('ErrorHttpInterceptor', ["$q", "$injector", "$localStorage", "$location", function($q, $injector,$localStorage, $location) {
			function notifyError(rejection) {
				var notify = $injector.get('ngNotify');
				if (rejection.data === 'Acceso no autorizado, favor de validar autenticación') {
					delete $localStorage.currentUser;
					notify.set('Acceso no autorizado, por favor inicia sesión nuevamente.', {
						type: 'error',
						duration: 4000
					});
					$location.path('/auth/');
					return;
				}
				var content = '¡Se ha generado un error! \n' + rejection.data;
				notify.set(content, {
					type: 'error',
					duration: 4000
				});
			}
			return {
				requestError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					notifyError(rejection);
					return $q.reject(rejection);
				}
			};
		}]);
		$httpProvider.interceptors.push('ErrorHttpInterceptor');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}])
	.constant('APP_CONFIG', window.appConfig)
	.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$location', 'permissionsFactory', 'PermPermissionStore', function($rootScope, $state, $stateParams, $localStorage, $location, permissionsFactory, PermPermissionStore) {
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		if ($localStorage.currentUser) {
			//$location.path('/auth/login');
			var permissions = permissionsFactory.on();
			PermPermissionStore.definePermission('anonymous', function() {
				return false;
			});
			PermPermissionStore.defineManyPermissions(permissions, function() {
				return true;
			});
		} else {
			$location.path('/auth/login');
			PermPermissionStore.definePermission('anonymous', function() {
				return true;
			});
		}

	}]);

'use strict';
angular.module('softvFrostApp')
	.config(["$stateProvider", function ($stateProvider) {
		var states = [{
			name: 'home',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2',
				permissions: {
					except: ['anonymous'],
					options: {
						reload: true
					}
				}
			},
			url: '/home',
			views: {
				'homeview': {
					templateUrl: 'views/main.html',
					controller: 'MainCtrl',
					controllerAs: '$ctrl'
				}
			},
		},
		{
			name: 'home.dashboard',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2',
				permissions: {
					except: ['anonymous'],
					options: {
						reload: true
					}
				}
			},
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'dashboardCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'login',
			url: '/auth/login?esn',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2'
			},
			views: {
				'loginview': {
					templateUrl: 'views/login/login.html',
					controller: 'LoginCtrl',
					controllerAs: '$ctrl'
				}
			},
		},
		{
			name: 'home.cmts',
			data: {
				pageTitle: 'BIENVENIDO | MonitoreoV2'
			},
			url: '/cmts',
			templateUrl: 'views/CMTS/CMTSData.html',
			controller: 'CMTSDataCtrl',
			controllerAs: '$ctrl'
		}
		];

		states.forEach(function (state) {
			$stateProvider.state(state);
		});
	}]);

'use strict';
angular.module('softvFrostApp')
	.factory('permissionsFactory', ["$localStorage", function($localStorage) {
		var factory = {};
		var permisos = [];
		var defaultDiacriticsRemovalMap = [{
				'base': 'A',
				'letters': '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'
			},
			{
				'base': 'AA',
				'letters': '\uA732'
			},
			{
				'base': 'AE',
				'letters': '\u00C6\u01FC\u01E2'
			},
			{
				'base': 'AO',
				'letters': '\uA734'
			},
			{
				'base': 'AU',
				'letters': '\uA736'
			},
			{
				'base': 'AV',
				'letters': '\uA738\uA73A'
			},
			{
				'base': 'AY',
				'letters': '\uA73C'
			},
			{
				'base': 'B',
				'letters': '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'
			},
			{
				'base': 'C',
				'letters': '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'
			},
			{
				'base': 'D',
				'letters': '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0'
			},
			{
				'base': 'DZ',
				'letters': '\u01F1\u01C4'
			},
			{
				'base': 'Dz',
				'letters': '\u01F2\u01C5'
			},
			{
				'base': 'E',
				'letters': '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'
			},
			{
				'base': 'F',
				'letters': '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'
			},
			{
				'base': 'G',
				'letters': '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'
			},
			{
				'base': 'H',
				'letters': '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'
			},
			{
				'base': 'I',
				'letters': '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'
			},
			{
				'base': 'J',
				'letters': '\u004A\u24BF\uFF2A\u0134\u0248'
			},
			{
				'base': 'K',
				'letters': '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'
			},
			{
				'base': 'L',
				'letters': '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'
			},
			{
				'base': 'LJ',
				'letters': '\u01C7'
			},
			{
				'base': 'Lj',
				'letters': '\u01C8'
			},
			{
				'base': 'M',
				'letters': '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'
			},
			{
				'base': 'N',
				'letters': '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'
			},
			{
				'base': 'NJ',
				'letters': '\u01CA'
			},
			{
				'base': 'Nj',
				'letters': '\u01CB'
			},
			{
				'base': 'O',
				'letters': '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'
			},
			{
				'base': 'OI',
				'letters': '\u01A2'
			},
			{
				'base': 'OO',
				'letters': '\uA74E'
			},
			{
				'base': 'OU',
				'letters': '\u0222'
			},
			{
				'base': 'OE',
				'letters': '\u008C\u0152'
			},
			{
				'base': 'oe',
				'letters': '\u009C\u0153'
			},
			{
				'base': 'P',
				'letters': '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'
			},
			{
				'base': 'Q',
				'letters': '\u0051\u24C6\uFF31\uA756\uA758\u024A'
			},
			{
				'base': 'R',
				'letters': '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'
			},
			{
				'base': 'S',
				'letters': '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'
			},
			{
				'base': 'T',
				'letters': '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'
			},
			{
				'base': 'TZ',
				'letters': '\uA728'
			},
			{
				'base': 'U',
				'letters': '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'
			},
			{
				'base': 'V',
				'letters': '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'
			},
			{
				'base': 'VY',
				'letters': '\uA760'
			},
			{
				'base': 'W',
				'letters': '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'
			},
			{
				'base': 'X',
				'letters': '\u0058\u24CD\uFF38\u1E8A\u1E8C'
			},
			{
				'base': 'Y',
				'letters': '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'
			},
			{
				'base': 'Z',
				'letters': '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'
			},
			{
				'base': 'a',
				'letters': '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'
			},
			{
				'base': 'aa',
				'letters': '\uA733'
			},
			{
				'base': 'ae',
				'letters': '\u00E6\u01FD\u01E3'
			},
			{
				'base': 'ao',
				'letters': '\uA735'
			},
			{
				'base': 'au',
				'letters': '\uA737'
			},
			{
				'base': 'av',
				'letters': '\uA739\uA73B'
			},
			{
				'base': 'ay',
				'letters': '\uA73D'
			},
			{
				'base': 'b',
				'letters': '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'
			},
			{
				'base': 'c',
				'letters': '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'
			},
			{
				'base': 'd',
				'letters': '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'
			},
			{
				'base': 'dz',
				'letters': '\u01F3\u01C6'
			},
			{
				'base': 'e',
				'letters': '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'
			},
			{
				'base': 'f',
				'letters': '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'
			},
			{
				'base': 'g',
				'letters': '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'
			},
			{
				'base': 'h',
				'letters': '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'
			},
			{
				'base': 'hv',
				'letters': '\u0195'
			},
			{
				'base': 'i',
				'letters': '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'
			},
			{
				'base': 'j',
				'letters': '\u006A\u24D9\uFF4A\u0135\u01F0\u0249'
			},
			{
				'base': 'k',
				'letters': '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'
			},
			{
				'base': 'l',
				'letters': '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'
			},
			{
				'base': 'lj',
				'letters': '\u01C9'
			},
			{
				'base': 'm',
				'letters': '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'
			},
			{
				'base': 'n',
				'letters': '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'
			},
			{
				'base': 'nj',
				'letters': '\u01CC'
			},
			{
				'base': 'o',
				'letters': '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'
			},
			{
				'base': 'oi',
				'letters': '\u01A3'
			},
			{
				'base': 'ou',
				'letters': '\u0223'
			},
			{
				'base': 'oo',
				'letters': '\uA74F'
			},
			{
				'base': 'p',
				'letters': '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'
			},
			{
				'base': 'q',
				'letters': '\u0071\u24E0\uFF51\u024B\uA757\uA759'
			},
			{
				'base': 'r',
				'letters': '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'
			},
			{
				'base': 's',
				'letters': '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'
			},
			{
				'base': 't',
				'letters': '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'
			},
			{
				'base': 'tz',
				'letters': '\uA729'
			},
			{
				'base': 'u',
				'letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'
			},
			{
				'base': 'v',
				'letters': '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'
			},
			{
				'base': 'vy',
				'letters': '\uA761'
			},
			{
				'base': 'w',
				'letters': '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'
			},
			{
				'base': 'x',
				'letters': '\u0078\u24E7\uFF58\u1E8B\u1E8D'
			},
			{
				'base': 'y',
				'letters': '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'
			},
			{
				'base': 'z',
				'letters': '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'
			}
		];

		var diacriticsMap = {};
		for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
			var letters = defaultDiacriticsRemovalMap[i].letters;
			for (var j = 0; j < letters.length; j++) {
				diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
			}
		}

		// "what?" version ... http://jsperf.com/diacritics/12
		function removeDiacritics(str) {
			return str.replace(/[^\u0000-\u007E]/g, function(a) {
				return diacriticsMap[a] || a;
			});
		}
		factory.on = function() {

			console.log($localStorage.currentUser.menu);
			$localStorage.currentUser.menu.forEach(function(item) {
				var titulo = removeDiacritics(item.Title);
				permisos.push(titulo.replace(/\s/g, '').toLowerCase());
				if (item.Title === 'Provisión') {
					item.MenuChild.forEach(function(item) {
						var itemTitle = removeDiacritics(item.Title);
						if (item.OptAdd) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Add');
						}
						if (item.OptDelete) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Delete');
						}
						if (item.OptUpdate) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Update');
						}
						if (item.OptSelect) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Select');
						}
					});
				}
				if (item.Title === 'Incidencias') {
					item.MenuChild.forEach(function(item) {
						var itemTitle = removeDiacritics(item.Title);
						if (item.OptAdd) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Add');
						}
						if (item.OptDelete) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Delete');
						}
						if (item.OptUpdate) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Update');
						}
						if (item.OptSelect) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Select');
						}
					});
				}
				if (item.Title === 'Configuración') {
					item.MenuChild.forEach(function(item) {
						var itemTitle = removeDiacritics(item.Title);
						if (item.OptAdd) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Add');
						}
						if (item.OptDelete) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Delete');
						}
						if (item.OptUpdate) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Update');
						}
						if (item.OptSelect) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Select');
						}
					});
				}
				if (item.Title === 'Monitoreo') {
					item.MenuChild.forEach(function(item) {
						var itemTitle = removeDiacritics(item.Title);
						if (item.OptAdd) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Add');
						}
						if (item.OptDelete) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Delete');
						}
						if (item.OptUpdate) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Update');
						}
						if (item.OptSelect) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Select');
						}
					});
				}
				if (item.Title === 'Reportes') {
					item.MenuChild.forEach(function(item) {
						var itemTitle = removeDiacritics(item.Title);
						if (item.OptAdd) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Add');
						}
						if (item.OptDelete) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Delete');
						}
						if (item.OptUpdate) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Update');
						}
						if (item.OptSelect) {
							permisos.push(itemTitle.replace(/\s/g, '').toLowerCase() + 'Select');
						}
					});
				}
			});
			return permisos;
		};

		return factory;
	}]);

'use strict';

/**
 * @ngdoc function
 * @name softvFrostApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the softvFrostApp
 */
angular.module('softvFrostApp')
	.controller('MainCtrl', ["$localStorage", "$window", "$location", "rolFactory", function($localStorage, $window, $location, rolFactory) {
		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		this.$onInit = function() {
			console.log($localStorage.currentUser);
			if ($localStorage.currentUser) {
				vm.menus = $localStorage.currentUser.menu;
				vm.usuario = $localStorage.currentUser.usuario;
				rolFactory.GetRoleList().then(function(data) {
					data.GetRoleListResult.forEach(function(item) {
						if (item.IdRol === $localStorage.currentUser.idRol) {
							vm.rol = item.Nombre;
						}
					});
				});
			} else {
				$location.path('/auth/login');
			}

		};

		function logOut() {
			delete $localStorage.currentUser;
			$window.location.reload();
		}

		var vm = this;
		vm.logOut = logOut;
	}]);

'use strict';
angular.module('softvFrostApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl(authFactory, ngNotify, $state, $localStorage, $stateParams, $window, $location) {
	var vm = this;
	vm.login = login;
	
	this.$onInit = function () {
		if ($localStorage.currentUser) {
			
			$state.go('home.cmts');
			
		}
	}

	function login() {
		authFactory.login(vm.user, vm.password).then(function (data) {
			if (data) {
				$window.location.reload();
			} else {
				ngNotify.set('Datos de acceso erróneos', 'error');
			}
		});
	}
}
LoginCtrl.$inject = ["authFactory", "ngNotify", "$state", "$localStorage", "$stateParams", "$window", "$location"];

'use strict';
angular.module('softvFrostApp').config(["$stateProvider", function($stateProvider) {
	var states = [{
			name: 'home.cablemodems',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.cablemodems.listado',
			data: {
				pageTitle: 'MonitoreoV2 | Listado Cablemodems',
				/*permissions: {
					only: ['sitediagnostictoolSelect'],
					options: {
						reload: true
					}
				}*/
			},
			url: '/cablemodems/listado',
			templateUrl: 'views/Cablemodems/ListadoCablemodems.html',
			controller: 'ListadoCablemodemsCtrl',
			controllerAs: '$ctrl'
		},
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}]);

'use strict';
angular.module('softvFrostApp').controller('ListadoCablemodemsCtrl', ListadoCablemodemsCtrl);

function ListadoCablemodemsCtrl($state, CablemodemFactory, $timeout, AdministracionFactory, $uibModal) {

  function Init() {
    /*AdministracionFactory.GetCMTSLista().then(function (data) {
      vm.CMTSs = data.GetCMTSListaResult;
    });*/
    var obj = {};
    obj.IdCMTS = 0;
    CablemodemFactory.GetListaCablemodem(obj).then(function (data) {
      vm.rowCablemodems = data.GetListaCablemodemResult;
    });
  }

  function CambiaCMTS() {
    var obj = {};
    obj.IdCMTS = 0;
    CablemodemFactory.GetListaCablemodem(obj).then(function (data) {
      vm.rowCablemodems = data.GetListaCablemodemResult;
    });
  }
  function DetalleCablemodem(object) {
    //console.log(object);
    vm.MAC = object.MAC;
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/Cablemodems/DetalleCablemodem.html',
      controller: 'DetalleCablemodemCtrl',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      resolve: {
        cablemodem: function () {
          return object;
        }
      }
    });

  }

  function ConsumoTiempoReal(object) {
    //console.log(object);
    vm.MAC = object.MAC;
    //console.log(object);
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/Cablemodems/TiempoRealCablemodem.html',
      controller: 'TiempoRealCablemodemCtrl',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      resolve: {
        cablemodem: function () {
          return object;
        }
      }
    });

  }

  var vm = this;
  vm.CambiaCMTS = CambiaCMTS;
  vm.DetalleCablemodem = DetalleCablemodem;
  vm.ConsumoTiempoReal = ConsumoTiempoReal;
  Init();
}
ListadoCablemodemsCtrl.$inject = ["$state", "CablemodemFactory", "$timeout", "AdministracionFactory", "$uibModal"];
/*angular.module('softvFrostApp').directive("chartCanvas", ['$document', function () {
  return {
    restrict: "E",
    scope: {
      mac: '@'
    },
    bindToController: true,
    template: '<div id="chart_container"><div id="chart" class="rickshaw_graph"></div><div id="legend_container"><div id="smoother" title="Smoothing"></div><div id="legend" class="rickshaw_legend"></div></div><div id="slider"></div></div>',
    replace: true,
    controller: function (CablemodemFactory) {

      this.$onInit = function () {
        //Grafica nueva
        var obj = {};
        obj.MAC = this.mac;

        CablemodemFactory.GetHistorialConsumo(obj).then(function (data) {
          console.log('1', data);
          var historico = data.GetHistorialConsumoResult;
          var bajada = [];
          var subida = [];
          historico.forEach(function (item, index) {
            var bAux = {
              x: parseFloat(item.Fecha),
              y: parseFloat(item.Rx)
            };
            var sAux = {
              x: parseFloat(item.Fecha),
              y: parseFloat(item.tx)
            };
            bajada.push(bAux);
            subida.push(sAux);
          });

          var graph = new Rickshaw.Graph({
            element: document.getElementById("chart"),
            width: 700,
            height: 350,
            renderer: 'line',

            series: [
              {
                color: 'rgba(255,0,0,0.3)',
                data: subida,
                name: 'Bajada (MB)'
              }, {
                color: 'rgba(0,10,255,0.5)',
                data: bajada,
                name: 'Subida (MB)'
              }
            ]
          });
          var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph
          });
          yAxis.render();
          var xAxis = new Rickshaw.Graph.Axis.Time({
            graph: graph
          });
          xAxis.render();
          var slider = new Rickshaw.Graph.RangeSlider.Preview({
            graph: graph,
            element: document.querySelector('#slider')
          });
          graph.render();
          var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: graph
          });
          var legend = new Rickshaw.Graph.Legend({
            graph: graph,
            element: document.getElementById('legend')
          });
          var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
            graph: graph,
            legend: legend
          });
        });
      }



    }
  }
}])*/

'use strict';
angular.module('softvFrostApp').controller('CMTSCtrl', CMTSCtrl);

function CMTSCtrl(AdministracionFactory, $state) {

  function Init() {
  
    AdministracionFactory.GetCMTSLista().then(function(data) {
      vm.cmtses = data.GetCMTSListaResult;
    });
  }

  function CMTSElimina(IdCMTS){
    var parametros = {};
    parametros.IdCMTS = IdCMTS;
    AdministracionFactory.GetEliminaCMTS(parametros).then(function(data) {
      Init();
    });
  }

  var vm = this;
  vm.cmtses = {};
  vm.CMTSElimina = CMTSElimina;
  Init();
}
CMTSCtrl.$inject = ["AdministracionFactory", "$state"];

'use strict';
angular.module('softvFrostApp').config(["$stateProvider", function($stateProvider) {
	var states = [{
			name: 'home.administracion',
			abstract: true,
			template: '<div ui-view></div>'
		},
		{
			name: 'home.administracion.cmts',
			data: {
				pageTitle: 'MonitoreoV2 | Administración CMTS',
				/*permissions: {
					only: ['sitediagnostictoolSelect'],
					options: {
						reload: true
					}
				}*/
			},
			url: '/administracion/cmts',
			templateUrl: 'views/Administracion/CMTS.html',
			controller: 'CMTSCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.administracion.cmtsnuevo',
			data: {
				pageTitle: 'MonitoreoV2 | Administración CMTS',
			},
			url: '/administracion/cmts/nuevo',
			templateUrl: 'views/Administracion/CMTSNuevo.html',
			controller: 'CMTSNuevoCtrl',
			controllerAs: '$ctrl'
		},
		{
			name: 'home.administracion.cmtsedita',
			data: {
				pageTitle: 'MonitoreoV2 | Administración CMTS',
			},
			url: '/administracion/cmts/edita/:id',
			templateUrl: 'views/Administracion/CMTSEdita.html',
			controller: 'CMTSEditaCtrl',
			controllerAs: '$ctrl'
		},
	];

	states.forEach(function(state) {
		$stateProvider.state(state);
	});
}]);

'use strict';
angular.module('softvFrostApp')
	.factory('AdministracionFactory', ["$http", "$q", "$window", "globalService", "$localStorage", function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetCMTSLista: '/Administracion/GetCMTSLista',
			GetTipoCMTS: '/Administracion/GetTipoCMTS',
			GetNuevoCMTS: '/Administracion/GetNuevoCMTS',
			GetCMTSPorId: '/Administracion/GetCMTSPorId',
			GetEditaCMTS: '/Administracion/GetEditaCMTS',
			GetEliminaCMTS: '/Administracion/GetEliminaCMTS'
		};

		factory.GetCMTSLista = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetCMTSLista, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetTipoCMTS = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetTipoCMTS, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetNuevoCMTS = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			//console.log(JSON.stringify(parametros));
			$http.post(globalService.getUrl() + paths.GetNuevoCMTS, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetCMTSPorId = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.GetCMTSPorId, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetEditaCMTS = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.GetEditaCMTS, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetEliminaCMTS = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token,
				}
			};
			$http.post(globalService.getUrl() + paths.GetEliminaCMTS, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		

		return factory;
	}]);

'use strict';
angular.module('softvFrostApp').config(["$stateProvider", function ($stateProvider) {
	var states = [{
		name: 'home.provision',
		abstract: true,
		template: '<div ui-view></div>'
	},
	{
		name: 'home.provision.suscriptores',
		data: {
			pageTitle: 'BOSS | SUSCRIPTORES',
			permissions: {
				only: ['suscriptoresSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/suscriptores',
		templateUrl: 'views/provision/suscriptores.html',
		controller: 'SuscriptorCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.terminales',
		data: {
			pageTitle: 'BOSS | Terminales',
			permissions: {
				only: ['terminalesSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/terminales?idSuscriptor',
		templateUrl: 'views/provision/Terminales.html',
		controller: 'TerminalCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.terminalesNueva',
		data: {
			pageTitle: 'BOSS | Terminales',
			permissions: {
				only: ['terminalesAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/terminales/nueva?idSuscriptor',
		templateUrl: 'views/provision/NuevaTerminal.html',
		controller: 'NuevaTerminalCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.suscriptoresNuevo',
		data: {
			pageTitle: 'BOSS | NUEVO SUSCRIPTOR',
			permissions: {
				only: ['suscriptoresAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/nuevo/suscriptor',
		templateUrl: 'views/provision/nuevoSuscriptor.html',
		controller: 'NuevoSuscriptorCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.suscriptoresEditar',
		data: {
			pageTitle: 'BOSS | EDITAR SUSCRIPTOR',
			permissions: {
				only: ['suscriptoresUpdate'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/editar/suscriptor/:id',
		templateUrl: 'views/provision/editarSuscriptor.html',
		controller: 'EditarSuscriptorCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.usuarios',
		data: {
			pageTitle: 'BOSS | USUARIOS',
			permissions: {
				only: ['usuariosSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/usuarios',
		templateUrl: 'views/configuracion/usuarios.html',
		controller: 'UsuariosCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.roles',
		data: {
			pageTitle: 'BOSS | ROLES',
			permissions: {
				only: ['rolesSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/roles',
		templateUrl: 'views/configuracion/roles.html',
		controller: 'RolesCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.permisos',
		data: {
			pageTitle: 'BOSS | PERMISOS',
			permissions: {
				only: ['permisosSelect'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/permisos',
		templateUrl: 'views/configuracion/permisos.html',
		controller: 'PermisosCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.nuevousuario',
		data: {
			pageTitle: 'BOSS | NUEVO USUARIO',
			permissions: {
				only: ['usuariosAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/usuario/nuevo/',
		templateUrl: 'views/configuracion/NuevoUsuario.html',
		controller: 'NuevoUsuarioCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.editausuario',
		data: {
			pageTitle: 'BOSS | NUEVO USUARIO',
			permissions: {
				only: ['usuariosUpdate'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/usuario/edita/:id',
		templateUrl: 'views/configuracion/NuevoUsuario.html',
		controller: 'EditaUsuarioCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.nuevorol',
		data: {
			pageTitle: 'BOSS | NUEVO ROL',
			permissions: {
				only: ['rolesAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/rol/nuevo/',
		templateUrl: 'views/configuracion/NuevoRol.html',
		controller: 'NuevoRolCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.editarol',
		data: {
			pageTitle: 'BOSS | EDITA ROL',
			permissions: {
				only: ['rolesUpdate'],
				options: {
					reload: true
				}
			}
		},
		params: {
			obj: null
		},
		url: '/provision/rol/Edita/:id',
		templateUrl: 'views/configuracion/NuevoRol.html',
		controller: 'EditaRolCtrl',
		controllerAs: '$ctrl'
	},
	{
		name: 'home.provision.activacion',
		data: {
			pageTitle: 'BOSS | ACTIVACIÓN TERMINAL',
			permissions: {
				only: ['activacionAdd'],
				options: {
					reload: true
				}
			}
		},
		url: '/provision/activacion?esn',
		templateUrl: 'views/provision/activacion.html',
		controller: 'activacionCtrl',
		controllerAs: '$ctrl'
	}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);
	});
}]);

'use strict';
angular.module('softvFrostApp').controller('CMTSNuevoCtrl', CMTSNuevoCtrl);

function CMTSNuevoCtrl($state, ngNotify, AdministracionFactory) {

  function init() {
    AdministracionFactory.GetTipoCMTS().then(function(data){
      //console.log(data);
      vm.Tipos=data.GetTipoCMTSResult;
    });
  };

  function CMTSNuevo() {
    var obj = {};
    obj.Nombre = vm.Nombre;
    obj.IP = vm.IP;
    obj.Comunidad = vm.Comunidad;
    obj.ComunidadCablemodem = vm.ComunidadCablemodems;
    obj.IdTipo = vm.TipoCMTS.IdTipo;
    obj.interfaceS = vm.Interface;
    obj.Usuario = vm.Usuario;
    obj.PasswordS = vm.PasswordS;
    obj.Enable = vm.Enable;
    AdministracionFactory.GetNuevoCMTS(obj).then(function(data) {
        $state.go('home.administracion.cmts');
        ngNotify.set('CMTS agregado correctamente', 'success');
    });
  }
  var vm = this;
  init();
  vm.CMTSNuevo = CMTSNuevo;
}
CMTSNuevoCtrl.$inject = ["$state", "ngNotify", "AdministracionFactory"];

'use strict';
angular.module('softvFrostApp').controller('CMTSEditaCtrl', CMTSEditaCtrl);

function CMTSEditaCtrl(AdministracionFactory, $state, ngNotify, $stateParams) {
	var vm = this;
	vm.CMTSEdita = CMTSEdita;

	this.$onInit = function () {
		var IdCMTS = $stateParams.id;
		var obj = {};
		obj.IdCMTS = IdCMTS;
		AdministracionFactory.GetTipoCMTS().then(function(data){
		  	vm.Tipos = data.GetTipoCMTSResult;
			AdministracionFactory.GetCMTSPorId(obj).then(function(data) {
				vm.CMTS = data.GetCMTSPorIdResult;
				SeleccionaTipo(vm.CMTS.IdTipo);
				//console.log(vm.CMTS);
			});
		});
	}

	function SeleccionaTipo(IdTipo) {
      var indexAux = 0;
      vm.Tipos.forEach(function (item, index) {
        if (item.IdTipo === IdTipo) {
          vm.Tipo = item;
        }
      });
    }

	function CMTSEdita() {
	    var obj = {};
	    obj.IdCMTS = vm.CMTS.IdCMTS;
	    obj.Nombre = vm.CMTS.Nombre;
	    obj.IP = vm.CMTS.IP;
	    obj.Comunidad = vm.CMTS.Comunidad;
	    obj.ComunidadCablemodem = vm.CMTS.ComunidadCablemodem;
	    obj.IdTipo = vm.Tipo.IdTipo;
	    obj.interfaceS = vm.CMTS.Interface;
	    obj.Usuario = vm.CMTS.Usuario;
	    obj.PasswordS = vm.CMTS.Password;
	    obj.Enable = vm.CMTS.Enable;
	    AdministracionFactory.GetEditaCMTS(obj).then(function(data) {
	        $state.go('home.administracion.cmts');
	        ngNotify.set('CMTS guardado correctamente', 'success');
	    });
	  }

	
}
CMTSEditaCtrl.$inject = ["AdministracionFactory", "$state", "ngNotify", "$stateParams"];

'use strict';
angular.module('softvFrostApp')
	.factory('CablemodemFactory', ["$http", "$q", "$window", "globalService", "$localStorage", function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetListaCablemodem: '/Cablemodem/GetListaCablemodem',
			GetHistorialConsumo: '/Cablemodem/GetHistorialConsumo',
			GetDatosCliente: '/Cablemodem/GetDatosCliente',
			GetConsumoActual: '/Cablemodem/GetConsumoActual',
			GetIPCliente: '/Cablemodem/GetIPCliente'
		};

		factory.GetIPCliente = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetIPCliente, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetConsumoActual = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetConsumoActual, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetListaCablemodem = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetListaCablemodem, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};
		
		factory.GetHistorialConsumo = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetHistorialConsumo, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetDatosCliente = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetDatosCliente, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;
	}]);

'use strict';
angular.module('softvFrostApp').controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl(AdministracionFactory, $state) {

  function Init() {
    AdministracionFactory.GetCMTSLista().then(function (data) {
      vm.CMTSs = data.GetCMTSListaResult;
      vm.CMTSs.forEach(function (obj) { obj.Activo = false; });
    });
    Morris.Donut({
      element: 'morris-donut-graph',
      data: [
        { label: "En línea", value: 12 },
        { label: "Apagados", value: 30 },
        { label: "Suspendidos", value: 20 },
        { label: "En proceso", value: 5 }
      ],
      colors: ["#64f28a", "#f25235", "#6394e7", "#eeaa56"]
    });

    /*
    //Grafica nueva
    var seriesData = [[], [], []];
    console.log(seriesData);
    var random = new Rickshaw.Fixtures.RandomData(150);
    console.log(random);

    for (var i = 0; i < 150; i++) {
      random.addData(seriesData);
    }

    // instantiate our graph!

    var graph = new Rickshaw.Graph({
      element: document.getElementById("chart"),
      width: 960,
      height: 500,
      renderer: 'line',

      series: [
        {
          color: 'rgba(255,0,0,0.3)',
          data: seriesData[0],
          name: 'Bajada'
        }, {
          color: 'rgba(0,10,255,0.5)',
          data: seriesData[1],
          name: 'Subida'
        }
      ]
    });

    console.log('3', seriesData);



    var yAxis = new Rickshaw.Graph.Axis.Y({
      graph: graph
    });

    yAxis.render();

    var xAxis = new Rickshaw.Graph.Axis.Time({
      graph: graph
    });

    xAxis.render();


    var slider = new Rickshaw.Graph.RangeSlider.Preview({
      graph: graph,
      element: document.querySelector('#slider')
    });




    graph.render();

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
      graph: graph
    });

    var legend = new Rickshaw.Graph.Legend({
      graph: graph,
      element: document.getElementById('legend')

    });

    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
      graph: graph,
      legend: legend
    });
*/


    //Otra opción de Grafica
    vm.options = {
      data: [
        {
          sales: 130,
          weekday: 'Monday',
          date: '2015-04-04 12:13:55'
        },
        {
          sales: 150,
          weekday: 'Monday',
          date: '2015-04-05 12:13:55'
        },
        {
          sales: 50,
          weekday: 'Monday',
          date: '2015-04-06 12:13:55'
        }
      ],
      dimensions: {
        sales: {
          type: 'line'
        },
        income: {
          axis: 'y2'
        }
      }
    };

    // optional (direct access to c3js API http://c3js.org/reference.html#api)
    vm.instance = null;

    var data = [[1167609600000, 0.7537],
    [1167696000000, 0.7537],
    [1167782400000, 0.7559],
    [1167868800000, 0.7631],
    [1167955200000, 0.7644],
    [1168214400000, 0.769],
    [1168300800000, 0.7683]];
    /*
        Morris.Line({
          element: 'morris-line-graph',
          data: data,
          xkey: 'x',
          ykeys: 'y',
          labels: ['sin()', 'cos()'],
          parseTime: true,
          ymin: 0,
          ymax: 200,
          hideHover: true
        });*/
    /*
        var data = [[1167609600000, 0.7537],
        [1167696000000, 0.7537],
        [1167782400000, 0.7559],
        [1167868800000, 0.7631],
        [1167955200000, 0.7644],
        [1168214400000, 0.769],
        [1168300800000, 0.7683]];
    
        var data2 = [[1167609600000, 0.8537],
        [1167696000000, 0.8537],
        [1167782400000, 0.8559],
        [1167868800000, 0.8631],
        [1167955200000, 0.8644],
        [1168214400000, 0.869],
        [1168300800000, 0.8683]];
        var chart = Highcharts.chart('container', {
          chart: {
            zoomType: 'x'
          },
          title: {
            text: 'USD to EUR exchange rate over time'
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'Exchange rate'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 2
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },
    
          series: [{
            type: 'line',
            name: 'USD to EUR',
            data: data
          }]
        });
        chart.addSeries({
            name: 'USD to EUR2',
            data: data2
        });*/
    var chart = Highcharts.chart('container', {
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = Math.random();
              series.addPoint([x, y], true, true);
            }, 1000);
          }
        }
      },

      time: {
        useUTC: false
      },

      title: {
        text: 'Live random data'
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Random data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }())
      },
      {
        name: 'Random data2',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random()
            });
          }
          return data;
        }())
      }]
    });
  }

  function CambiaCMTS(CMTS) {
    //Descoloreamos el anterior
    if (vm.CMTS != undefined && vm.CMTS != null) {
      var indexAux2 = 0;
      vm.CMTSs.forEach(function (item, index) {
        if (item.IdCMTS === vm.CMTS.IdCMTS) {
          indexAux2 = index;
        }
      });
      vm.CMTSs[indexAux2].Activo = false;
    }
    //Coloreamos el seleccionado
    var indexAux = 0;
    vm.CMTSs.forEach(function (item, index) {
      if (item.IdCMTS === CMTS.IdCMTS) {
        indexAux = index;
      }
    });
    vm.CMTSs[indexAux].Activo = true;
    vm.CMTS = CMTS;
  }

  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  Init();
}
dashboardCtrl.$inject = ["AdministracionFactory", "$state"];

'use strict';
angular.module('softvFrostApp').controller('CMTSDataCtrl', CMTSDataCtrl);

function CMTSDataCtrl(CMTSFactory, $timeout, $localStorage, globalService, $interval, $http, $scope, $uibModal) {

  function Init() {
    /*AdministracionFactory.GetCMTSLista().then(function (data) {
      vm.CMTSs = data.GetCMTSListaResult;
      vm.CMTSs.forEach(function (obj) { obj.Activo = false; });
      CambiaCMTS(vm.CMTSs[0]);
    });*/
    vm.valueCargaCPU = 0;
    vm.optionsCargaCPU = {
      skin: {
        type: 'tron'
      },
      size: 250,
      unit: "%",
      barWidth: 40,
      trackColor: 'rgba(255,0,0,.1)',
      prevBarColor: 'rgba(0,0,0,.2)',
      subText: {
        enabled: true,
        text: 'CPU used'
      },
      scale: {
        enabled: true,
        type: 'lines',
        width: 3
      },
      step: 5,
      displayPrevious: true,
      readonly: true
    };

    vm.totalMemoria = 0;
    vm.valueMemoria = 0;
    vm.optionsMemoria = {
      startAngle: 30,
      endAngle: 330,
      size: 250,
      unit: 'MB',
      trackColor: "rgba(162,121,143,1)",
      barColor: 'rgba(102,0,204,.5)',
      trackWidth: 15,
      barWidth: 15,
      subText: {
        enabled: true,
        text: 'Memoria Disponible'
      },
      max: 0,
      min: 0,
      readonly: true
    };

    vm.totalHDD = 0;
    vm.valueHDD = 0;
    vm.optionsHDD = {
      startAngle: 30,
      endAngle: 330,
      size: 250,
      unit: 'MB',
      trackColor: "rgba(162,121,143,1)",
      barColor: 'rgba(102,0,204,.5)',
      trackWidth: 15,
      barWidth: 15,
      subText: {
        enabled: true,
        text: 'HDD Disponible'
      },
      max: 0,
      min: 0,
      readonly: true
    };

    var parametros = {};
    parametros.IdCMTS = 0;
    CMTSFactory.GetCMTSDatos(parametros).then(function (data) {
      //console.log(data);
      vm.CMTSData = data.GetCMTSDatosResult;

      vm.totalMemoria = parseInt(vm.CMTSData.TotalMemory);
      vm.optionsMemoria.max = vm.totalMemoria;
      vm.valueMemoria = parseInt(vm.CMTSData.FreeMemory);

      vm.totalHDD = parseInt(vm.CMTSData.TotalhddSpace);
      vm.optionsHDD.max = vm.totalHDD;
      vm.valueHDD = parseInt(vm.CMTSData.FreehddSpace);

      vm.valueCargaCPU = parseInt(vm.CMTSData.CargaCPU);

      var bajada = [];
      var subida = [];

      vm.chart = Highcharts.chart('container', {
        chart: {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load: function () {

              // set up the updating of the chart each second
              vm.cmtsInterval = setInterval(function () {
                var parametros2 = {};
                parametros2.Interface = 'sfp1';
                var config = {
                  headers: {
                    'Authorization': $localStorage.currentUser.token
                  },
                  Bloquea: false
                };
                $http.post(globalService.getUrl() + '/Cmts/GetCMTSConsumoInterface', parametros2, config).then(function (response) {
                  var consumo = response.data.GetCMTSConsumoInterfaceResult;
                  console.log(consumo);
                  var x = (new Date()).getTime(); // current time
                  vm.chart.series[0].addPoint([x, parseFloat(consumo.tx)], false, true);
                  vm.chart.series[1].addPoint([x, parseFloat(consumo.Rx)], false, true);
                  vm.chart.redraw();
                });
              }, 2000);
            }
          }
        },

        time: {
          useUTC: false
        },

        title: {
          text: 'Consumo Actual Interface sfp1'
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        yAxis: {
          title: {
            text: 'MB'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
        legend: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          name: 'Bajada',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;

            for (i = -25; i <= 0; i += 1) {
              data.push({
                x: time + i * 2000,
                y: 0
              });
            }
            return data;
          }())
        },
        {
          name: 'Subida',
          data: (function () {
            // generate an array of random data
            var data = [],
              time = (new Date()).getTime(),
              i;

            for (i = -25; i <= 0; i += 1) {
              data.push({
                x: time + i * 2000,
                y: 0
              });
            }
            return data;
          }())
        }]
      });
    });

  }

  $scope.$on("$destroy", function () {
    clearInterval(vm.cmtsInterval);
  });

  function CambiaCMTS(CMTS) {
    //Descoloreamos el anterior
    if (vm.CMTS != undefined && vm.CMTS != null) {
      var indexAux2 = 0;
      vm.CMTSs.forEach(function (item, index) {
        if (item.IdCMTS === vm.CMTS.IdCMTS) {
          indexAux2 = index;
        }
      });
      vm.CMTSs[indexAux2].Activo = false;
    }
    //Coloreamos el seleccionado
    var indexAux = 0;
    vm.CMTSs.forEach(function (item, index) {
      if (item.IdCMTS === CMTS.IdCMTS) {
        indexAux = index;
      }
    });
    vm.CMTSs[indexAux].Activo = true;
    vm.CMTS = CMTS;
    ObtieneDatosCMTS();
  }

  function ObtieneDatosCMTS() {
    var parametros = {};
    parametros.IdCMTS = vm.CMTS.IdCMTS;
    CMTSFactory.GetCMTSDatos(parametros).then(function (data) {
      //console.log(data);
      vm.CMTSData = data.GetCMTSDatosResult;
      $("#morris-donut-graph").empty();
      Morris.Donut({
        element: 'morris-donut-graph',
        data: [
          { label: "En línea", value: vm.CMTSData.EnLinea },
          { label: "Apagados", value: vm.CMTSData.Apagados },
          { label: "Suspendidos", value: vm.CMTSData.Suspendidos },
          { label: "En proceso", value: vm.CMTSData.EnProceso }
        ],
        colors: ["#64f28a", "#f25235", "#6394e7", "#eeaa56"],
        resize: 'true'
      });
    });
  }

  function HistorialConsumo() {
    var interfaz = 'sfp1';
    var modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/CMTS/CMTSConsumoHistorial.html',
      controller: 'CMTSConsumoHistorialCtrl',
      controllerAs: 'ctrl',
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      resolve: {
        interfaz: function () {
          return interfaz;
        }
      }
    });

  }

  var vm = this;
  vm.cmtses = {};
  vm.CambiaCMTS = CambiaCMTS;
  vm.HistorialConsumo = HistorialConsumo;
  Init();
}
CMTSDataCtrl.$inject = ["CMTSFactory", "$timeout", "$localStorage", "globalService", "$interval", "$http", "$scope", "$uibModal"];

'use strict';
angular
    .module('softvFrostApp')
    .controller('CMTSConsumoHistorialCtrl', ["$filter", "$uibModalInstance", "$uibModal", "interfaz", "$rootScope", "ngNotify", "$document", "CMTSFactory", function ($filter, $uibModalInstance, $uibModal, interfaz, $rootScope, ngNotify, $document, CMTSFactory) {

        function initialData() {
            vm.Interaz = interfaz;
            var obj = {};
            obj.MAC = vm.Interaz;
            obj.FechaInicio = '19000101';
            obj.FechaFin = '19000101';
            CMTSFactory.GetHistorialConsumoCMTSInterface(obj).then(function (data) {
                var historico = data.GetHistorialConsumoCMTSInterfaceResult;
                var bajada = [];
                var subida = [];
                historico.forEach(function (item, index) {
                    var x = new Date(parseInt(item.Fecha) * 1000);
                    var bAux = [
                        x.getTime(),
                        parseFloat(item.tx)
                    ];
                    var sAux = [
                        x.getTime(),
                        parseFloat(item.Rx)
                    ];
                    bajada.push(bAux);
                    subida.push(sAux);
                });
                //Time series chart
                vm.chart = Highcharts.chart('container2', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Historial de Consumo Interface ' + vm.Interaz
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            'Haz click y arrastra en el área de la gráfica para hacer zoom' : ''
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'MB'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 1
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'line',
                        name: 'Bajada',
                        data: bajada
                    }]
                });

                vm.chart.addSeries({
                    name: 'Subida',
                    data: subida
                });
            });

        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

        function ok() {

        }

        function FiltraResultados() {
            var obj = {};
            obj.MAC = vm.Interaz;
            obj.FechaInicio = vm.fechaInicio;
            obj.FechaFin = vm.fechaFin;
            CMTSFactory.GetHistorialConsumoCMTSInterface(obj).then(function (data) {
                var historico = data.GetHistorialConsumoCMTSInterfaceResult;
                var bajada = [];
                var subida = [];
                historico.forEach(function (item, index) {
                    var x = new Date(parseInt(item.Fecha) * 1000);
                    var bAux = [
                        x.getTime(),
                        parseFloat(item.tx)
                    ];
                    var sAux = [
                        x.getTime(),
                        parseFloat(item.Rx)
                    ];
                    bajada.push(bAux);
                    subida.push(sAux);
                });
                //Time series chart
                vm.chart = Highcharts.chart('container2', {
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Historial de Consumo Interface ' + vm.Interaz
                    },
                    subtitle: {
                        text: document.ontouchstart === undefined ?
                            'Haz click y arrastra en el área de la gráfica para hacer zoom' : ''
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'MB'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 1
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        type: 'line',
                        name: 'Bajada',
                        data: bajada
                    }]
                });

                vm.chart.addSeries({
                    name: 'Subida',
                    data: subida
                });
            });
        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        initialData();
        vm.fechaInicio = new Date();
        vm.fechaFin = new Date();
        vm.FiltraResultados = FiltraResultados;
    }]);

'use strict';
angular
  .module('softvFrostApp')
  .controller('DetalleCablemodemCtrl', ["$filter", "$uibModalInstance", "$uibModal", "cablemodem", "$rootScope", "ngNotify", "$document", "CablemodemFactory", function ($filter, $uibModalInstance, $uibModal, cablemodem, $rootScope, ngNotify, $document, CablemodemFactory) {

    function initialData() {
      vm.Cablemodem = cablemodem;

      var parametros = {};
      parametros.MAC = vm.Cablemodem.MAC;
      CablemodemFactory.GetDatosCliente(parametros).then(function (data) {
        vm.Cliente = data.GetDatosClienteResult;
        console.log(data);

        var obj = {};
        obj.MAC = vm.Cablemodem.MAC;
        obj.FechaInicio = '19000101';
        obj.FechaFin = '19000101';
        CablemodemFactory.GetHistorialConsumo(obj).then(function (data) {
          var historico = data.GetHistorialConsumoResult;
          var bajada = [];
          var subida = [];
          historico.forEach(function (item, index) {
            var x = new Date(parseInt(item.Fecha) * 1000);
            var bAux = [
              x.getTime(),
              parseFloat(item.tx)
            ];
            var sAux = [
              x.getTime(),
              parseFloat(item.Rx)
            ];
            bajada.push(bAux);
            subida.push(sAux);
          });
          //Time series chart
          vm.chart = Highcharts.chart('container', {
            chart: {
              zoomType: 'x'
            },
            title: {
              text: 'Historial de Consumo'
            },
            subtitle: {
              text: document.ontouchstart === undefined ?
                'Haz click y arrastra en el área de la gráfica para hacer zoom' : ''
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: 'MB'
              }
            },
            legend: {
              enabled: false
            },
            plotOptions: {
              area: {
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [
                    [0, Highcharts.getOptions().colors[0]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
                },
                marker: {
                  radius: 1
                },
                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                threshold: null
              }
            },

            series: [{
              type: 'line',
              name: 'Bajada',
              data: bajada
            }]
          });

          vm.chart.addSeries({
            name: 'Subida',
            data: subida
          });
        });
      });

    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {

    }

    function FiltraResultados() {
      var obj = {};
      obj.MAC = vm.Cablemodem.MAC;
      obj.FechaInicio = vm.fechaInicio;
      obj.FechaFin = vm.fechaFin;
      CablemodemFactory.GetHistorialConsumo(obj).then(function (data) {
        var historico = data.GetHistorialConsumoResult;
        var bajada = [];
        var subida = [];
        historico.forEach(function (item, index) {
          var x = new Date(parseInt(item.Fecha) * 1000);
          var bAux = [
            x.getTime(),
            parseFloat(item.tx)
          ];
          var sAux = [
            x.getTime(),
            parseFloat(item.Rx)
          ];
          bajada.push(bAux);
          subida.push(sAux);
        });
        //Time series chart
        vm.chart = Highcharts.chart('container', {
          chart: {
            zoomType: 'x'
          },
          title: {
            text: 'Historial de Consumo'
          },
          subtitle: {
            text: document.ontouchstart === undefined ?
              'Haz click y arrastra en el área de la gráfica para hacer zoom' : ''
          },
          xAxis: {
            type: 'datetime'
          },
          yAxis: {
            title: {
              text: 'MB'
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            area: {
              fillColor: {
                linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
                },
                stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                ]
              },
              marker: {
                radius: 1
              },
              lineWidth: 1,
              states: {
                hover: {
                  lineWidth: 1
                }
              },
              threshold: null
            }
          },

          series: [{
            type: 'line',
            name: 'Bajada',
            data: bajada
          }]
        });

        vm.chart.addSeries({
          name: 'Subida',
          data: subida
        });
      });
    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    initialData();
    vm.fechaInicio = new Date();
    vm.fechaFin = new Date();
    vm.FiltraResultados = FiltraResultados;
  }]);

'use strict';
angular
    .module('softvFrostApp')
    .controller('TiempoRealCablemodemCtrl', ["$filter", "$uibModalInstance", "cablemodem", "CablemodemFactory", "$localStorage", "$interval", "globalService", "$http", function ($filter, $uibModalInstance, cablemodem, CablemodemFactory, $localStorage, $interval, globalService, $http) {

        function initialData() {
            vm.Cablemodem = cablemodem;

            var parametros = {};
            parametros.MAC = vm.Cablemodem.MAC;
            console.log('parametros',parametros);
            CablemodemFactory.GetDatosCliente(parametros).then(function (data) {
                vm.Cliente = data.GetDatosClienteResult;
                parametros.MAC = '';
                for (var i=0; i < vm.Cablemodem.MAC.length; i++) {
                    console.log(vm.Cablemodem.MAC.charAt(i)); 
                    parametros.MAC = parametros.MAC + vm.Cablemodem.MAC.charAt(i);
                    if(((i+1) % 2) == 0 && i != (vm.Cablemodem.MAC.length-1))
                        parametros.MAC = parametros.MAC + ':';
                }
                console.log(parametros);
                CablemodemFactory.GetIPCliente(parametros).then(function (data) {
                    console.log('GetIPCliente',data);
                    vm.IP = data.GetIPClienteResult.IP;

                    var bajada = [];
                    var subida = [];

                    vm.chart = Highcharts.chart('container', {
                        chart: {
                            type: 'spline',
                            animation: Highcharts.svg, // don't animate in old IE
                            marginRight: 10,
                            events: {
                                load: function () {

                                    // set up the updating of the chart each second
                                    var series = this.series[0];
                                    vm.interval = setInterval(function () {
                                        var parametros2 = {};
                                        parametros2.MAC = vm.IP;
                                        var config = {
                                            headers: {
                                                'Authorization': $localStorage.currentUser.token
                                            },
                                            Bloquea: false
                                        };
                                        $http.post(globalService.getUrl() + '/Cablemodem/GetConsumoActual', parametros2, config).then(function (response) {
                                            var consumo = response.data.GetConsumoActualResult;
                                            console.log(consumo);
                                            var x = (new Date()).getTime(); // current time
                                            vm.chart.series[0].addPoint([x, parseFloat(consumo.tx)], false, true);
                                            vm.chart.series[1].addPoint([x, parseFloat(consumo.Rx)], false, true);
                                            vm.chart.redraw();
                                        });
                                    }, 2000);
                                }
                            }
                        },

                        time: {
                            useUTC: false
                        },

                        title: {
                            text: 'Consumo Actual'
                        },
                        xAxis: {
                            type: 'datetime',
                            tickPixelInterval: 150
                        },
                        yAxis: {
                            title: {
                                text: 'MB'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br/>',
                            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
                        },
                        legend: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        series: [{
                            name: 'Bajada',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;
                    
                                for (i = -25; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 2000,
                                        y: 0
                                    });
                                }
                                return data;
                            }())
                        },
                        {
                            name: 'Subida',
                            data: (function () {
                                // generate an array of random data
                                var data = [],
                                    time = (new Date()).getTime(),
                                    i;
                    
                                for (i = -25; i <= 0; i += 1) {
                                    data.push({
                                        x: time + i * 2000,
                                        y: 0
                                    });
                                }
                                return data;
                            }())
                        }]
                    });
                    /*
                    vm.interval = setInterval(function () {
                        var parametros = {};
                        parametros.MAC = vm.IP;
                        var config = {
                            headers: {
                                'Authorization': $localStorage.currentUser.token
                            }
                        };
                        var data = {};
                        $http.post(globalService.getUrl() + '/Cablemodem/GetConsumoActual', parametros, config).then(function (response) {
                            var consumo = response.data.GetConsumoActualResult;

                            chart.series[0].addPoint([(new Date()).getTime(), parseFloat(consumo.tx)], false, true);
                            chart.series[1].addPoint([(new Date()).getTime(), parseFloat(consumo.Rx)], false, true);
                            chart.redraw();
                        });

                    }, 1000);*/
                });
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
            clearInterval(vm.interval);
        }

        function ok() {

        }

        var vm = this;
        vm.cancel = cancel;
        vm.ok = ok;
        initialData();

    }]);
/*angular.module('softvFrostApp').directive("chartRealtime", ['$document', function () {
    return {
        restrict: "E",
        scope: {
            mac: '@',
            ip: '@'
        },
        bindToController: true,
        template: '<div id="chart_container"><div id="chart" class="rickshaw_graph"></div><div id="legend_container"><div id="smoother" title="Smoothing"></div><div id="legend" class="rickshaw_legend"></div></div></div>',
        replace: true,
        controller: function ($interval, globalService, $http, $localStorage, $scope) {
            var vm = this;
            this.$onInit = function () {
                //Grafica nueva
                var obj = {};
                obj.MAC = this.mac;
                obj.IP = this.ip;

                var tv = 1000;
                var d = new Date();
                // instantiate our graph!
                var graph = new Rickshaw.Graph({
                    element: document.getElementById("chart"),
                    width: 700,
                    height: 300,
                    renderer: 'line',
                    series: new Rickshaw.Series.FixedDuration([{ name: 'Bajada' }, { name: 'Subida' }], undefined, {
                        timeInterval: tv,
                        maxDataPoints: 100,
                        timeBase: (d.getTime() / 1000) - 25200
                    })
                });


                var yAxis = new Rickshaw.Graph.Axis.Y({
                    graph: graph
                });

                yAxis.render();

                var xAxis = new Rickshaw.Graph.Axis.Time({
                    graph: graph
                });

                graph.render();

                // add some data every so often

                var i = 0;
                var iv = setInterval(function () {
                    var parametros = {};
                    parametros.MAC = obj.IP;
                    var config = {
                        headers: {
                            'Authorization': $localStorage.currentUser.token
                        }
                    };
                    var data = {};
                    $http.post(globalService.getUrl() + '/Cablemodem/GetConsumoActual', parametros, config).then(function (response) {
                        var consumo = response.data.GetConsumoActualResult;
                        data.Bajada = parseInt(consumo.tx);
                        data.Subida = parseInt(consumo.Rx);

                        graph.series.addData(data);
                        graph.render();
                    });

                }, tv);


                var hoverDetail = new Rickshaw.Graph.HoverDetail({
                    graph: graph
                });

                var legend = new Rickshaw.Graph.Legend({
                    graph: graph,
                    element: document.getElementById('legend')

                });

                var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
                    graph: graph,
                    legend: legend
                });
            }

            $scope.CierraDirectiva = function () {
                $interval.cancel(vm.oneTimer);
            };
        }
    }
}])*/
'use strict';
angular.module('softvFrostApp')

  .service('globalService', function () {
    var svc = {};
    //rutas servidor producción
    svc.getUrl = function () {
      return 'http://192.168.50.10:8081/SoftvWCFService.svc';
      //return 'http://localhost:64481/SoftvWCFService.svc';
    };

    return svc;
  });

'use strict';
angular.module('softvFrostApp')
	.factory('authFactory', ["$http", "$q", "globalService", "$base64", "$localStorage", "$location", "$window", "ngNotify", function($http, $q, globalService, $base64, $localStorage, $location, $window, ngNotify) {
		var factory = {};
		var paths = {
			login: '/Usuario/LogOn'
		};

		factory.login = function(user, password) {
			var token = $base64.encode(user + ':' + password);
			var deferred = $q.defer();
			var Parametros = {};
			var config = {
				headers: {
					'Authorization': 'Basic ' + token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.login, JSON.stringify(Parametros), config)
				.then(function(response) {
					//console.log('LogonResponse',response);
					if (response.data.LogOnResult.Token) {
						$localStorage.currentUser = {
							token: response.data.LogOnResult.Token,
							nombre: response.data.LogOnResult.Nombre,
							idRol: response.data.LogOnResult.IdRol,
							idUsuario: response.data.LogOnResult.IdUsuario,
							usuario: response.data.LogOnResult.Usuario,
							menu: response.data.LogOnResult.Menu
						};
						//console.log($localStorage.currentUser);
						deferred.resolve(true);
					} else {
						deferred.resolve(false);
					}
				})
				.catch(function(response) {
					ngNotify.set('Autenticación inválida, credenciales no válidas.', 'error');
					deferred.reject(response.statusText);
				});
			return deferred.promise;
		};

		return factory;
	}]);

'use strict';
angular.module('softvFrostApp').controller('PermisosCtrl', PermisosCtrl);

function PermisosCtrl(permisoFactory, rolFactory, ngNotify) {
	function Init() {
		rolFactory.GetRoleList().then(function(data) {
			vm.Roles = data.GetRoleListResult;
			vm.Rol = vm.Roles[0];
			GetModuleList();
		});
	}

	function GetModuleList() {
		permisoFactory.GetModulopermiso(vm.Rol.IdRol).then(function(data) {			
			console.log(data);
			vm.Modules=	data.GetModulos_PermisosResult;
		});
	}



	function ObtenPermisos() {
		GetModuleList();
	}

	function Guardar() {
		if (vm.Rol == null) {
			ngNotify.set('Selecciona algún rol para continuar.', 'error');
			return;
		}
		permisoFactory.GuardaPermisos(vm.Rol.IdRol, vm.Modules).then(function(data) {
			ngNotify.set('Los permisos se establecieron correctamente', 'success');

		});

	}
	var vm = this;
	Init();
	vm.ObtenPermisos = ObtenPermisos;
	vm.Guardar = Guardar;
}
PermisosCtrl.$inject = ["permisoFactory", "rolFactory", "ngNotify"];

'use strict';
angular.module('softvFrostApp').controller('RolesCtrl', RolesCtrl);

function RolesCtrl(rolFactory, $state) {

  function Init() {
  
    rolFactory.GetRoleList().then(function(data) {
      vm.Roles = data.GetRoleListResult;
    });
  }

  function EditaRol(x) {
    $state.go('home.provision.editarol', {
      obj: x
    });
  }
  var vm = this;
  Init();
  vm.EditaRol = EditaRol;
}
RolesCtrl.$inject = ["rolFactory", "$state"];

'use strict';
angular.module('softvFrostApp').controller('UsuariosCtrl', UsuariosCtrl);

function UsuariosCtrl(usuarioFactory, rolFactory, $state, ngNotify) {
	var vm = this;
	vm.EditaUsuario = EditaUsuario;
	vm.Busca = Busca;

	this.$onInit = function () {
		usuarioFactory.getUsuarioList().then(function (data) {
			vm.Usuarios = data.GetUsuarioListResult;
		});
		rolFactory.GetRoleList().then(function (data) {
			vm.Roles = data.GetRoleListResult;

		});
	}

	function EditaUsuario(x) {
		$state.go('home.provision.editausuario', {
			obj: x
		});
	}


	function Busca(option) {

		if (option == 1) {

			if (vm.Busuario == '' || vm.Busuario == null) {
				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 0,
					'IdRol': 0
				};

				usuarioFactory.BuscaUsuario(Parametros).then(function (data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			} else {
				console.log(vm.Busuario);
				var Parametros = {
					'Nombre': vm.Busuario,
					'Email': '',
					'Usuario2': vm.Busuario,
					'Op': 1,
					'IdRol': 0
				};
				console.log(Parametros);
				usuarioFactory.BuscaUsuario(Parametros).then(function (data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});
			}
		} else if (option == 2) {
			if (vm.Bcorreo == '' || vm.Bcorreo == null) {
				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 0,
					'IdRol': 0
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function (data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			} else {
				var Parametros = {
					'Nombre': '',
					'Email': vm.Bcorreo,
					'Usuario2': '',
					'Op': 2,
					'IdRol': 0
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function (data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});
			}



		} else if (option == 3) {

			if (vm.Rol == '' || vm.Rol == null) {
				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 0,
					'IdRol': 0
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function (data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			} else {

				var Parametros = {
					'Nombre': '',
					'Email': '',
					'Usuario2': '',
					'Op': 3,
					'IdRol': vm.Rol.IdRol
				};
				usuarioFactory.BuscaUsuario(Parametros).then(function (data) {
					vm.Usuarios = data.GetUsuario2ListResult;
				});

			}

		}

	}
}
UsuariosCtrl.$inject = ["usuarioFactory", "rolFactory", "$state", "ngNotify"];

'use strict';
angular.module('softvFrostApp').controller('NuevoUsuarioCtrl', NuevoUsuarioCtrl);

function NuevoUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify) {
	var vm = this;
	vm.GuardarUsuario = GuardarUsuario;
	vm.titulo = 'Nuevo Usuario';
	vm.passwordPanel = true;
	vm.ValidatePanel = false;
	vm.editar = true;
	vm.userText = false;
	vm.existe = existe;
	vm.isDuplicate = false;

	this.$onInit = function () {
		rolFactory.GetRoleList().then(function (data) {
			vm.Roles = data.GetRoleListResult;

		});
	};

	function GuardarUsuario() {
		if (vm.isDuplicate) {
			ngNotify.set('Por favor introduce un nombre de usuario válido.', 'error');
		} else {
			if (vm.Contrasena === vm.Contrasena2) {
				var obj = {};
				obj.IdRol = vm.Rol.IdRol;
				obj.Nombre = vm.Nombre;
				obj.Email = vm.Correo;
				obj.Usuario = vm.Descripcion;
				obj.Password = vm.Contrasena;
				usuarioFactory.AddUsuario(obj).then(function (data) {
					$state.go('home.provision.usuarios');
					ngNotify.set('Usuario agregado correctamente.', 'success');
				});
			} else {
				ngNotify.set('Las contraseña no coinciden.', 'error');
			}
		}
	}

	function existe() {
		usuarioFactory.existeUsuario(vm.Descripcion).then(function (data) {
			if (data.GetExisteUserResult.Bnd == 1) {
				vm.isDuplicate = true;
			} else {
				vm.isDuplicate = false;
			}
		});
	}

}
NuevoUsuarioCtrl.$inject = ["usuarioFactory", "rolFactory", "$state", "ngNotify"];

'use strict';
angular.module('softvFrostApp').controller('EditaUsuarioCtrl', EditaUsuarioCtrl);

function EditaUsuarioCtrl(usuarioFactory, rolFactory, $state, ngNotify, $stateParams) {
	var vm = this;
	vm.titulo = 'Edita Usuario';
	vm.passwordPanel = false;
	vm.ValidatePanel = true;
	vm.editar = false;
	vm.ValidaPass = ValidaPass;
	vm.GuardarUsuario = GuardarUsuario;
	vm.userText = true;

	this.$onInit = function () {
		var userid = $stateParams.id;
		usuarioFactory.GetUserDetail(userid).then(function(data) {
			var user = data.GetUserListbyIdUserResult[0];
			vm.Id = user.IdUsuario;
			rolFactory.GetRoleList().then(function(data) {
				vm.Roles = data.GetRoleListResult;
				for (var a = 0; a < vm.Roles.length; a++) {
					if (vm.Roles[a].IdRol == user.IdRol) {
						vm.Rol = vm.Roles[a];
					}
				}
				vm.Nombre = user.Nombre;
				vm.Correo = user.Email;
				vm.Descripcion = user.Usuario;
				vm.Password = user.Password;
				vm.Contrasena = user.Password;
			});
		});
	}

	function GuardarUsuario() {
		if (vm.editar) {
			if (vm.Contrasena === vm.Contrasena2) {
				var obj = {};
				obj.IdUsuario = vm.Id;
				obj.IdRol = vm.Rol.IdRol;
				obj.Nombre = vm.Nombre;
				obj.Email = vm.Correo;
				obj.Usuario = vm.Descripcion;
				obj.Password = vm.Contrasena;

				usuarioFactory.UpdateUsuario(obj).then(function(data) {
					$state.go('home.provision.usuarios');
					ngNotify.set('Usuario editado correctamente.', 'success');
				});
			} else {
				ngNotify.set('Las contraseña no coinciden.', 'error');
			}
		} else {
			var obj = {};
			obj.IdUsuario = vm.Id;
			obj.IdRol = vm.Rol.IdRol;
			obj.Nombre = vm.Nombre;
			obj.Email = vm.Correo;
			obj.Usuario = vm.Descripcion;
			obj.Password = vm.Contrasena;

			usuarioFactory.UpdateUsuario(obj).then(function(data) {
				$state.go('home.provision.usuarios');
				ngNotify.set('Usuario editado correctamente.', 'success');
			});
		}


	}

	function ValidaPass() {
		if (vm.PassValidate === vm.Password) {
			vm.editar = true;
			vm.Contrasena = '';
			vm.ValidatePanel = false;
			vm.passwordPanel = true;
		} else {
			ngNotify.set('Contraseña no es  válida', 'error');
		}
	}
}
EditaUsuarioCtrl.$inject = ["usuarioFactory", "rolFactory", "$state", "ngNotify", "$stateParams"];

'use strict';
angular.module('softvFrostApp').controller('NuevoRolCtrl', NuevoRolCtrl);

function NuevoRolCtrl(usuarioFactory, rolFactory, $state, ngNotify,terminalFactory) {

  function init() {
  terminalFactory.getComandoList().then(function(data){
    console.log(data);
      vm.comandos=data.GetComandoListResult;
    });
  };

  function GuardarRol() {
    var obj = {};
    obj.Nombre = vm.Nombre;
    obj.Descripcion = vm.Descripcion;
    obj.Estado = vm.Estatus;
    rolFactory.AddRole(obj).then(function(data) {
      vm.IdRol=data.AddRoleResult;
       


       var Lista_comandos = [];
      for (var a = 0; a < vm.comandos.length; a++) {
        if (vm.comandos[a].selected == true) {
          Lista_comandos.push({
            'Comando': vm.comandos[a].IdComando
          })
        }
      }
      console.log(vm.IdRol);
      console.log(Lista_comandos);
      rolFactory.GetComandos(vm.IdRol, Lista_comandos).then(function (response) {
        console.log(response);
        $state.go('home.provision.roles');
      ngNotify.set('Rol agregado correctamente.', 'success');
      });



      
    });
  }
  var vm = this;
  init();
  vm.Estatus = false;
  vm.GuardarRol = GuardarRol;
  vm.titulo = 'Nuevo Rol';
}
NuevoRolCtrl.$inject = ["usuarioFactory", "rolFactory", "$state", "ngNotify", "terminalFactory"];

'use strict';
angular.module('softvFrostApp').controller('EditaRolCtrl', EditaRolCtrl);

function EditaRolCtrl(usuarioFactory, rolFactory, $state, ngNotify, $stateParams, terminalFactory) {

  function init() {
    var id = $stateParams.id;
    rolFactory.GetRoleById(id).then(function (data) {
      vm.Rol = data.GetRoleByIdResult
      vm.Estatus = vm.Rol.Estado;
      vm.Nombre = vm.Rol.Nombre;
      vm.Descripcion = vm.Rol.Descripcion;
      vm.IdRol = vm.Rol.IdRol;
    });

    terminalFactory.getComandoList().then(function (data) {     
      vm.comandos = data.GetComandoListResult;
      rolFactory.GetRoleCommands(vm.IdRol).then(function (data) {
        for (var a = 0; a < vm.comandos.length; a++) {
          for (var b = 0; b < data.GetRoleCommandsResult.length; b++) {
            if (vm.comandos[a].IdComando == data.GetRoleCommandsResult[b].IdComando) {
              vm.comandos[a].selected = true;
            }
          } 
        }        
      });
    });
  };

  function GuardarRol() {
    var obj = {};

    obj.IdRol = vm.IdRol
    obj.Nombre = vm.Nombre;
    obj.Descripcion = vm.Descripcion;
    obj.Estado = vm.Estatus;
    rolFactory.UpdateRole(obj).then(function (data) {

      var Lista_comandos = [];
      for (var a = 0; a < vm.comandos.length; a++) {
        if (vm.comandos[a].selected == true) {
          Lista_comandos.push({
            'Comando': vm.comandos[a].IdComando
          })
        }
      }
      console.log(Lista_comandos);
      rolFactory.GetComandos(vm.IdRol, Lista_comandos).then(function (response) {
        console.log(response);
      });

      $state.go('home.provision.roles');
      ngNotify.set('Rol editado correctamente.', 'success');
    });
  }
  var vm = this;
  vm.titulo = 'Edita Rol';
  init();
  vm.GuardarRol = GuardarRol;
}
EditaRolCtrl.$inject = ["usuarioFactory", "rolFactory", "$state", "ngNotify", "$stateParams", "terminalFactory"];

'use strict';
angular.module('softvFrostApp')
  .factory('rolFactory', ["$http", "$q", "$window", "globalService", "$localStorage", function ($http, $q, $window, globalService, $localStorage) {
    var factory = {};
    var paths = {
      GetRoleList: '/Role/GetRoleList',
      AddRole: '/Role/AddRole',
      UpdateRole: '/Role/UpdateRole',
      GetRoleCommands: '/Role/GetRoleCommands',
      GetComandos: '/Role/GetComandos',
      GetRoleById:'/Role/GetRoleById'
    };

    factory.GetRoleById = function (idrol) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var Parametros = {
        'IdRol': idrol
      };

      $http.post(globalService.getUrl() + paths.GetRoleById, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };




    factory.GetRoleCommands = function (idrol) {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };

      var Parametros = {
        'IdRol': idrol
      };

      $http.post(globalService.getUrl() + paths.GetRoleCommands, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };





    factory.GetRoleList = function () {
      var deferred = $q.defer();
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.get(globalService.getUrl() + paths.GetRoleList, config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;
    };


    factory.AddRole = function (object) {
      var deferred = $q.defer();
      var Parametros = {
        'objRole': {
          'Nombre': object.Nombre,
          'Descripcion': object.Descripcion,
          'Estado': object.Estado
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.AddRole, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;

    };





    factory.GetComandos = function (idrol, lista) {

      var deferred = $q.defer();
      var Parametros = {
        'objRol': {
          'IdRol': idrol
        },
        'lstComando': lista
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.GetComandos, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;

    };




    factory.UpdateRole = function (object) {
      var deferred = $q.defer();
      var Parametros = {
        'objRole': {
          'IdRol': object.IdRol,
          'Nombre': object.Nombre,
          'Descripcion': object.Descripcion,
          'Estado': object.Estado
        }
      };
      var config = {
        headers: {
          'Authorization': $localStorage.currentUser.token
        }
      };
      $http.post(globalService.getUrl() + paths.UpdateRole, JSON.stringify(Parametros), config).then(function (response) {
        deferred.resolve(response.data);
      }).catch(function (data) {
        deferred.reject(data);
      });
      return deferred.promise;

    };

    return factory;
  }]);

'use strict';
angular.module('softvFrostApp')
	.factory('permisoFactory', ["$http", "$q", "$window", "globalService", "$localStorage", function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetModuleList: '/Module/GetModuleList',
			GetPermisoList: '/Role/GetPermiRolList',
			GuardaPermisos: '/Role/GetUpListPermisos',
			GetModulopermiso:'/Module/GetModulos_Permisos'
		};
		factory.GetModuleList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.GetModuleList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

        factory.GetModulopermiso = function(idrol) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
            
			var Parametros = {
				'idrol': idrol
			};			

			$http.post(globalService.getUrl() + paths.GetModulopermiso,JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};



		factory.GetPermisoList = function(idrol) {
			var deferred = $q.defer();
			var Parametros = {
				'IdRol': idrol
			};

			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetPermisoList, Parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GuardaPermisos = function(idrol, modulos) {
			var deferred = $q.defer();
			var Parametros = {
				'objRole': {
					'IdRol': idrol
				},
				'LstPer': modulos
			};

			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GuardaPermisos, Parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};


		return factory;

	}]);

'use strict';
angular.module('softvFrostApp')
	.factory('usuarioFactory', ["$http", "$q", "$window", "globalService", "$localStorage", function ($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getUsuarioList: '/Usuario/GetUsuarioList',
			GetUserDetail: '/Usuario/GetUserListbyIdUser',
			AddUsuario: '/Usuario/AddUsuario',
			UpdateUsuario: '/Usuario/UpdateUsuario',
			BuscaUsuario: '/Usuario/GetUsuario2List',
			existeUsuario: '/Usuario/GetExisteUser'
		};

		factory.existeUsuario = function (usuario) {
			var deferred = $q.defer();
			var Parametros = {
				'Usuario2': usuario,
				'Op':0
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.existeUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getUsuarioList = function () {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getUsuarioList, config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetUserDetail = function (id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdUsuario': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetUserDetail, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.AddUsuario = function (object) {
			var deferred = $q.defer();
			var Parametros = {

				'objUsuario': {
					'IdRol': object.IdRol,
					'Nombre': object.Nombre,
					'Email': object.Email,
					'Usuario': object.Usuario,
					'Password': object.Password
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.AddUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};
		factory.UpdateUsuario = function (object) {
			var deferred = $q.defer();
			var Parametros = {

				'objUsuario': {
					'IdUsuario': object.IdUsuario,
					'IdRol': object.IdRol,
					'Nombre': object.Nombre,
					'Email': object.Email,
					'Usuario': object.Usuario,
					'Password': object.Password
				}
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.UpdateUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.BuscaUsuario = function (obj) {
			var deferred = $q.defer();
			var Parametros = {
				'Nombre': obj.Nombre,
				'Email': obj.Email,
				'Usuario2': obj.Usuario2,
				'Op': obj.Op,
				'IdRol': obj.IdRol
			};
			console.log(Parametros);
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.BuscaUsuario, JSON.stringify(Parametros), config).then(function (response) {
				deferred.resolve(response.data);
			}).catch(function (data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		return factory;
	}]);

'use strict';
angular.module('softvFrostApp')
	.factory('terminalFactory', ["$http", "$q", "globalService", "$localStorage", function($http, $q, globalService, $localStorage) {
		var factory = {};
		var paths = {
			getTerminalList: '/Terminal/GetTerminalList',
			getServicioList: '/Servicio/GetServicioList',
			GuardaTerminal: '/Terminal/AddTerminal',
			getTerminalById: '/Terminal/GetByTerminal',
			buscarTerminal: '/Terminal/GetFilterTerminalList',
			updateTerminal: '/Terminal/UpdateTerminal',
			getComandoList: '/Comando/GetComandoList',
			getEstadoById: '/Estado/GetEstado',
			getSequenceId: '/SequenceId/GetSequenceId',
			getServicioListByProgramCode: '/Servicio/GetServicioListByProgramCode',
			hughesValidaServicio: '/ValidaServicio',
			hughesCambiarStatusServicio: '/CambiarStatusServicio',
			hughesActivarTerminal: '/ActivarTerminal',
			hughesToken: '/Token',
			hughesCambioServicio: '/CambioServicio',
			hughesConsumoDeTerminal: '/ConsumoDeTerminal',
			hughesFapStatus: '/FapStatus',
			addMovimiento: '/Movimiento/AddMovimiento',
			getSuscriptorById: '/Suscriptor/GetSuscriptor',
			hughesCrearTerminal: '/CrearTerminal',
			agregaInfoTerminal: '/Terminal/UpdateTerminalInformacionAdicional',
			getMovimientosBySan: '/Movimiento/GetMovimientoListBySAN',
			detalleMovimiento: '/Movimiento/GetDeepMovimiento',
			sigleMovimiento: '/DetalleMovimiento/GetDetalleMovimientoIdList',
            GetValidaEjecucionComando:'/Comando/GetValidaEjecucionComando',			
			hughesSwap: '/Swap',
			hughesHistoricoConsumo: '/Historico',
			hughesConsumoGrafica: '/ConsumoGrafica'
		};

		factory.sigleMovimiento = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdMovimiento': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.sigleMovimiento, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.detalleMovimiento = function(id) {
			var deferred = $q.defer();
			var Parametros = {
				'IdMovimiento': id
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.detalleMovimiento, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		factory.GetValidaEjecucionComando = function(IdComando) {
			var deferred = $q.defer();
			var Parametros = {
				'Idrol':$localStorage.currentUser.idRol,
				'IdComando':IdComando
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.GetValidaEjecucionComando, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};



       



		factory.getMovimientosBySan = function(san) {
			var deferred = $q.defer();
			var Parametros = {
				'SAN': san
			};
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.getMovimientosBySan, JSON.stringify(Parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.updateTerminal = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.updateTerminal, JSON.stringify(obj), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.buscarTerminal = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'SAN': obj.san,
				'Suscriptor': obj.suscriptor,
				'Estatus': obj.estatus,
				'IdServicio': obj.servicio,
				'IdBeam':obj.IdBeam,
				'ESN':obj.ESN,
				'satelite':obj.satelite,
				'Op': obj.op
			};
			$http.post(globalService.getUrl() + paths.buscarTerminal, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		factory.GuardaTerminal = function(objeto) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdSuscriptor': objeto.IdSuscriptor,
				'IdServicio': objeto.IdServicio,
				'Latitud': '' + objeto.Latitud + '',
				'Longitud': '' + objeto.Longitud + '',
				'Estatus': objeto.Estatus,
				'FechaAlta': objeto.FechaAlta,
				'FechaSuspension': objeto.FechaSuspension,
				'ESN': objeto.ESN,
				'Comentarios': objeto.Comentarios
			};
			console.log(JSON.stringify({
				'objTerminal': parametros
			}));

			$http.post(globalService.getUrl() + paths.GuardaTerminal, JSON.stringify({
				'objTerminal': parametros
			}), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTerminalList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getTerminalList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getServicioList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getServicioList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getTerminalById = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'SAN': id
			};
			$http.post(globalService.getUrl() + paths.getTerminalById, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getComandoList = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.get(globalService.getUrl() + paths.getComandoList, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getEstadoById = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdEstado': id
			};
			$http.post(globalService.getUrl() + paths.getEstadoById, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getSequenceId = function() {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};

			$http.get(globalService.getUrl() + paths.getSequenceId, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};


		factory.hughesValidaServicio = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesValidaServicio, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesCambiarStatusServicio = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			$http.post(globalService.getUrlHughesService() + paths.hughesCambiarStatusServicio, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesActivarTerminal = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesActivarTerminal, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesToken = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesToken, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesCambioServicio = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesCambioServicio, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesConsumoDeTerminal = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			//jQuery.support.cors = true;
			$http.post(globalService.getUrlHughesService() + paths.hughesConsumoDeTerminal, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesFapStatus = function(obj) {
			var deferred = $q.defer();
			var parametros = JSON.stringify(obj);
			$http.post(globalService.getUrlHughesService() + paths.hughesFapStatus, parametros).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.addMovimiento = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			obj.objMovimiento.IdUsuario = $localStorage.currentUser.idUsuario;
			var parametros = obj;
			console.log($localStorage.currentUser);
			console.log(JSON.stringify(parametros));
			$http.post(globalService.getUrl() + paths.addMovimiento, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.getSuscriptorById = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'IdSuscriptor': id
			};
			$http.post(globalService.getUrl() + paths.getSuscriptorById, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.getServicioListByProgramCode = function(id) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			var parametros = {
				'ProgramCode': id,
				'Op': 0
			};
			$http.post(globalService.getUrl() + paths.getServicioListByProgramCode, JSON.stringify(parametros), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesCrearTerminal = function(obj) {
			var deferred = $q.defer();
			var parametros = obj;
			$http.post(globalService.getUrlHughesService() + paths.hughesCrearTerminal, JSON.stringify(parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.agregaInfoTerminal = function(obj) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				}
			};
			$http.post(globalService.getUrl() + paths.agregaInfoTerminal, JSON.stringify(obj), config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesSwap = function(obj) {
			var deferred = $q.defer();
			
			var parametros = obj;
			$http.post(globalService.getUrlHughesService() + paths.hughesSwap, JSON.stringify(parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesHistoricoConsumo = function(obj) {
			var deferred = $q.defer();
			
			var parametros = obj;
			$http.post(globalService.getUrlHughesService() + paths.hughesHistoricoConsumo, JSON.stringify(parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		factory.hughesConsumoGrafica = function(obj) {
			var deferred = $q.defer();
			
			var parametros = obj;
			$http.post(globalService.getUrlHughesService() + paths.hughesConsumoGrafica, JSON.stringify(parametros)).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;

		};

		return factory;


	}]);

'use strict';
angular.module('softvFrostApp')
	.factory('CMTSFactory', ["$http", "$q", "$window", "globalService", "$localStorage", function($http, $q, $window, globalService, $localStorage) {
		var factory = {};
		var paths = {
			GetCMTSDatos: '/CMTS/GetCMTSDatos',
			GetHistorialConsumoCMTSInterface: '/CMTS/GetHistorialConsumoCMTSInterface'
		};

		factory.GetHistorialConsumoCMTSInterface = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetHistorialConsumoCMTSInterface, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		factory.GetCMTSDatos = function(parametros) {
			var deferred = $q.defer();
			var config = {
				headers: {
					'Authorization': $localStorage.currentUser.token
				},
				Bloquea: true
			};
			$http.post(globalService.getUrl() + paths.GetCMTSDatos, parametros, config).then(function(response) {
				deferred.resolve(response.data);
			}).catch(function(data) {
				deferred.reject(data);
			});
			return deferred.promise;
		};

		return factory;
	}]);

angular.module('softvFrostApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/Administracion/CMTS.html',
    "<div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">CMTS</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Administración</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'rolesAdd'\" ui-sref=\"home.administracion.cmtsnuevo\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>Nombre</th> <th>IP</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.cmtses|itemsPerPage:5\"> <td>{{ x.Nombre }}</td> <td>{{ x.IP }}</td> <td> <a ui-sref=\"home.administracion.cmtsedita({id:x.IdCMTS})\" permission class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar CMTS\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> <a ng-click=\"$ctrl.CMTSElimina(x.IdCMTS)\" permission class=\"btn btn-xs btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar CMTS\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/Administracion/CMTSEdita.html',
    "<form angular-validator-submit=\"$ctrl.CMTSEdita();\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Edita CMTS</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Administración</a></small> </header> <div class=\"tools\"> <!-- <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> --> <button class=\"btn btn-success btn-sm\" type=\"submit\">Guardar</button> <button type=\"button\" class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.administracion.cmts\"> Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-12\"> <b>Nombre CMTS</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Nombre\" name=\"Nombre\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>IP</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.IP\" name=\"IP\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Comunidad\" name=\"Comunidad\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad Cablemodems</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.ComunidadCablemodem\" name=\"ComunidadCablemodems\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Tipo</b> <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.Tipos track by item.IdTipo\" ng-model=\"$ctrl.Tipo\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-12\"> <b>Interface</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Interface\" name=\"Interface\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Usuario</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Usuario\" name=\"Usuario\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Password</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Password\" name=\"Password\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Enable</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.CMTS.Enable\" name=\"Enable\"> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/Administracion/CMTSNuevo.html',
    "<form angular-validator-submit=\"$ctrl.CMTSNuevo();\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Nuevo CMTS</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Administración</a></small> </header> <div class=\"tools\"> <!-- <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> --> <button class=\"btn btn-success btn-sm\" type=\"submit\">Guardar</button> <button type=\"button\" class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.administracion.cmts\"> Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-12\"> <b>Nombre CMTS</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Nombre\" name=\"Nombre\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>IP</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.IP\" name=\"IP\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Comunidad\" name=\"Comunidad\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Comunidad Cablemodems</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.ComunidadCablemodems\" name=\"ComunidadCablemodems\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Tipo</b> <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.Tipos track by item.IdTipo\" ng-model=\"$ctrl.TipoCMTS\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-12\"> <b>Interface</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Interface\" name=\"Interface\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Usuario</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Usuario\" name=\"Usuario\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Password</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.PasswordS\" name=\"Password\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <b>Enable</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Enable\" name=\"Enable\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/CMTS/CMTSConsumoHistorial.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Historial de Consumo</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-2\"> <div class=\"input-group\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"ctrl.FiltraResultados()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Filtrar Resultados\" data-original-title=\"Filtrar Resultados\"> <i class=\"fa fa-search\"></i> Buscar</a> </div> </div> </div> <div class=\"row\"> <!--<chart-canvas mac=\"{{ctrl.Cablemodem.MAC}}\" style=\"margin-left:15px;\"></chart-canvas>--> <div id=\"container2\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/CMTS/CMTSData.html',
    "<!--<div class=\"card\" style=\"margin-top:10px;\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "  <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px;\">\r" +
    "\n" +
    "    <header>\r" +
    "\n" +
    "      <strong style=\"font-weight:bold; border:none; margin-left:10px;\">Estadísticas Mikrotik</strong>\r" +
    "\n" +
    "    </header>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"card-body\">\r" +
    "\n" +
    "    <div class=\"panel\">\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-4 text-center\">\r" +
    "\n" +
    "          <ui-knob value=\"$ctrl.valueCargaCPU\" options=\"$ctrl.optionsCargaCPU\"></ui-knob>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 text-center\">\r" +
    "\n" +
    "          <ui-knob value=\"$ctrl.valueMemoria\" options=\"$ctrl.optionsMemoria\"></ui-knob>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-md-4 text-center\">\r" +
    "\n" +
    "          <ui-knob value=\"$ctrl.valueHDD\" options=\"$ctrl.optionsHDD\"></ui-knob>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-md-12\">\r" +
    "\n" +
    "          <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "</div>--> <section style=\"margin-top:10px\"> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-sm style-info\"> <header>Consumo en Tiempo Real</header> <div class=\"tools\"> <button style=\"margin-top:7px\" class=\"btn-sm btn-block ink-reaction btn-default-dark\" ng-click=\"$ctrl.HistorialConsumo()\"><i class=\"fa fa-area-chart\"></i> Historial</button> </div> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-lg-4\"> <div class=\"card card-outlined style-warning\"> <div class=\"card-head card-head-xs style-warning\"> <header>Carga de CPU</header> </div> <div class=\"card-body style-default-bright text-center\"> <ui-knob value=\"$ctrl.valueCargaCPU\" options=\"$ctrl.optionsCargaCPU\"></ui-knob> </div> </div> </div> <div class=\"col-lg-4\"> <div class=\"card card-outlined style-danger\"> <div class=\"card-head card-head-xs style-danger\"> <header>Memoria Disponible</header> </div> <div class=\"card-body style-default-bright text-center\"> <ui-knob value=\"$ctrl.valueMemoria\" options=\"$ctrl.optionsMemoria\"></ui-knob> </div> </div> </div> <div class=\"col-lg-4\"> <div class=\"card card-outlined style-success\"> <div class=\"card-head card-head-xs style-success\"> <header>HDD Disponible</header> </div> <div class=\"card-body style-default-bright text-center\"> <ui-knob value=\"$ctrl.valueHDD\" options=\"$ctrl.optionsHDD\"></ui-knob> </div> </div> </div> </div> </section>"
  );


  $templateCache.put('views/Cablemodems/DetalleCablemodem.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Detalle de Aparato: {{ctrl.Cablemodem.MAC}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row text-center\"> <h4 class=\"text-info\">Datos SOFTV</h4> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Contrato:</b><br> {{ctrl.Cliente.Contrato}} </div> <div class=\"col-md-3\"> <b>Status:</b><br> {{ctrl.Cliente.Status}} </div> <div class=\"col-md-3\"> <b>Mes Pagado:</b><br> {{ctrl.Cliente.ultimo_mes }} {{ctrl.Cliente.ultimo_anio}} </div> <div class=\"col-md-3\"> <b>Nombre:</b><br> {{ctrl.Cliente.Nombre}} </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Servicio:</b><br> {{ctrl.Cliente.Servicio}} </div> <div class=\"col-md-3\"> <b>Límite Subida:</b><br> {{ctrl.Cliente.LimiteSubida}} </div> <div class=\"col-md-3\"> <b>Límite Bajada:</b><br> {{ctrl.Cliente.LimiteBajada}} </div> </div> </div> <!--<div class=\"row text-center\">\r" +
    "\n" +
    "    <h4 class=\"text-info\">Datos Técnicos</h4>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <div class=\"row text-center\">\r" +
    "\n" +
    "    <div class=\"col-md-4\">\r" +
    "\n" +
    "      <ui-knob value=\"ctrl.valueSNR\" options=\"ctrl.optionsSNR\"></ui-knob>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-md-4\">\r" +
    "\n" +
    "      <ui-knob value=\"ctrl.valueUST\" options=\"ctrl.optionsUST\"></ui-knob>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-md-4\">\r" +
    "\n" +
    "      <ui-knob value=\"ctrl.valueDST\" options=\"ctrl.optionsDST\"></ui-knob>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "  </div>--> <div class=\"row text-center\"> <h4 class=\"text-info\">Historial de Consumo</h4> </div> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <div class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-2\"> <div class=\"input-group\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"ctrl.FiltraResultados()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Filtrar Resultados\" data-original-title=\"Filtrar Resultados\"> <i class=\"fa fa-search\"></i> Buscar</a> </div> </div> </div> <div class=\"row\"> <!--<chart-canvas mac=\"{{ctrl.Cablemodem.MAC}}\" style=\"margin-left:15px;\"></chart-canvas>--> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/Cablemodems/ListadoCablemodems.html',
    "<div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Listado de Aparatos</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Aparatos</a></small> </header> </div> <div class=\"card-body\"> <div class=\"panel form-element-padding\"> <!--<div class=\"row\">--> <!--<div class=\"col-md-4\">\r" +
    "\n" +
    "          <b>CMTS</b>\r" +
    "\n" +
    "          <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.CMTSs track by item.IdCMTS\" ng-model=\"$ctrl.CMTS\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required ng-change=\"$ctrl.CambiaCMTS()\">\r" +
    "\n" +
    "            <option value=\"\">Selecciona</option>\r" +
    "\n" +
    "          </select>\r" +
    "\n" +
    "        </div>--> <!--</div>--> <br> <table class=\"table\" st-table=\"$ctrl.Cablemodems\" st-safe-src=\"$ctrl.rowCablemodems\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCablemodems\"> <thead> <tr> <th st-sort=\"MAC\">MAC</th> <th st-sort=\"Contrato\">Contrato</th> <th st-sort=\"Cliente\">Cliente</th> <th st-sort=\"Servicio\">Servicio</th> <th st-sort=\"Opciones\">Opciones</th> </tr> <tr> <th> <input st-search=\"MAC\" placeholder=\"MAC\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Contrato\" placeholder=\"Contrato\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Cliente\" placeholder=\"Cliente\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Servicio\" placeholder=\"Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Fap\" placeholder=\"\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.Cablemodems|itemsPerPage:15\"> <td>{{ x.MAC }}</td> <td>{{ x.Contrato }}</td> <td>{{ x.Nombre }}</td> <td>{{ x.Servicio }}</td> <td> <a ng-click=\"$ctrl.DetalleCablemodem(x)\" class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Detalle Cablemodem\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i></a> <a ng-click=\"$ctrl.ConsumoTiempoReal(x)\" class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Consumo Tiempo Real\"><i class=\"fa fa-area-chart\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"15\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/Cablemodems/TiempoRealCablemodem.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Consumo Tiempo Real: {{ctrl.Cablemodem.MAC}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row text-center\"> <h4 class=\"text-info\">Datos SOFTV</h4> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Contrato:</b><br> {{ctrl.Cliente.Contrato}} </div> <div class=\"col-md-3\"> <b>Status:</b><br> {{ctrl.Cliente.Status}} </div> <div class=\"col-md-3\"> <b>Mes Pagado:</b><br> {{ctrl.Cliente.ultimo_mes }} {{ctrl.Cliente.ultimo_anio}} </div> <div class=\"col-md-3\"> <b>Nombre:</b><br> {{ctrl.Cliente.Nombre}} </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b>Servicio:</b><br> {{ctrl.Cliente.Servicio}} </div> <div class=\"col-md-3\"> <b>Límite Subida:</b><br> {{ctrl.Cliente.LimiteSubida}} </div> <div class=\"col-md-3\"> <b>Límite Bajada:</b><br> {{ctrl.Cliente.LimiteBajada}} </div> </div> </div> <!--\r" +
    "\n" +
    "    <div class=\"row text-center\">\r" +
    "\n" +
    "      <h4 class=\"text-info\">Datos Técnicos</h4>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row text-center\">\r" +
    "\n" +
    "      <div class=\"col-md-4\">\r" +
    "\n" +
    "        <ui-knob value=\"ctrl.valueSNR\" options=\"ctrl.optionsSNR\"></ui-knob>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-4\">\r" +
    "\n" +
    "        <ui-knob value=\"ctrl.valueUST\" options=\"ctrl.optionsUST\"></ui-knob>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "      <div class=\"col-md-4\">\r" +
    "\n" +
    "        <ui-knob value=\"ctrl.valueDST\" options=\"ctrl.optionsDST\"></ui-knob>\r" +
    "\n" +
    "      </div>\r" +
    "\n" +
    "    </div>--> <div class=\"row text-center\"> <h4 class=\"text-info\">Consumo Actual</h4> </div> <div class=\"row\"> <!--<chart-realtime mac=\"{{ctrl.Cablemodem.MAC}}\" ip=\"{{ctrl.IP}}\" style=\"margin-left:15px;\"></chart-canvas>--> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> <!--<div id=\"chart_container\">\r" +
    "\n" +
    "        <div id=\"chart\" class=\"rickshaw_graph\">\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div id=\"legend_container\">\r" +
    "\n" +
    "          <div id=\"smoother\" title=\"Smoothing\"></div>\r" +
    "\n" +
    "          <div id=\"legend\" class=\"rickshaw_legend\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div id=\"slider\"></div>\r" +
    "\n" +
    "      </div>--> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/configuracion/NuevoRol.html',
    "<form angular-validator-submit=\"$ctrl.GuardarRol();\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">{{$ctrl.titulo}}</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Configuración</a></small> </header> <div class=\"tools\"> <!-- <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> --> <button class=\"btn btn-success btn-sm\" type=\"submit\" permission permission-only=\"'rolesAdd'\">Guardar</button> <button type=\"button\" class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.provision.roles\"> Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-5\"> <div class=\"col-md-12\"> <b>Nombre de rol</b> <input type=\"text\" class=\"form-control col-md-4\" ng-model=\"$ctrl.Nombre\" name=\"Nombre\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\"> </div> <div class=\"col-md-12\"> <br> <b>Descripción de rol</b> <textarea class=\"form-control col-md-4\" ng-model=\"$ctrl.Descripcion\" name=\"Descripcion\" required-message=\"'Este campo es obligatorio.'\" placeholder=\"Describe brevemente las funciones de este rol en el sistema\" validate-on=\"dirty\" required validate-on=\"dirty\"></textarea> </div> <div class=\"col-md-12\"> <br> <b>Status</b> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"$ctrl.Estatus\"><span> Activo</span></label></div> </div> </div> <div class=\"col-md-4 text-center\"> <table class=\"table\" style=\"font-size:12px\"> <thead> <th>Comando</th> <th>Selecciona</th> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.comandos\"> <td>{{x.Nombre}}</td> <td> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.selected\"><span> </span></label></div> </td> </tr> </tbody> </table> </div> </div> </div> </div>  </form>"
  );


  $templateCache.put('views/configuracion/NuevoUsuario.html',
    "<form angular-validator-submit=\"$ctrl.GuardarUsuario()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">{{$ctrl.titulo}}</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Configuración>{{$ctrl.titulo}}</small> </header> <div class=\"tools\"> <button class=\"btn btn-default btn-sm\" ui-sref=\"home.provision.usuarios\">Cancelar</button> <button class=\"btn btn-success btn-sm\" type=\"submit\">Guardar</button> </div> </div> <div class=\"card-body\" style=\"margin-bottom:100px\"> <div class=\"row\"> <div class=\"col-md-2\"> </div> <div class=\"col-md-4\"> <div class=\"col-md-12\"> <b>Nombre</b> <input type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.Nombre\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-12\"> <b>Usuario</b> <input type=\"text\" class=\"form-control\" ng-change=\"$ctrl.existe()\" ng-model=\"$ctrl.Descripcion\" name=\"descripcion\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required ng-disabled=\"$ctrl.userText\"> <small style=\"color:red\" ng-show=\"$ctrl.isDuplicate\">El nombre de usuario ya esta registrado, por favor introduce uno diferente.</small> </div> <div class=\"col-md-12\"> <b>Correo</b> <input type=\"email\" class=\"form-control\" ng-model=\"$ctrl.Correo\" placeholder=\"correo@mail.com\" name=\"correo\" validate-on=\"dirty\" invalid-message=\"'Formato de correo inválido.'\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-12\"> <br> <b>Selecciona Rol</b> <select class=\"form-control\" ng-options=\"item as item.Nombre for item in $ctrl.Roles track by item.IdRol\" ng-model=\"$ctrl.Rol\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">selecciona</option> </select> </div> </div> <div class=\"col-md-4\"> <div class=\"row text-center\"> <p class=\"text-danger\"><b><i class=\"fa fa-key\"></i> Ingresa una contraseña segura para la cuenta</b></p> </div> <div class=\"row\" ng-show=\"$ctrl.ValidatePanel\"> <div class=\"col-md-8\"> <b><i class=\"fa fa-key\"></i> ¿Necesitas modificar la contraseña?</b> <input type=\"password\" class=\"form-control\" ng-model=\"$ctrl.PassValidate\" placeholder=\"contraseña anterior\"> </div> <div class=\"col-md-4\"> <br> <a class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.ValidaPass()\">Validar</a> </div> </div> <div class=\"row\" ng-show=\"$ctrl.passwordPanel\"> <div class=\"col-md-12\"> <b>Contraseña</b> <input ng-if=\"$ctrl.editar == true\" type=\"Password\" class=\"form-control\" ng-model=\"$ctrl.Contrasena\" name=\"contra\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-12\"> <b>Repite la contraseña</b> <input ng-if=\"$ctrl.editar == true\" type=\"Password\" class=\"form-control\" ng-model=\"$ctrl.Contrasena2\" name=\"contra\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> </div> <div class=\"col-md-2\"> </div> </div> </div> </div></form>"
  );


  $templateCache.put('views/configuracion/permisos.html',
    "<style>td {\r" +
    "\n" +
    "    padding: 2px !important;\r" +
    "\n" +
    "    padding-left: 15px !important;\r" +
    "\n" +
    "  }</style> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Permisos</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Configuración</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" ng-click=\"$ctrl.Guardar()\" permission permission-only=\"'permisosAdd'\">Guardar</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-4\"></div> <div class=\"col-md-4\"></div> <div class=\"col-md-4\"> <b>Selecciona un Rol</b> <select ng-model=\"$ctrl.Rol\" class=\"form-control input-sm\" ng-change=\"$ctrl.ObtenPermisos();\" ng-options=\"item as item.Nombre for item in $ctrl.Roles track by item.IdRol\"> <option value=\"\">Selecciona</option> </select> </div> </div> <table class=\"table\"> <thead> <tr> <th>Módulo</th> <th>Consultar</th> <th>Agregar</th> <th>Editar</th> <th>Eliminar</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.Modules\"> <td ng-if=\"x.tipo == 1\"><b>{{x.DisplayName}}</b></td> <td ng-if=\"x.tipo != 1\">{{x.DisplayName}}</td> <td> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" class=\"input-sm\" ng-model=\"x.OptSelect\"><span></span></label></div> </td> <td ng-if=\"x.tipo != 1\"> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.OptAdd\"><span></span></label></div> <!-- <div class=\"checkbox-inline checkbox-styled checkbox-info\">\r" +
    "\n" +
    "              <input type=\"checkbox\" class=\"checkbox\" name=\"{{x.IdModule}}Add{{x.IdModule}}\" id=\"{{x.IdModule}}Add{{x.IdModule}}\" ng-model=\"x.OptAdd\">\r" +
    "\n" +
    "              <span for=\"{{x.IdModule}}Add\"></span>\r" +
    "\n" +
    "            </div> --> </td> <td ng-if=\"x.tipo != 1\"> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.OptUpdate\"><span></span></label></div> <!-- <div class=\"checkbox-inline checkbox-styled checkbox-info\">\r" +
    "\n" +
    "              <input type=\"checkbox\" class=\"checkbox\" name=\"{{x.IdModule}}Update{{x.IdModule}}\" id=\"{{x.IdModule}}Update{{x.IdModule}}\" ng-model=\"x.OptUpdate\">\r" +
    "\n" +
    "              <span for=\"{{x.IdModule}}Update\"></span>\r" +
    "\n" +
    "            </div> --> </td> <td ng-if=\"x.tipo != 1\"> <div><label class=\"checkbox-inline checkbox-styled checkbox-info\"><input type=\"checkbox\" ng-model=\"x.OptDelete\"><span></span></label></div> <!-- <div class=\"checkbox-inline checkbox-styled checkbox-info\">\r" +
    "\n" +
    "              <input type=\"checkbox\" class=\"checkbox\" ng-model=\"x.OptDelete\" name=\"{{x.IdModule}}Delete{{x.IdModule}}\" id=\"{{x.IdModule}}Delete{{x.IdModule}}\">\r" +
    "\n" +
    "              <span for=\"{{x.IdModule}}Delete\"></span>\r" +
    "\n" +
    "            </div> --> </td> </tr> </tbody> </table> </div> </div>"
  );


  $templateCache.put('views/configuracion/roles.html',
    "<div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Roles</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Configuración</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'rolesAdd'\" ui-sref=\"home.provision.nuevorol\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>ID</th> <th>Nombre</th> <th>Descripcion</th> <th>Estatus</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.Roles|itemsPerPage:5\"> <td>{{ x.IdRol }}</td> <td>{{ x.Nombre }}</td> <td>{{ x.Descripcion }}</td> <td ng-if=\"x.Estado==true\"> <span class=\"label label-outline label-success\">Activo</span> </td> <td ng-if=\"x.Estado==false\"> <span class=\"label label-outline label-danger\">Desactivado</span> </td> <td> <a ui-sref=\"home.provision.editarol({id:x.IdRol })\" permission permission-only=\"'rolesUpdate'\" class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar Rol\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/configuracion/usuarios.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Usuarios</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Configuración>Usuarios</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button ui-sref=\"home.provision.nuevousuario\" type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'terminalesAdd'\" ui-sref=\"home.provision.terminalesNueva\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"col-md-2\"> <br> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.Busuario\" placeholder=\"NOMBRE DE USUARIO\"> </div> <div class=\"col-md-1\"> <br> <button type=\"button\" class=\"btn btn-info btn-xs\" ng-click=\"$ctrl.Busca(1);\"><i class=\"fa fa-search\"></i> Buscar</button> </div> <div class=\"col-md-2\"> <br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"CORREO DE USUARIO\" ng-model=\"$ctrl.Bcorreo\"> </div> <div class=\"col-md-1\"> <br> <button type=\"button\" class=\"btn btn-info btn-xs\" ng-click=\"$ctrl.Busca(2);\"><i class=\"fa fa-search\"></i> Buscar</button> </div> <div class=\"col-md-3\" style=\"margin-top:20px\"> <select class=\"form-control input-sm\" ng-options=\"item as item.Nombre for item in $ctrl.Roles track by item.IdRol\" ng-change=\"$ctrl.Busca(3);\" ng-model=\"$ctrl.Rol\" name=\"rol\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">SELECCIONA ROL</option> </select> </div> </div> <hr> <div class=\"row\"> <div class=\"col-md-12\"> <table class=\"table\"> <thead> <tr> <th>ID</th> <th>Rol</th> <th>Usuario</th> <th>Nombre</th> <th>Correo</th> <th>Status</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.Usuarios|itemsPerPage:5\"> <td>{{ x.IdUsuario }}</td> <td>{{ x.NombreRol }}</td> <td>{{ x.Usuario }}</td> <td>{{ x.Nombre }}</td> <td>{{ x.Email }}</td> <td ng-if=\"x.Estado==true\"> <span class=\"label label-outline label-success\">Activo</span> </td> <td ng-if=\"x.Estado==false\"> <span class=\"label label-outline label-danger\">Desactivado</span> </td> <td> <a ui-sref=\"home.provision.editausuario({id:x.IdUsuario })\" permission permission-only=\"'usuariosUpdate'\" class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar usuario\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/dashboard.html',
    "<section style=\"margin-top:10px\"> <div class=\"row\"> <div class=\"col-lg-5\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head style-primary-dark\"> <header>CMTS Registrados en el sistema</header> </div> <div class=\"card-body style-default-bright\"> <div ng-repeat=\"x in $ctrl.CMTSs\"> <div class=\"col-md-3\"> <button class=\"btn btn-block ink-reaction\" ng-class=\"x.Activo ? 'btn-success' : 'btn-default-bright'\" type=\"button\" ng-click=\"$ctrl.CambiaCMTS(x)\">{{x.Nombre}}</button> </div> </div> </div> </div> </div> <div class=\"col-lg-5\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Descripción</header> </div> <div class=\"card-body style-default-bright\"> asdasdasdasda </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-danger no-margin\"> <strong class=\"text-lg\">13 dias 15 horas</strong><br> <span class=\"opacity-50\">Tiempo de Actividad</span> <div class=\"stick-bottom-left-right\"> <div class=\"progress progress-hairline no-margin\"> <div class=\"progress-bar progress-bar-danger\" style=\"width:43%\"> </div> </div> </div> </div> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-danger no-margin\"> <strong class=\"text-lg\">Bajada 15 / Subida 15</strong><br> <span class=\"opacity-50\">Consumo de Datos</span> <div class=\"stick-bottom-left-right\"> <div class=\"progress progress-hairline no-margin\"> <div class=\"progress-bar progress-bar-danger\" style=\"width:43%\"> </div> </div> </div> </div> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-danger no-margin\"> <strong class=\"text-lg\">4%</strong><br> <span class=\"opacity-50\">Carga de CPU Promedio</span> <div class=\"stick-bottom-left-right\"> <div class=\"progress progress-hairline no-margin\"> <div class=\"progress-bar progress-bar-danger\" style=\"width:43%\"> </div> </div> </div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Módems en el Sistema</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div class=\"col-md-8\"> <div id=\"morris-donut-graph\"> </div> </div> <div class=\"col-md-4\"> <div style=\"margin-top:15px\" class=\"alert alert-callout alert-danger\"> <strong class=\"text-md\">En línea: 12</strong><br> <strong class=\"text-md\">Apagados: 30</strong><br> <strong class=\"text-md\">Suspendidos: 20</strong><br> <strong class=\"text-md\">En proceso: 5</strong><br> </div> </div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"chart_container\"> <div id=\"chart\" class=\"rickshaw_graph\"> </div> <div id=\"legend_container\"> <div id=\"smoother\" title=\"Smoothing\"></div> <div id=\"legend\" class=\"rickshaw_legend\"></div> </div> <div id=\"slider\"></div> </div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <angular-chart options=\"$ctrl.options\" instance=\"$ctrl.instance\"></angular-chart> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"container\" style=\"min-width: 310px; height: 400px; margin: 0 auto\"></div> </div> </div> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"card card-outlined style-gray-light\"> <div class=\"card-head card-head-xs style-info\"> <header>Historial</header> </div> <div class=\"card-body style-default-bright\"> <div class=\"row\"> <div id=\"morris-line-graph\"> </div> </div> </div> </div> </div> </div> </section> <!--<section class=\"section-account\">\r" +
    "\n" +
    "\t<div class=\"card contain-xs style-transparent\">\r" +
    "\n" +
    "\t\t<div class=\"card-body\">\r" +
    "\n" +
    "\t\t\t<div class=\"row\">\r" +
    "\n" +
    "\t\t\t\t<div class=\"col-md-12 text-center\">\r" +
    "\n" +
    "\t\t\t\t\t<img src=\"images/StarGo.jpg\" width=\"350\">\r" +
    "\n" +
    "                    <hr>\r" +
    "\n" +
    "\t\t\t\t\t<h2 class=\"text-light\">¡BIENVENIDO!</h2>\r" +
    "\n" +
    "\t\t\t\t</div>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</section>-->"
  );


  $templateCache.put('views/incidencias/bandeja.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Bandeja de Tickets</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Bandeja Tickets</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <diav class=\"panel form-element-padding\"> <form angular-validator-submit=\"submitMyForm()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel-heading\"> <div class=\"tools\"> <h4 class=\"text-muted\">Bandeja</h4> <p class=\"text-right\"> <a class=\"btn btn-raised btn-primary btn-sm\" type=\"button\" ui-sref=\"home.incidencias.registro\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></button> </p> </div> </div> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"col-md-12 table-responsive\"> <table class=\"table table-striped table-hover table-condensed\"> <thead class=\"text-center\"> <tr> <th>N De Ticket</th> <th>Prioridad</th> <th>Estado</th> <th>SAN</th> <th>Descripción</th> <th>Usuario Asignado</th> <th>Fecha Registro</th> <th>Último Usuario</th> <th>Última Actualización</th> <th>Fecha Vencimiento</th> </tr> </thead> <tbody> <!-- dir-paginate=\"x in $ctrl.ticketsSucuarsales|itemsPerPage:8\" --> <tr dir-paginate=\"x in $ctrl.tickets | itemsPerPage:5\"> <td> <a href=\"\" ng-click=\"$ctrl.verDetalle(x.IdTicket)\">{{x.IdTicket}}</a> </td> <td>{{x.Prioridad}}</td> <td>{{x.Estado}}</td> <td>{{x.SAN}}</td> <td>{{x.Descripcion}}</td> <td>{{x.Usuario}}</td> <td>{{x.Fecha}}</td> <td>{{}}</td> <td>{{}}</td> <td>{{x.FechaCierre}}</td> </tr> </tbody> </table> <div style=\"padding-left: 20px\"> <dir-pagination-controls max-size=\"8\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </form> </diav></div> </div> "
  );


  $templateCache.put('views/incidencias/modalDetalleTicket.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Ticket{{}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <div class=\"tabbable\"> <!-- Only required for left/right tabs --> <ul class=\"nav nav-tabs\"> <li class=\"active\"><a href=\"\" data-target=\"#tab1\" data-toggle=\"tab\">Ver Ticket</a></li> <li><a href=\"\" data-target=\"#tab2\" data-toggle=\"tab\">Avances</a></li> <li><a href=\"\" data-target=\"#tab3\" data-toggle=\"tab\">Cerrar Ticket</a></li> </ul> <div class=\"tab-content\"> <div class=\"tab-pane active\" id=\"tab1\"> <div class=\"tab-pane active\" id=\"ver\"> <div class=\"row\" style=\"margin-top: 30px\"> <div class=\"col-md-4 col-md-offset-1\"> <p>Cliente: {{}}</p> </div> <div class=\"col-md-4\"> <p>Terminal: {{$ctrl.detalleTicket.SAN}}</p> </div> <div class=\"col-md-3\"> <p>Usuario: {{$ctrl.detalleTicket.Usuario}}</p> </div> </div> <hr> <div class=\"row\" style=\"margin-top: 30px\"> <h4 class=\"text-muted\" style=\"padding-left: 15px\">Detalle</h4> <div class=\"col-md-4 col-md-offset-1\"> <p>Síntoma: {{$ctrl.sintoma}}</p> </div> <div class=\"col-md-4\"> <p>Prioridad: {{$ctrl.detalleTicket.Prioridad}}</p> </div> <div class=\"col-md-3\"> <p>Fecha de Registro: {{$ctrl.detalleTicket.Fecha}}</p> </div> <div style=\"padding-top: 30px\"> <h4 class=\"text-muted\" style=\"padding-left: 15px\">Descripción</h4> <div class=\"col-sm-12\"> <textarea type=\"text\" disabled>{{$ctrl.detalleTicket.Descripcion}}</textarea> </div> </div> </div> </div> </div> <div class=\"tab-pane\" id=\"tab2\"> <form angular-validator-submit=\"$ctrl.avanceTicket()\" name=\"avance\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"col-md-6\" style=\"padding-top: 15px\"> <h4 class=\"text-muted\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Registrar Avance</h4> </div> <div class=\"col-md-6 text-right\"> <p class=\"text-muted\">Fecha del Registro: {{$ctrl.fecha | date:'dd-MM-yyyy HH:mm:ss'}}</p><br> <p>Usuario: <span style=\"color:#51AAFA\">{{$ctrl.usuario}}</span></p> </div> <div class=\"col-md-12\"> <h5 class=\"text-muted\">Descripción del Avance</h5> <div class=\"col-md-12\"> <textarea type=\"text\" name=\"avanc\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.avance\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> <div class=\"col-md-12 text-right\"> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-plus-circle\"></i> Agregar Avance</button> </div> <br><br> <div class=\"row\"> <div class=\"col-md-6\" style=\"padding-top: 15px\"> <h4 class=\"text-muted\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Historial de Avance</h4> </div> <div class=\"col-md-12\"> <table class=\"table\"> <thead style=\"background:#51AAFA\"> <tr> <th>Fecha</th> <th>Usuario</th> <th>Tipo</th> <th>Avance</th> <th>Archivo</th> <th>Opción</th> </tr> </thead> <tbody> <tr ng-show=\"$ctrl.sinDatos\"> <td colspan=\"5\" class=\"text-center\">No se encontraron datos</td> </tr> <tr dir-paginate=\"x in $ctrl.desglose | itemsPerPage:5\"> <td>{{ }}</td> <td>{{ }}</td> <td>{{ }}</td> <td>{{ }}</td> <td>{{ }}</td> <td></td> </tr> </tbody> </table> </div> </div> </div> </form> </div> <div class=\"tab-pane\" id=\"tab3\"> <form angular-validator-submit=\"$ctrl.closeTicket()\" name=\"cerrar\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"col-md-6\" style=\"padding-top: 15px\"> <h4 class=\"text-muted\"><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i> Cierre de ticket de incidencia</h4> </div> <div class=\"col-md-6 text-right\"> <p class=\"text-muted\">Fecha del Registro: {{$ctrl.fecha | date:'dd-MM-yyyy HH:mm:ss'}}</p><br> <p>Usuario: <span style=\"color:#51AAFA\">{{$ctrl.usuario}}</span></p> </div><br> <div class=\"row\"> <div class=\"form-group\"> <label class=\"col-sm-2 col-md-offset-1 control-label text-left\">Solución</label> <div class=\"col-sm-8\"> <select validate-on=\"dirty\" name=\"solucion\" class=\"form-control\" ng-model=\"$ctrl.selectedSolucion\" ng-options=\"v.Descripcion for v in $ctrl.solucion track by v.IdSolucion\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione solución</option> </select> </div> </div> </div><br> <div class=\"row\"> <div class=\"form-group\"> <label class=\"col-sm-2 col-md-offset-1 control-label text-left\">Causa</label> <div class=\"col-sm-8\"> <input name=\"causaCierre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.causa\" required-message=\"'Error!, Este campo es obligatorio.'\" required> </div> </div> </div> <div class=\"col-md-12\"> <h5 class=\"text-muted\">Descripción de la solución</h5> <div class=\"col-md-12\"> <textarea name=\"descripcionSolucion\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.descripcionSolucion\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> <div class=\"col-md-6\"> <input type=\"file\" name=\"files\"> <button type=\"button\" ng-click=\"$ctrl.ValidaArchivo()\">Enviar</button> </div> <div class=\"col-md-6 text-right\"> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-minus-circle\"></i> Cerrar Avance</button> </div> </div> </form> </div> </div> </div> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancelar</button> </div>"
  );


  $templateCache.put('views/incidencias/registro.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Registro de Tickets de Autenticación</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Registro Tickets</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> <form angular-validator-submit=\"$ctrl.guardar()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator angular-validator-quiet> <div class=\"panel-heading\"> <div class=\"tools\"> <h4 class=\"text-muted\">Información Técnica</h4> </div> </div> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Terminal</label> <div class=\"col-sm-4\"> <input type=\"number\" name=\"terminal\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.san\" required-message=\"'Error!, Este campo es obligatorio.'\" required placeholder=\"Buscar por terminal\"> <!-- <div class=\"col-md-5\">\r" +
    "\n" +
    "                                    <button class=\"btn btn-primary\" type=\"button\"  data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\" ng-click=\"$ctrl.getTerminal()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></button>\r" +
    "\n" +
    "                                </div> --> </div> <div class=\"col-md-3\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getTerminal()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"><i class=\"fa fa-search\"></i> Buscar</a> </div> </div> </div> <div class=\"row\" ng-show=\"$ctrl.busqueda\"> <div class=\"col-md-6\"> <table class=\"table\"> <thead style=\"background:#2C3F8E\"> <tr> <th colspan=\"5\" class=\"text-center\"><span style=\"color:white\">Búsqueda del terminal</span></th> </tr> </thead> <tbody> <tr class=\"text-center\"> <td>S/N</td> <td>Estado</td> <td>MAC</td> <td>Site Id</td> <td>Subscriptor</td> </tr> <tr> <td>{{ $ctrl.terminalDatos.ESN }}</td> <td>{{ $ctrl.terminalDatos.Estatus }}</td> <td>{{ }}</td> <td>{{ $ctrl.terminalDatos.SAN }}</td> <td>{{ $ctrl.terminalDatos.Suscriptor }}</td> </tr> </tbody> </table> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Motivo</label> <div class=\"col-sm-5\"> <select name=\"motivo\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.selectedMotivo\" ng-options=\"v.Descripcion for v in $ctrl.motivo track by v.IdMotivoTicket\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione motivo</option> </select> </div> <label class=\"col-sm-1 control-label text-right\">Prioridad</label> <div class=\"col-sm-4\"> <select name=\"prioridad\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.prioridad\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value disabled>Seleccione prioridad</option> <option>Alta</option> <option>Media</option> <option>Baja</option> </select> </div> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Síntoma</label> <div class=\"col-sm-5\"> <select validate-on=\"dirty\" name=\"sintoma\" class=\"form-control\" ng-model=\"$ctrl.selectedSintoma\" ng-options=\"v.Descripcion for v in $ctrl.sintoma track by v.IdSintoma\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione síntoma</option> </select> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <h4 class=\"text-muted\">Datos del Contacto</h4> <hr> </div> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-4\"> <select validate-on=\"dirty\" name=\"tipo\" class=\"form-control\" ng-model=\"$ctrl.selectedTipoContacto\" ng-options=\"v.Nombre for v in $ctrl.tipoContacto track by v.IdTipoContacto\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione tipo contacto</option> </select> </div> <div class=\"col-sm-8\"> <input type=\"text\" name=\"contacto\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.nombreContacto\" required-message=\"'Error!, Este campo es obligatorio.'\" required placeholder=\"Nombre del contrato que notificó la incidencia\"> </div> </div> </div> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-4\"> <select validate-on=\"dirty\" name=\"medioCom\" class=\"form-control\" class=\"form-control\" ng-model=\"$ctrl.selectedMedioComun\" ng-options=\"v.Nombre for v in $ctrl.medioComun track by v.IdMedioComunicacion\" required-message=\"'Error!, Este campo es obligatorio.'\" required> <option value=\"\" disabled selected>Seleccione medio de comunicación</option> </select> </div> <div class=\"col-sm-8\"> <input type=\"text\" name=\"medio\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.numeroContacto\" required-message=\"'Error!, Este campo es obligatorio.'\" required placeholder=\"Nombre del contrato que notificó la incidencia\"> </div> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <h4 class=\"text-muted\">Descripción</h4> <hr> </div> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-12\"> <textarea type=\"text\" name=\"descripcion\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.descripcion\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <p class=\"text-right\"> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"button\" ng-click=\"myForm.reset()\"><i class=\"fa fa-eraser\"></i>Limpiar</button> <button class=\"btn btn-raised btn-primary btn-sm\" type=\"submit\"><i class=\"fa fa-floppy-o\"></i>Guardar Atención</button> </p> </div> </div> </div> </form> </div> </div> </div>"
  );


  $templateCache.put('views/incidencias/registroSistema.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Registro de Ticket a Sistemas</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Registro Ticket Sistema</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> <form angular-validator-submit=\"submitMyForm()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel-heading\"> </div> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"col-md-12\"> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Urgencia</label> <div class=\"col-sm-5\"> <select class=\"form-control\"> <option>Alta</option> <option>Media</option> <option>Baja</option> </select> </div> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Impacto</label> <div class=\"col-sm-5\"> <select class=\"form-control\"> <option>Alto</option> <option>Medio</option> <option>Bajo</option> </select> </div> </div> </div> <div class=\"row\" style=\"padding-top:10px\"> <div class=\"form-group\"> <label class=\"col-sm-1 control-label text-right\">Prioridad</label> <div class=\"col-sm-5\"> <input class=\"form-control\" type=\"text\" disabled> </div> </div> </div> </div> <div class=\"col-md-12\"> <div class=\"tools\"> <h4 class=\"text-muted\">Descripción</h4> <hr> </div> <div class=\"col-md-12\"> <div class=\"row\"> <div class=\"form-group\"> <div class=\"col-sm-12\"> <textarea type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"form.dirty\" required-message=\"'Error!, Este campo es obligatorio.'\" required></textarea> </div> </div> </div> </div> </div> </div> </form> </div> </div> </div>"
  );


  $templateCache.put('views/loading.html',
    "<style>.cssload-fond{\r" +
    "\n" +
    "\tposition:relative;\r" +
    "\n" +
    "\tmargin: auto;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".cssload-container-general\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tanimation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-o-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-ms-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-webkit-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\t\t-moz-animation:cssload-animball_two 1.6s infinite;\r" +
    "\n" +
    "\twidth:43px; height:43px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-internal\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\twidth:43px; height:43px; position:absolute;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ballcolor\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\twidth: 19px;\r" +
    "\n" +
    "\theight: 19px;\r" +
    "\n" +
    "\tborder-radius: 50%;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_1, .cssload-ball_2, .cssload-ball_3, .cssload-ball_4\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tposition: absolute;\r" +
    "\n" +
    "\tanimation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-o-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-ms-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-webkit-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "\t\t-moz-animation:cssload-animball_one 1.6s infinite ease;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_1\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgb(76,21,176);\r" +
    "\n" +
    "\ttop:0; left:0;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_2\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgb(19,80,171);\r" +
    "\n" +
    "\ttop:0; left:23px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_3\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgba(28,69,153,0.13);\r" +
    "\n" +
    "\ttop:23px; left:0;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".cssload-ball_4\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\tbackground-color:rgb(17,155,173);\r" +
    "\n" +
    "\ttop:23px; left:23px;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "@keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-o-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-ms-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-webkit-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-moz-keyframes cssload-animball_one\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{ position: absolute;}\r" +
    "\n" +
    "\t50%{top:12px; left:12px; position: absolute;opacity:0.5;}\r" +
    "\n" +
    "\t100%{ position: absolute;}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-o-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-o-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-o-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-o-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-ms-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-ms-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-ms-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-ms-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-webkit-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-webkit-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-webkit-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-webkit-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "@-moz-keyframes cssload-animball_two\r" +
    "\n" +
    "{\r" +
    "\n" +
    "\t0%{-moz-transform:rotate(0deg) scale(1);}\r" +
    "\n" +
    "\t50%{-moz-transform:rotate(360deg) scale(1.3);}\r" +
    "\n" +
    "\t100%{-moz-transform:rotate(720deg) scale(1);}\r" +
    "\n" +
    "}</style> <div class=\"block-ui-overlay\" style=\"background-color: transparent\"></div> <div class=\"block-ui-message-container\" style=\"background-color: transparent\" aria-live=\"assertive\" aria-atomic=\"true\"> <div class=\"block-ui-message\" ng-class=\"$_blockUiMessageClass\" style=\"background-color: transparent\"> <div> <div align=\"center\" class=\"cssload-fond\"> <div class=\"cssload-container-general\"> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_1\"> </div></div> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_2\"> </div></div> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_3\"> </div></div> <div class=\"cssload-internal\"><div class=\"cssload-ballcolor cssload-ball_4\"> </div></div> </div> </div> </div> </div> </div> "
  );


  $templateCache.put('views/login/login.html',
    "<style>.login-page {\r" +
    "\n" +
    "    width: 360px;\r" +
    "\n" +
    "    padding: 8% 0 0;\r" +
    "\n" +
    "    margin: auto;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form {\r" +
    "\n" +
    "    position: relative;\r" +
    "\n" +
    "    z-index: 1;\r" +
    "\n" +
    "    background: #FFFFFF;\r" +
    "\n" +
    "    max-width: 360px;\r" +
    "\n" +
    "    margin: 0 auto 100px;\r" +
    "\n" +
    "    padding: 45px;\r" +
    "\n" +
    "    text-align: center;\r" +
    "\n" +
    "    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form button {\r" +
    "\n" +
    "    font-family: \"Roboto\", sans-serif;\r" +
    "\n" +
    "    text-transform: uppercase;\r" +
    "\n" +
    "    outline: 0;\r" +
    "\n" +
    "    background: #f0ad4e;\r" +
    "\n" +
    "    width: 100%;\r" +
    "\n" +
    "    border: 0;\r" +
    "\n" +
    "    padding: 15px;\r" +
    "\n" +
    "    color: #FFFFFF;\r" +
    "\n" +
    "    font-size: 14px;\r" +
    "\n" +
    "    -webkit-transition: all 0.3 ease;\r" +
    "\n" +
    "    transition: all 0.3 ease;\r" +
    "\n" +
    "    cursor: pointer;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form button:hover,\r" +
    "\n" +
    "  .form button:active,\r" +
    "\n" +
    "  .form button:focus {\r" +
    "\n" +
    "    background: #E99929;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form .message {\r" +
    "\n" +
    "    margin: 15px 0 0;\r" +
    "\n" +
    "    color: #b3b3b3;\r" +
    "\n" +
    "    font-size: 12px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form .message a {\r" +
    "\n" +
    "    color: #f0ad4e;\r" +
    "\n" +
    "    text-decoration: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .form .register-form {\r" +
    "\n" +
    "    display: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container {\r" +
    "\n" +
    "    position: relative;\r" +
    "\n" +
    "    z-index: 1;\r" +
    "\n" +
    "    max-width: 300px;\r" +
    "\n" +
    "    margin: 0 auto;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container:before,\r" +
    "\n" +
    "  .container:after {\r" +
    "\n" +
    "    content: \"\";\r" +
    "\n" +
    "    display: block;\r" +
    "\n" +
    "    clear: both;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info {\r" +
    "\n" +
    "    margin: 50px auto;\r" +
    "\n" +
    "    text-align: center;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info h1 {\r" +
    "\n" +
    "    margin: 0 0 15px;\r" +
    "\n" +
    "    padding: 0;\r" +
    "\n" +
    "    font-size: 36px;\r" +
    "\n" +
    "    font-weight: 300;\r" +
    "\n" +
    "    color: #1a1a1a;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info span {\r" +
    "\n" +
    "    color: #4d4d4d;\r" +
    "\n" +
    "    font-size: 12px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info span a {\r" +
    "\n" +
    "    color: #000000;\r" +
    "\n" +
    "    text-decoration: none;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .container .info span .fa {\r" +
    "\n" +
    "    color: #EF3B3A;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  body {\r" +
    "\n" +
    "    background: #FFF;\r" +
    "\n" +
    "    /* fallback for old browsers */\r" +
    "\n" +
    "    background: -webkit-linear-gradient(right, #FFF, #FFF);\r" +
    "\n" +
    "    background: -moz-linear-gradient(right, #FFF, #FFF);\r" +
    "\n" +
    "    background: -o-linear-gradient(right, #FFF, #FFF);\r" +
    "\n" +
    "    background: linear-gradient(to left, #FFF, #FFF);\r" +
    "\n" +
    "    font-family: \"Roboto\", sans-serif;\r" +
    "\n" +
    "    -webkit-font-smoothing: antialiased;\r" +
    "\n" +
    "    -moz-osx-font-smoothing: grayscale;\r" +
    "\n" +
    "  }</style> <div class=\"login-page\"> <div class=\"form\"> <img src=\"images/logo1.png\" style=\"width:200px; padding:30px\"> <form class=\"login-form\" angular-validator-submit=\"$ctrl.login()\" name=\"myForm\" novalidate angular-validator> <div class=\"form-group\"> <input type=\"text\" placeholder=\"username\" name=\"nombre\" ng-model=\"$ctrl.user\" validate-on=\"dirty\" ng-model=\"form.dirty\" class=\"form-control\" required-message=\"'El usuario es obligatorio.'\" required> </div> <div class=\"form-group\"> <input type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"$ctrl.password\" validate-on=\"dirty\" ng-model=\"form.dirty\" class=\"form-control\" required-message=\"'La contraseña es obligatoria.'\" required> </div> <button type=\"submit\">login</button> <p class=\"message\">No estas registrado? <a href=\"\">Contacta al Administrador</a></p> </form> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<header id=\"header\"> <div class=\"headerbar\"> <!-- Brand and toggle get grouped for better mobile display --> <div class=\"headerbar-left\"> <ul class=\"header-nav header-nav-options\"> <li class=\"header-nav-brand\"> <div class=\"brand-holder\"> <a ui-sref=\"home.cmts\"> <span class=\"text-lg text-bold text-primary\">Monitoreo Mikrotik</span> </a> </div> </li> <li> <a class=\"btn btn-icon-toggle menubar-toggle\" data-toggle=\"menubar\" href=\"javascript:void(0);\"> <i class=\"fa fa-bars\"></i> </a> </li> </ul> </div> <!-- Collect the nav links, forms, and other content for toggling --> <div class=\"headerbar-right\"> <ul class=\"header-nav header-nav-profile\"> <li class=\"dropdown\"> <a href=\"javascript:void(0);\" class=\"dropdown-toggle ink-reaction\" data-toggle=\"dropdown\"> <img src=\"images/ninja.png\" alt=\"\"> <span class=\"profile-info\">{{ $ctrl.usuario }} <small>{{ $ctrl.rol }}</small></span> </a> <ul class=\"dropdown-menu animation-dock\"> <li><a href=\"\" ng-click=\"$ctrl.logOut()\"><i class=\"fa fa-fw fa-power-off text-danger\"></i> Logout</a></li> </ul> <!--end .dropdown-menu --> </li> <!--end .dropdown --> </ul> <!--end .header-nav-profile --> </div> <!--end #header-navbar-collapse --> </div> </header> <!-- END HEADER--> <!-- BEGIN BASE--> <div id=\"base\"> <div id=\"content\"> <section> <div ui-view></div> </section> </div> <!--end #content--> <!-- END CONTENT --> <!-- BEGIN MENUBAR--> <div id=\"menubar\" class=\"menubar-inverse\"> <div class=\"menubar-fixed-panel\"> <div> <a class=\"btn btn-icon-toggle btn-default menubar-toggle\" data-toggle=\"menubar\" href=\"javascript:void(0);\"> <i class=\"fa fa-bars\"></i> </a> </div> </div> <div class=\"menubar-scroll-panel\"> <ul id=\"main-menu\" class=\"gui-controls\"> <!--Metemos el home fijo, ya que no se va a expandir de ninguno--> <li class=\"expanding\"> <a ui-sref=\"home.cmts\"> <div class=\"gui-icon\"><i class=\"md md-home\"></i></div> <span class=\"title\">Mikrotik</span> </a> </li> <li class=\"gui-folder\" ng-repeat=\"x in $ctrl.menus | orderBy:'SortOrder'\" ui-sref-active=\"active\"> <a ui-sref=\"{{ x.Class }}\" ng-if=\"x.MenuChild.length == 0\"> <div class=\"gui-icon\"><i class=\"{{ x.Icon }}\"></i></div> <span class=\"title\">{{ x.Title }}</span> </a> <a ng-if=\"x.MenuChild.length > 0\"> <div class=\"gui-icon\"><i class=\"{{ x.Icon }}\"></i></div> <span class=\"title\">{{ x.Title }}</span> </a> <!--start submenu --> <ul style=\"overflow: hidden; height: 308px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px\" ng-if=\"x.MenuChild.length > 0\"> <li ng-repeat=\"y in x.MenuChild | orderBy:'SortOrder'\" ng-class=\"{'gui-folder': y.MenuChild.length > 0}\"> <a ui-sref=\"{{ y.Class }}\" ng-class=\"{active:$state.includes(y.Class)}\" ng-if=\"y.MenuChild.length == 0\"><span class=\"title\">{{ y.Title }}</span></a> <a ng-class=\"{active:$state.includes(y.Class)}\" ng-if=\"y.MenuChild.length > 0\"><span class=\"title\">{{ y.Title }}</span></a> <ul style=\"overflow: hidden; height: 308px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px\" ng-if=\"y.MenuChild.length > 0\"> <li ng-repeat=\"z in y.MenuChild\"> <a ui-sref=\"{{ z.Class }}\" ng-class=\"{active:$state.includes(z.Class)}\"><span class=\"title\">{{ z.Title }}</span></a> </li> </ul> </li> </ul> <!--end /submenu --> </li> </ul> <div class=\"menubar-foot-panel\"> <small class=\"no-linebreak hidden-folded\"> <span class=\"opacity-75\">Copyright &copy; 2049</span> <strong>El Jano</strong> </small> </div> </div> <!--end .menubar-scroll-panel--> </div> <!--end #menubar--> <!-- END MENUBAR --> </div> <!--end #base--> <script src=\"libs/core/source/App.js\"></script> <script src=\"libs/core/source/AppNavigation.js\"></script> <script src=\"libs/core/source/AppOffcanvas.js\"></script> <script src=\"libs/core/source/AppCard.js\"></script> <script src=\"libs/core/source/AppForm.js\"></script> <script src=\"libs/core/source/AppNavSearch.js\"></script> <script src=\"libs/core/source/AppVendor.js\"></script> <script src=\"libs/core/demo/Demo.js\"></script>"
  );


  $templateCache.put('views/monitoreo/DetalleTerminal.html',
    "<style>.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {\r" +
    "\n" +
    "     padding: 0px 4px; \r" +
    "\n" +
    "    line-height: 1.846153846 ;\r" +
    "\n" +
    "    vertical-align: top;\r" +
    "\n" +
    "    border-top: 1px solid rgba(189, 193, 193, 0.2);\r" +
    "\n" +
    "}</style> <div class=\"card\" style=\"margin-top: 10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Status {{$ctrl.datosterminal.deviceID}} </strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Monitoreo>Beams</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"card-body\"> <table class=\"table\" style=\"font-size:10px\"> <tr> <td><b>IPv4 Address</b></td> <td>{{$ctrl.datosterminal.IPv4Address}}</td> <td><b>IPv6 Address</b></td> <td>{{$ctrl.datosterminal.IPv6Address}}</td> <td><b>Associated IPGW </b></td> <td>{{$ctrl.datosterminal.associatedIPGWName}}</td> <td><b>Association time </b></td> <td>{{$ctrl.datosterminal.associationTime}}</td> </tr> <tr> <td><b>Number of available tokens</b></td> <td>{{$ctrl.datosterminal.availTokens}}</td> <td><b>Associated beam Id</b></td> <td>{{$ctrl.datosterminal.beamID}}</td> <td><b>Geographical location</b></td> <td>{{$ctrl.datosterminal.beamLocation}}</td> <td><b>Status of BGP interfaces </b></td> <td>{{$ctrl.datosterminal.bgpStatus}}</td> </tr> <tr> <td><b>BGP V4 Status</b></td> <td>{{$ctrl.datosterminal.bgpV4Status}}</td> <td><b>BGP V6 Status</b></td> <td>{{$ctrl.datosterminal.bgpV6Status}}</td> <td><b>Bytes recived since Association </b></td> <td>{{$ctrl.datosterminal.bytesRxSinceAssoc}}</td> <td><b>Bytes transmitted since Association</b></td> <td>{{$ctrl.datosterminal.bytesTxSinceAssoc}}</td> </tr> <!--<tr>\r" +
    "\n" +
    "--> <!--<td><b>configuredIpv4Subnet</b></td>\r" +
    "\n" +
    "<td>{{$ctrl.datosterminal.configuredIpv4Subnet}}</td>\r" +
    "\n" +
    "<td><b>configuredIpv4SubnetType</b></td>\r" +
    "\n" +
    "<td>{{$ctrl.datosterminal.configuredIpv4SubnetType}}</td>\r" +
    "\n" +
    "<td><b>configuredIpv6Subnet</b></td>\r" +
    "\n" +
    "<td>{{$ctrl.datosterminal.configuredIpv6Subnet}}</td>--> <!--</tr>--> <tr> <td><b>FAP early warning</b></td> <td>{{$ctrl.datosterminal.cosFapEarlyWarning}}</td> <td><b>Current Gateway</b></td> <td>{{$ctrl.datosterminal.currentGateway}}</td> <td><b>DataCenter ID</b></td> <td>{{$ctrl.datosterminal.dataCenterID}}</td> <td><b>Device ID</b></td> <td>{{$ctrl.datosterminal.deviceID}}</td> </tr> <tr> <td><b>Diagnostic Code</b></td> <td>{{$ctrl.datosterminal.diagnosticCode}}</td> <td><b>ESN</b></td> <td>{{$ctrl.datosterminal.esn}}</td> <td><b>Cause of FAP early warning </b></td> <td>{{$ctrl.datosterminal.fapEarlyWarningTrigger}}</td> <td><b>Current FAP Status</b></td> <td>{{$ctrl.datosterminal.fapStatus}}</td> </tr> <tr> <td><b>Gateway ID</b></td> <td>{{$ctrl.datosterminal.gatewayID}}</td> <td><b>Hardware Type</b></td> <td>{{$ctrl.datosterminal.hardwareType}}</td> <td><b>Health Monitor Terminal</b></td> <td>{{$ctrl.datosterminal.healthMonitorTerminal}}</td> <td><b>Peak Period</b></td> <td>{{$ctrl.datosterminal.inPeakPeriod}}</td> </tr> <tr> <td><b>Last Known Outroute Name</b></td> <td>{{$ctrl.datosterminal.lastKnownOutrouteName}}</td> <td><b>Last Polled Time</b></td> <td>{{$ctrl.datosterminal.lastPolledTime}}</td> <td><b>Last Status ChangeTime</b></td> <td>{{$ctrl.datosterminal.lastStatusChangeTime}}</td> <td><b>Latitude</b></td> <td>{{$ctrl.datosterminal.latitude}}</td> </tr> <tr> <td><b>Longitude</b></td> <td>{{$ctrl.datosterminal.longitude}}</td> <td><b>Current throttling stage </b></td> <td>{{$ctrl.datosterminal.multiStageFAPThrottlingStage}}</td> <td><b>No Of Cycles Since Polled</b></td> <td>{{$ctrl.datosterminal.noOfCyclesSincePolled}}</td> <td><b>OffPeak Overall Capacity</b></td> <td>{{$ctrl.datosterminal.offPeakOverallCapacity}}</td> </tr> <tr> <td><b>Off Peak Overall Usage</b></td> <td>{{$ctrl.datosterminal.offPeakOverallUsage}}</td> <td><b>Outroute Name</b></td> <td>{{$ctrl.datosterminal.outrouteName}}</td> <td><b>OveragBytesAnytime</b></td> <td>{{$ctrl.datosterminal.overagBytesAnytime}}</td> <td><b>OverageBytesOffPeak</b></td> <td>{{$ctrl.datosterminal.overageBytesOffPeak}}</td> </tr> <tr> <td><b>Overall Capacity</b></td> <td>{{$ctrl.datosterminal.overallCapacity}}</td> <td><b>Overall Usage</b></td> <td>{{$ctrl.datosterminal.overallUsage}}</td> <td><b>PEP Backbone status</b></td> <td>{{$ctrl.datosterminal.pepBBStatus}}</td> <td><b>Service Activation Identifier</b></td> <td>{{$ctrl.datosterminal.sai}}</td> </tr> <tr> <td><b>Service Plan</b></td> <td>{{$ctrl.datosterminal.servicePlan}}</td> <td><b>Service Provider Id</b></td> <td>{{$ctrl.datosterminal.serviceProviderId}}</td> <td><b>Service Provider Name</b></td> <td>{{$ctrl.datosterminal.serviceProviderName}}</td> <td><b>State Code</b></td> <td>{{$ctrl.datosterminal.stateCode}}</td> </tr> <tr> <td><b>State Code Description</b></td> <td>{{$ctrl.datosterminal.stateCodeDescription}}</td> <td><b>Static Ipv4 Subnet</b></td> <td>{{$ctrl.datosterminal.staticIpv4Subnet}}</td> <td><b>Static Ipv4 SubnetType</b></td> <td>{{$ctrl.datosterminal.staticIpv4SubnetType}}</td> <td><b>Static Ipv6 Subnet</b></td> <td>{{$ctrl.datosterminal.staticIpv6Subnet}}</td> </tr> <tr> <td><b>Terminal Status</b></td> <td>{{$ctrl.datosterminal.terminalStatus}}</td> <td><b>Threshold percentage exceeded </b></td> <td>{{$ctrl.datosterminal.thresholdIndexExceeded}}</td> <td><b>Transport IPGW Name</b></td> <td>{{$ctrl.datosterminal.transportIPGWName}}</td> <td><b>Vlan Id</b></td> <td>{{$ctrl.datosterminal.vlanId}}</td> </tr> <tr> <td><b>vn Id</b></td> <td>{{$ctrl.datosterminal.vnId}}</td> <td><b>vn Name</b></td> <td>{{$ctrl.datosterminal.vnName}}</td> <td><b>Security digit </b></td> <td>{{$ctrl.datosterminal.checkDigit}}</td> <td><b></b></td> <td></td> </tr> </table> </div> </div>"
  );


  $templateCache.put('views/monitoreo/EstadoTerminales.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Estado de Terminales</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Monitoreo>Estado de Terminales</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"section-body\"> <div class=\"panel-body\"> <div class=\"panel form-element-padding\"> <div class=\"row form-group text-center\"> <h5><b>Gráfica de Consumo de Terminal por Fechas</b></h5> <div class=\"col-md-4\"> <b>Fecha Inicio</b> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaInicio\"> </div> <div class=\"col-md-4\"> <b>Fecha Fin</b> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaFin\"> </div> <div class=\"col-md-2\"> <b>Beam</b> <select class=\"form-control input-sm\" ng-model=\"$ctrl.beam\" ng-options=\"v.Name for v in $ctrl.Beams track by v.BeamId \"> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-2\"> <button class=\"btn pull-right btn-raised btn-success\" type=\"button\" ng-click=\"$ctrl.graficar()\">Graficar</button> </div> </div> <div class=\"row form-group\"> <div class=\"col-md-8\" style=\"margin-top:10px\"> <canvas id=\"chartjs-0\" class=\"chartjs\" width=\"770\" height=\"385\" style=\"display: block; width: 770px; height: 385px\"></canvas> </div> <div class=\"col-md-4\" style=\"margin-top:10px\"> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>Status Técnico</th> <th>Cantidad</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.resultados|itemsPerPage:15\"> <td>{{ x.TerminalStatus }}</td> <td>{{ x.Cantidad }}</td> </tr> </tbody> </table> <dir-pagination-controls max-size=\"15\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/monitoreo/MapaTerminales.html',
    "<style>.table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {\r" +
    "\n" +
    "    padding: 5px 8px !important;\r" +
    "\n" +
    "    line-height: 1.846153846;\r" +
    "\n" +
    "    vertical-align: top;\r" +
    "\n" +
    "    border-top: 1px solid rgba(189, 193, 193, 0.2);\r" +
    "\n" +
    "}</style> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Beams</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Monitoreo>Beams</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"card-body\"> <div class=\"col-md-2\" style=\"overflow-y:scroll; max-height: 500px\"> <ul class=\"list divider-full-bleed\"> <li class=\"tile\" ng-repeat=\"x in $ctrl.Beams\"> <a class=\"tile-content ink-reaction\" href=\"\" ng-click=\"$ctrl.DetalleBeam(x)\"> <p>{{x.Name}}</p> </a> <a class=\"btn btn-flat ink-reaction btn-xs\" ng-click=\"$ctrl.DetalleBeam(x)\"> <i class=\"md md-my-location\"></i> </a> </li> </ul> </div> <div class=\"col-md-5\"> <ng-map zoom=\"11\" center=\"41.875696,-87.624207\" style=\"height: 500px\"> <marker ng-repeat=\"pos in $ctrl.Terminales\" id=\"{{pos.san}}\" position=\"{{pos.Lat}}, {{pos.Lng}}\" on-click=\"$ctrl.DetalleTerminal($event)\"></marker> <kml-layer url=\"{{$ctrl.UrlBeam}}\"> </kml-layer> </ng-map> </div> <div class=\"col-md-5\"> <uib-tabset active=\"active\"> <uib-tab index=\"0\" heading=\"OUTROUTE\"> <table class=\"table\" style=\"font-size:10px\"> <tr> <td colspan=\"3\"><b>OUTROUTE VALUES BEAM ID {{$ctrl.datosoutroute.beamId}}</b></td> </tr> <tr> <td><b>Beam Name</b></td> <td>{{$ctrl.datosoutroute.beamName}}</td> <td><b>Total outroute satellite usage</b> </td> <td>{{$ctrl.datosoutroute.satelliteUsage}}</td> </tr> <tr> <td><b> Maximum outroute Configured(Mbps)</b> </td> <td>{{$ctrl.datosoutroute.cbrSubscription}}</td> <td><b>Total outroute CBR usage(Mbps)</b></td> <td>{{$ctrl.datosoutroute.cbrUsage}}</td> </tr> <tr> <td><b>Gateway Id</b></td> <td>{{$ctrl.datosoutroute.gatewayId}}</td> <td><b>Gateway Name</b></td> <td>{{$ctrl.datosoutroute.gatewayName}}</td> </tr> <tr> <td><b>Maximum outroute bandwidth Configured (Mbps)</b></td> <td>{{$ctrl.datosoutroute.maxSubscription}}</td> <td><b> Minimumoutroute bandwidth Configured (Mbps)</b></td> <td>{{$ctrl.datosoutroute.minSubscription}}</td> </tr> <tr> <td><b>Total offered Multicast load (Mbps)</b></td> <td>{{$ctrl.datosoutroute.multicastOfferedLoad}}</td> <td><b>Total Multicast outroutesatellite usage (Mbps) </b></td> <td>{{$ctrl.datosoutroute.multicastSatelliteBits}}</td> </tr> <tr> <td><b> Maximum Multicast bandwidth Configured</b> </td> <td>{{$ctrl.datosoutroute.multicastSubscription}}</td> <td><b>Total offered load bandwidth (Mbps)</b></td> <td>{{$ctrl.datosoutroute.offeredLoad}}</td> </tr> <tr> <td><b>Total demanded outroute bandwidth(Mbps) </b></td> <td>{{$ctrl.datosoutroute.overallDemand}}</td> <td><b>Time Stamp</b></td> <td>{{$ctrl.datosoutroute.timeStamp}}</td> </tr> <tr> <td><b>vnId</b></td> <td>{{$ctrl.datosoutroute.vnId}}</td> <td><b>vnName</b></td> <td>{{$ctrl.datosoutroute.vnName}}</td> </tr> <tr> <td><b>Maximum outroute Download Configured</b></td> <td>{{$ctrl.datosoutroute.dlThruSubscription}}</td> <td><b>Minimumoutroute Download Configured</b></td> <td>{{$ctrl.datosoutroute.dlThruMinSubscription}}</td> </tr> </table> </uib-tab> <uib-tab index=\"1\" heading=\"INROUTE\"> <table class=\"table\" style=\"font-size:10px\"> <tr> <td colspan=\"3\"><b>INROUTE VALUES BEAM ID {{$ctrl.datosinroute.beamId}}</b></td> </tr> <tr> <td><b>Beam Name</b></td> <td>{{$ctrl.datosinroute.beamName}}</td> <td><b>Total inroute satellite usage</b></td> <td>{{$ctrl.datosinroute.satelliteUsage}}</td> </tr> <tr> <td><b>Total inroute CBR usage(Mbps)</b></td> <td>{{$ctrl.datosinroute.cbrSatUsage}}</td> <td><b>Total inroute CBR offered load (Mbps)</b></td> <td>{{$ctrl.datosinroute.cbrOfferUsage}}</td> </tr> <tr> <td><b> Maximum inroute CBR bandwidth Configured(Mbps) </b></td> <td>{{$ctrl.datosinroute.cbrSubscription}}</td> <td><b>Total demanded inroute bandwidth(Mbps)</b></td> <td>{{$ctrl.datosinroute.demand}}</td> </tr> <tr> <td><b>Gateway Id</b></td> <td>{{$ctrl.datosinroute.gatewayId}}</td> <td><b>Gateway Name</b></td> <td>{{$ctrl.datosinroute.gatewayName}}</td> </tr> <tr> <td><b> Maximum inroute bandwidth Configured(Mbps)</b></td> <td>{{$ctrl.datosinroute.maxSubscription}}</td> <td><b> Maximum inroute bandwidth Configured(Mbps)</b></td> <td>{{$ctrl.datosinroute.minSubscription}}</td> </tr> <tr> <td><b>Active Terminals</b></td> <td>{{$ctrl.datosinroute.numActiveTerminals}}</td> <td>Total inroute offered load bandwidth (Mbps) </td> <td>{{$ctrl.datosinroute.offeredLoad}}</td> </tr> <tr> <td><b>TimeStamp</b></td> <td>{{$ctrl.datosinroute.timeStamp}}</td> <td><b> Maximum throughput inroute bandwidth Configured(Mbps) </b></td> <td>{{$ctrl.datosinroute.throughputLimit}}</td> </tr> <tr> <td><b> Maximum CBR throughput inroute bandwidth Configured</b></td> <td>{{$ctrl.datosinroute.throughputLimitCBR}}</td> <td><b> maximum throughput inroute bandwidth Configured </b></td> <td>{{$ctrl.datosinroute.throughputLimitMin}}</td> </tr> <tr> <td><b>vnId</b></td> <td>{{$ctrl.datosinroute.vnId}}</td> <td><b>vnName</b></td> <td>{{$ctrl.datosinroute.vnName}}</td> </tr> </table> </uib-tab> </uib-tabset> </div> </div></div>"
  );


  $templateCache.put('views/monitoreo/SignOff.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">sign off</h4> </div> <div class=\"modal-body\" style=\"padding:40px\"> <div class=\"row\"> <div class=\"col-md-3\"><b>FSO:</b>{{ctrl.headers.siteOrder.fso}}</div> <div class=\"col-md-3\"><b>SAN:</b>{{ctrl.headers.san}}</div> <div class=\"col-md-3\"><b>Visit Type:</b>{{ctrl.headers.siteOrder.visitType}}</div> <div class=\"col-md-3\"><b>SignOff Id:</b>{{ctrl.headers.signOff.signoffId}}</div> </div> <div class=\"row\"> <br> <p>Please indicate the site installation problems and actions performed....</p> <br> <div class=\"col-md-4\"> <center><b>Installation</b></center><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.sight\"><span>Line of sight</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.dish\"><span>Replace Dish</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.repaired\"><span>Repaired/replaced cable/connector/ground block/weather</span> </label><br><br> <center><b>No installation Problems</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.noinstallation\"><span>No installation problems</span> </label> </div> <div class=\"col-md-4\"> <center><b>Hardware</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" value=\"option3\" ng-model=\"ctrl.feedhorn\"><span>Replace/Repair feedhorn polarizer</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.radio\"><span>Defective radio being returned from repair</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.modem\"><span>Defective modem being returned from repair</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.power\"><span>Replace power supply</span> </label><br> </div> <div class=\"col-md-4\"> <center><b>Software</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.modemsoftware\"> <span>Modem software Installation/proccesing problem</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.NOCC\" ng-checked=\"false\"><span>NOCC/Tier 3 Corrected Network Problem</span> </label><br> <center><b>Customer related</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.customerRefused\" ng-checked=\"false\"><span>Customer refused install</span> </label><br> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.customersoft\" ng-checked=\"false\"><span>Customer equipment/software/router problems</span> </label><br> <center><b>Other</b></center> <label class=\"checkbox-inline checkbox-styled checkbox-success\"> <input type=\"checkbox\" ng-model=\"ctrl.other\" ng-checked=\"false\"><span>Other</span> </label><br> </div> </div> <div class=\"row\"> <p>Provide installation details bellow...</p> <textarea class=\"form-control\" ng-model=\"ctrl.DetailProblem\"></textarea> <br> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-danger btn-sm\" ng-click=\"ctrl.SingOff();\">Sign Off</button> <button class=\"btn btn-default-bright btn-sm\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/monitoreo/diagnostic.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">TDS/Jupiter-Site Diagnostic Tool</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Monitoreo</a></small> </header> <div class=\"tools\"> </div> </div> <div class=\"row\"> <form ng-submit=\"$ctrl.searchSan()\"> <div class=\"col-md-5\" style=\"min-height: 100px; padding-top:20px\"> <div class=\"col-md-1\"> <label>San:</label> </div> <div class=\"col-md-5\"> <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.san\"> </div> <div class=\"col-md-6\" style=\"padding-top:5px; padding-left:-5px\"> <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-search\"></i> Search</button> </div> </div> </form> </div> <div class=\"panel-group col-md-12\" style=\"margin-top: -10px\" ng-show=\"$ctrl.showSan\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#diagnostic\" data-target=\"#diagnostic-1\" aria-expanded=\"false\"> <header>Diagnostic Tools</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"diagnostic-1\" class=\"collapse diagnostic\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"row\"> <div class=\"col-md-4\"> <div class=\"row\"> <div class=\"col-md-6 text-right\"> <p><strong>SAN:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px\"> <p>{{ $ctrl.diagnosticData.SAN }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Adapter Type:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Adapter_Type }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Gateway Id:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.GW_ID }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Beam Id:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Beam_ID }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Latitude:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Lat }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Longitude:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Lng }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Antenna Size:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Antenna_Size }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>ODU Power</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.ODU_Pwr }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Terminal State Code:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Terminal_State_Code }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>IMG Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.IGM_Status }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Overall GM Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Overall_GW_Status }}</p> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"row\"> <div class=\"col-md-6 text-right\"> <p><strong>UL/DL Group:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px\"> <p>{{ $ctrl.diagnosticData.ULDL_Group }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Polarization:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Polarization }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>IDU ESN:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.ESN }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>ODU SN:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.ODU_SN }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Modem Temp:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Modem_Temp }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Last Reboot Reason:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Last_Reboot_Reason }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Last Reboot Date:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Last_Reboot_Date }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Activation Date:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Activation_Date }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>SW Version:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.SW_Version }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Service Profile:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Service_Profile }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>IPGW Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.IPGW_Status }}</p> </div> </div> </div> <div class=\"col-md-4\"> <div class=\"row\"> <div class=\"col-md-6 text-right\"> <p><strong>UL Atten:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px\"> <p>{{ $ctrl.diagnosticData.Adapter_Type }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>DL Atten:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.UL_Atten }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>UL Atten Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.UL_Atten_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>DL Atten Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.DL_Atten_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Normalized UL Es/No:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Norm_UL_EsNo }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Normalized DL Es/No:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Norm_DL_EsNo }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Realtime UL Es/No Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.RT_UL_EsNo_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Realtime DL Es/No Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.RT_DL_EsNo_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Realtime Outroute Offset:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.RT_Outroute_Offset }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>Last Processed Date:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.Last_Processed_Date }}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-right\" style=\"margin-top: -10px\"> <p><strong>CRO Status:</strong></p> </div> <div class=\"col-md-6 text-left\" style=\"margin-left:-20px; margin-top: -10px\"> <p>{{ $ctrl.diagnosticData.CRO_Status }}</p> </div> </div> </div> </div> </div> </div> <!--end .panel --> </div> <div class=\"panel-group col-md-12\" style=\"margin-top:-20px\" ng-show=\"$ctrl.showSan\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#diagnosis\" data-target=\"#diagnosis-1\" aria-expanded=\"false\"> <header>Diagnosis</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"diagnosis-1\" class=\"collapse diagnosis\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"row\"> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-top:-20px\"> <p><strong>Diagnosis: </strong>{{ $ctrl.diagnosticData.Diagnosis }}</p> <p><strong>Recommended Action: </strong>{{ $ctrl.diagnosticData.Recommended_Action }}</p> <p><button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.recommendedAction()\">Completed Action</button></p> <p style=\"padding-left:20px\"><small>(Perform recommended action above, then click \"Completed Action\")</small></p> </div> </div> </div> </div> <!--end .panel --> </div> <div class=\"panel-group col-md-12\" style=\"margin-top:-20px\" ng-show=\"$ctrl.showSan\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#table-info\" data-target=\"#table-info-1\" aria-expanded=\"false\"> <header>Information Table</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"table-info-1\" class=\"collapse table-info\" aria-expanded=\"false\"> <div class=\"col-md-12\" style=\"margin-left:10px\"> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Current_Stats')\">Get Curren Stats</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Force_range')\">Force Range</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Clear_Term_Stats')\">Clear Terminal Stats</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reregister')\">Register</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reload_tables')\">Reload Tables</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Force_fallback')\">Force Fallback</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reboot')\">Reboot</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Reassociate')\">Re-Associate</button> <button class=\"btn btn-sm btn-default\" ng-click=\"$ctrl.acctionButtons('Clear_PEP_Stats')\">Clear PEP Stats</button> </div> <div class=\"col-md-12\" style=\"padding-top:10px; padding-left:20px; padding-right:10px\"> <table class=\"table table-bordered\"> <thead> <th colspan=\"2\"></th> <th class=\"text-center\" colspan=\"3\">Packet Loss Stats</th> <th class=\"text-center\" colspan=\"2\">Uplink Stats</th> <th class=\"text-center\" colspan=\"3\">Downlink Stats</th> </thead> <tbody> <tr> <td class=\"text-center\"></td> <td class=\"text-center\">Timestamp</td> <td class=\"text-center\">UL Pkt Losss %</td> <td class=\"text-center\">Aloha Pkt Loss %</td> <td class=\"text-center\"> DL Pkt Loss %</td> <td class=\"text-center\">UL Es/No Avail</td> <td class=\"text-center\">UL Deviation</td> <td class=\"text-center\">DL Es/No</td> <td class=\"text-center\">MODCOD</td> <td class=\"text-center\">DL Deviation</td> </tr> <tr> <td class=\"text-right\">History Values</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.H_DL_Dev }}</td> </tr> <tr> <td class=\"text-right\">Target Values</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.T_DL_Dev }}</td> </tr> <tr> <td class=\"text-right\">Curren Values</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.C_DL_Dev }}</td> </tr> <tr> <td class=\"text-right\">Difference</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_Timestamp }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_UL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_Aloha_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_DL_Pkt_Loss_pct }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_ULEsNo_Avail }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_UL_Dev }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_DL_EsNo }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_MODCOD }}</td> <td class=\"text-center\">{{ $ctrl.diagnosticData.D_DL_Dev }}</td> </tr> </tbody> </table> </div> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-success no-margin\" style=\"height: 150px\"> <strong class=\"text-md\">Current Weather Conditions At Gateway</strong><br> <span class=\"opacity-50\">{{ $ctrl.diagnosticData.gw_weather }}, {{ $ctrl.diagnosticData.gw_Temp_F }}</span><br> <span class=\"opacity-50\">Rainfall - Last Hour: {{ $ctrl.diagnosticData.gw_rainfall_lasthr }}</span><br> <span class=\"opacity-50\">Visibility: {{ $ctrl.diagnosticData.gw_visibility }}</span><br> </div> </div> </div> </div> <div class=\"col-md-6\"> <div class=\"card\"> <div class=\"card-body no-padding\"> <div class=\"alert alert-callout alert-success no-margin\" style=\"height: 150px\"> <strong class=\"text-md\">Current Weather Conditions At {{ $ctrl.diagnosticData.Site_State }}, {{ $ctrl.diagnosticData.Site_City }} </strong><br> <span class=\"opacity-50\">{{ $ctrl.diagnosticData.Site_weather }}, {{ $ctrl.diagnosticData.gw_Temp_F }}</span><br> <span class=\"opacity-50\">Rainfall - Last Hour: {{ $ctrl.diagnosticData.Site_rainfall_lasthr }}</span><br> <span class=\"opacity-50\">Visibility: {{ $ctrl.diagnosticData.Site_visibility }}</span><br> </div> </div> </div> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/monitoreo/displayForSan.html',
    "<style type=\"text/css\">.scrollDiv {\r" +
    "\n" +
    "\t\theight: 300px;\r" +
    "\n" +
    "\t\toverflow: auto;\r" +
    "\n" +
    "\t\toverflow-x: hidden;\r" +
    "\n" +
    "\t}\r" +
    "\n" +
    "\t\r" +
    "\n" +
    "\t.scrollDiv2 {\r" +
    "\n" +
    "\t\theight: 200px;\r" +
    "\n" +
    "\t\toverflow: auto;\r" +
    "\n" +
    "\t\toverflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head card-head-xs style-info\"> <header>TDS/Jupiter Diagnostic Display</header> </div> <br> <div class=\"row\"> <div class=\"col-md-4\"></div> <div class=\"col-md-4\" style=\"padding: 20px\"> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.SAN\" placeholder=\"Please enter a valid SAN to Proceed\"> <br> <button class=\"btn btn-block btn-primary\" ng-click=\"$ctrl.validate()\">Validate</button> </div> <div class=\"col-md-3\"></div> </div> <div class=\"row\"> <div class=\"col-md-3 col-md-offset-8\"> <button class=\"btn btn-block btn-default\" ng-click=\"$ctrl.displayTest()\">Display Speed Test Result</button> </div> </div> <br> <div class=\"row\"> <div class=\"col-md-6 col-md-offset-1 card scrollDiv\" style=\"background:#E2EBEA\"> <h5 class=\"text-primary text-center\" style=\"margin-top: 50px\">Terminal Stats:</h5> <ul style=\"font-size: 11px\"> <li>Serial Number ............{{$ctrl.jul1['Serial Number']}}</li> <li>System State Code ........{{$ctrl.jul1['System State Code']}} ({{$ctrl.jul1['System State Code Description']}})</li> <li>Downlink SQF .............{{$ctrl.jul1['Downlink SQF']}}</li> <li>LAN Status ...............{{$ctrl.jul1['LAN Status']}}</li> <li>FAP Status ...............{{$ctrl.jul1['FAP State Code']}}</li> <li>Web MBX Status ...........{{$ctrl.jul1['MBX Status']}}</li> <li>Web Acceleration Status ..{{$ctrl.jul1['TCP Acceleration State Code']}}</li> <li>Hour Diagnostic Code .....{{$ctrl.jul1['Hour Diagnostic Code']}}</li> <li>Minute Diagnostic Code ...{{$ctrl.jul1['Minute Diagnostic Code']}}</li> <li>Walled Garden? ...........{{$ctrl.jul1['']}}</li> <li>Uptime ...................{{$ctrl.jul2['Terminal UpTime']}}</li> </ul> </div> <div class=\"col-md-4 card scrollDiv\" style=\"padding-right: 30px; background:#E2EBEA\"> <h5 class=\"text-primary text-center\" style=\"margin-top: 10px\">LAN Diagnostics Current State:</h5> <table class=\"table\"> <thead> <tr> <th style=\"background:#81BEF7\">Current State</th> <th style=\"background:#81BEF7\">Status</th> </tr> </thead> <tbody> <tr style=\"font-size: 11px\"> <td class=\"active\">Router Detected?<br><span style=\"color:red\">(If NO, verify with the customer)</span></td> <td class=\"active\"><span style=\"color:red\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"info\">LAN cable from modem to router is connected<br>property<br><span style=\"color:red\">(If NO, check connections)</span></td> <td class=\"info\"><span style=\"color:green\">Yes</span></td> </tr> </tbody> </table> <h5 class=\"text-primary text-center\" style=\"margin-top: 10px\">LAN Diagnostics:</h5> <table class=\"table\"> <thead> <tr> <th style=\"background:#81BEF7\">Historical LAN Diagnostics</th> <th style=\"background:#81BEF7\">Status</th> </tr> </thead> <tbody> <tr style=\"font-size: 11px\"> <td class=\"active\">Router Performance</td> <td class=\"active\"><span style=\"color:green\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"info\">Wireless device/s performance</td> <td class=\"info\"><span style=\"color:green\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\">Wireles network coverage</td> <td class=\"active\"><span style=\"color:green\">No</span></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"info\">Indeterminate issue</td> <td class=\"info\"><span style=\"color:green\">No</span></td> </tr> <tr class=\"text-center\" style=\"font-size: 11px\"> <td class=\"active\">See KB 8052 for more information</td> <td class=\"active\"><span style=\"color:red\"></span></td> </tr> </tbody> </table> </div> </div> <div class=\"row\"> <div class=\"col-md-6 col-md-offset-1 card scrollDiv2\" style=\"background:#E2EBEA\"> <h5 class=\"text-primary text-left\" style=\"margin-top: 20px\">Device Mac Addresses:</h5> <ul style=\"font-size: 11px\"> <li>ARP MAC Entry-1............{{$ctrl.jul1['ARP MAC Entry-1']}}</li> <li>ARP MAC Entry-2............{{$ctrl.jul1['ARP MAC Entry-2']}}</li> <li>ARP MAC Entry-3............{{$ctrl.jul1['ARP MAC Entry-3']}}</li> <li>ARP MAC Entry-4............{{$ctrl.jul1['ARP MAC Entry-4']}}</li> <li>ARP MAC Entry-5............{{$ctrl.jul1['ARP MAC Entry-5']}}</li> </ul> </div> <div class=\"col-md-4 card scrollDiv2\" style=\"padding-right: 30px; background:#E2EBEA\"> <h5 class=\"text-primary text-center\" style=\"margin-top: 10px\">Ip Connectivity Status:</h5> <label>IP Connectivity Status</label> <ul style=\"font-size: 11px\"> <li>Packets Transmitted.............{{$ctrl.ip['Packets Transmitted']}}</li> <li>Packets Received................{{$ctrl.ip['Packets Received']}}</li> <li>Packets Loss....................{{$ctrl.ip['Packet Loss']}}</li> <li>Minimum Delay Time..............{{$ctrl.ip['Minimum Delay Time']}}</li> <li>Maximum Delay Time..............{{$ctrl.ip['Maximum Delay Time']}}</li> <li>Avarage Delay Time..............{{$ctrl.ip['Average Delay Time']}}</li> <li>Maximum Jitter..................{{$ctrl.ip['Maximum Jitter']}}</li> </ul> </div> </div> <div class=\"row\"> <div class=\"col-md-10 col-md-offset-1\"> <table class=\"table\"> <thead> <tr> <th colspan=\"2\">Alarm History:</th> <th colspan=\"7\"></th> <th colspan=\"1\">Reboot History</th> <th colspan=\"1\"></th> </tr> </thead> <tbody> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">Alarm Timestamp (UTC)</td> <td class=\"active\" colspan=\"1\">Event ID</td> <td class=\"active\" colspan=\"2\">Severity</td> <td class=\"active\" colspan=\"3\">Reason</td> <td class=\"active\" colspan=\"1\">Probable Cause</td> <td class=\"active\" colspan=\"1\">Timestamp</td> <td class=\"active\" colspan=\"1\">Reboot Reason</td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry1[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry1[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry1[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry1[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry2[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry2[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry2[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry2[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry3[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry3[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry3[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry3[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry4[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry4[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry4[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry4[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> <tr style=\"font-size: 11px\"> <td class=\"active\" colspan=\"2\">{{$ctrl.entry5[0]}}</td> <td class=\"active\" colspan=\"1\">{{$ctrl.entry5[1]}}</td> <td class=\"active\" colspan=\"2\">{{$ctrl.entry5[2]}}</td> <td class=\"active\" colspan=\"3\">{{$ctrl.entry5[3]}}</td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> <td class=\"active\" colspan=\"1\"></td> </tr> </tbody> </table> </div> </div> </div>"
  );


  $templateCache.put('views/monitoreo/modalSpeedTest.html',
    "<div class=\"modal-header\"> <small class=\"text-muted\" style=\"font-size:12px; margin-left:10px\">Speed Test Results</small> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div> <ul> <li>Execution time: {{$ctrl.test['Execution time']}}</li> <li>Upload speed (kb/sec): {{$ctrl.test['Upload speed (kb/sec)']}}</li> <li>Download spees (kb/sec): {{$ctrl.test['Download speed (kb/sec)']}}</li> <li>Round trip ping time (msec): {{$ctrl.test['Round trip ping time (msec)']}}</li> <li>Packet loss rate (%): {{$ctrl.test['Packet loss rate (%)']}}</li> </ul> </div> </div> <div class=\"modal-footer\"> </div>"
  );


  $templateCache.put('views/monitoreo/validation.html',
    "<style>.font-reduced {\r" +
    "\n" +
    "    font-size: 13px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  .table>tfoot>tr>td {\r" +
    "\n" +
    "    padding: 5px !important;\r" +
    "\n" +
    "  }</style> <div class=\"card\" style=\"margin-top:20px\" ng-show=\"$ctrl.OVT1\"> <div class=\"card-head card-head-xs style-info\"> <header>HughesNet <small class=\"text-muted\">TDS/Jupiter-Onsite Validation Tool (1 of 3)</small> </header> </div> <div class=\"card text-center\"> <div class=\"row\"> <div class=\"col-md-4\"></div> <div class=\"col-md-4\" style=\"padding: 20px\"> <b>Please enter a valid SAN to Proceed </b><br><br> <input type=\"text\" class=\"form-control\" placeholder=\" \" ng-model=\"$ctrl.SAN\"> <br> <button class=\"btn btn-block btn-primary\" ng-click=\"$ctrl.validate()\">Validate</button> </div> <div class=\"col-md-3\"></div> </div> </div> <div class=\"card\"> <div class=\"card-body\"> <div class=\"row text-center\"> <h5 style=\"color: #0aa89e\">Step 1: Verify FSO and Site Information> </h5> </div> <div class=\"row text-center\"> <button type=\"button\" class=\"btn btn-sm btn-default\" name=\"button\" ng-click=\"$ctrl.getRefresh()\"><i class=\"fa fa-refesh\"></i> Refresh Site Info</button> <button type=\"button\" class=\"btn btn-sm btn-default-dark\" name=\"button\" ng-click=\"$ctrl.getPing()\"><i class=\"fa fa-terminal\"></i> Ping Terminal</button> </div> <div class=\"table-responsive\"> <table class=\"table no-margin\"> <tbody> <tr> <td><b style=\"font-size: smaller\">FSO:</b></td> <td> <p>{{$ctrl.Details.siteOrder.fso}}</p> </td> <td><b style=\"font-size: smaller\">SAN:</b></td> <td><p>{{$ctrl.Details.san}}</p></td> <td><b style=\"font-size: smaller\">Latitude:</b></td> <td> <p>{{$ctrl.Details.terminal.location.latitudeDMS}}</p> </td> <td><b style=\"font-size: smaller\">Repl IDU ESN:</b></td> <td> <p>{{$ctrl.Details.siteOrder.replIDUESN}}</p> </td> </tr> <tr> <td><b style=\"font-size: smaller\">Visit Type:</b></td> <td> <p>{{$ctrl.Details.siteOrder.visitType}} </p></td> <td> <b style=\"font-size: smaller\">Serial#:</b></td> <td> <p>{{$ctrl.Details.terminal.esn}}</p> </td> <td><b style=\"font-size: smaller\">Longitude:</b></td> <td> <p>{{$ctrl.Details.terminal.location.longitudeDMS}}</p> </td> <td> <p><b style=\"font-size: smaller\">Repl ODU ESN:</b></p> </td> <td> <p>{{$ctrl.Details.siteOrder.replODUESN}}</p> </td> </tr> <tr> <td> <p><b style=\"font-size: smaller\">Installer Id:</b></p> </td> <td> <p>{{$ctrl.Details.installer.id}}</p> </td> <td> <p><b style=\"font-size: smaller\">Adapter Type:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.adapterType}}</p> </td> <td> <p><b style=\"font-size: smaller\">UL/DL Group:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.location.longitudeDMS}}</p> </td> <td> <p><b style=\"font-size: smaller\">Antenna Part#:</b></p> </td> <td> <p>{{$ctrl.Details.outdoorUnit.antenna.partNumber}}</p> </td> </tr> <tr> <td> <p><b style=\"font-size: smaller\">Installer Name:</b></p> </td> <td> <p>{{$ctrl.Details.installer.name}}</p> </td> <td> <p><b style=\"font-size: smaller\">Gateway Id:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.gatewayId}}</p> </td> <td> <p><b style=\"font-size: smaller\">Beam Id:</b></p> </td> <td> <p>{{$ctrl.Details.terminal.beamId}}</p> </td> <td> <p><b style=\"font-size: smaller\">Company Type:</b></p> </td> <td> <p>{{$ctrl.Details.company}}</p> </td> </tr> <tbody> </tbody></tbody></table> </div> </div> </div> <div class=\"row text-center\"> <div class=\"col-md-6 form-group\"> <div class=\"col-md-12\"> <h5 style=\"color: #0aa89e\">Step 2: Choose The Antenna Size That You Will Install</h5> </div> <div class=\"col-md-12\"> <div class=\"col-md-12\" ng-repeat=\"x in $ctrl.antennas\"> <label class=\"checkbox-inline checkbox-styled\"> <input type=\"radio\" ng-value=\"x.size\" ng-model=\"$ctrl.antenna\"><span>{{ x.description }}</span> </label> </div> <!-- <div class=\"col-md-12 text-right\" ng-repeat=\"x in $ctrl.antennas\">\r" +
    "\n" +
    "          <input type=\"radio\" name=\"ant\" ng-value=\"x.size\" ng-model=\"$ctrl.antenna\">{{x.description}}\r" +
    "\n" +
    "        </div> --> </div> </div> <div class=\"col-md-6 form-group\"> <div class=\"col-md-12\"> <h5 style=\"color: #0aa89e\">Step 3: Choose The Mount Type That You Will Install</h5> </div> <div class=\"col-md-6 col-md-offset-3 text-left\" ng-repeat=\"x in $ctrl.mounts\"> <label class=\"checkbox-inline checkbox-styled\"> <input type=\"radio\" ng-value=\"x.code + $index\" ng-model=\"$ctrl.mount\"><span>{{ x.description }}</span> </label> </div> </div> </div> <hr> <div class=\"row text-center\"> <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.Procced();\" name=\"button\">Proceed</button> </div> <br> </div>  <div class=\"card\" style=\"margin-top:10px\" ng-show=\"$ctrl.OVT2\"> <div class=\"card-head card-head-xs style-info\"> <header>TDS/Jupiter On-Site Validation Tool (2 of 3)</header> </div> <div class=\"card-body\"> <div class=\"row\"> <div class=\"col-md-12 card\"> <div class=\"card-body\"> <table class=\"table\"> <tbody> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">SAN</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.san}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Visit Type</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.siteOrder.visitType}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">UL Atten</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.ulAttenuation}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Adapter type</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.adapterType}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">FSO</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.siteOrder.fso}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">DL Atten</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.dlAttenuation}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Gateway ID</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.gatewayId}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Installer Name</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.installer.name}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">UL Atten Offset</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.ulAttenuationOffset}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Beam ID</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.beamId}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Installer Id</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.installer.id}}</small></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">DL Aften Offset</small></td> <td style=\"padding:0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.beamValues.dlAttenuationOffset}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Latitude/QLast</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.location.qlat}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Modem Temp</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.modemTemp }}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Normalized UL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Longitude/QLng</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.location.qlng}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Reboot count</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.rebootCount }}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Normalized DL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">UL/DL Group</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxxx</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Last Reboot Time</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.rebootTime}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time UL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Antenna size</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.outdoorUnit.antenna.size}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Last Reboot Reason</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.rebootReason.description}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time DL Es/No</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">ODU Power</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.outdoorUnit.radio.power}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">SW Version</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.softwareVersion}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time Stats Updated Date</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxx</small></td> </tr> <tr> <td style=\"padding: 2px !important\"><b><small class=\"font-reduced\">Polarization</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.polarization}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">IDU SN</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxxx</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Real-Time Outrote Offset</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.realtimeOffsets.outrouteOffset}}</small></td> </tr> <tr> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Activation Date</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">xxxxxxxx</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">ODU SN</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.terminal.odusn}}</small></td> <td style=\"padding: 0px !important\"><b><small class=\"font-reduced\">Last Processed Date</small></b></td> <td style=\"padding: 0px !important\"><small class=\"font-reduced\">{{$ctrl.DetailsOVT2.processedDate}}</small></td> </tr> </tbody> </table> </div> <div class=\"row\"> <button class=\"btn btn-info btn-default-bright btn-sm\" ng-click=\"$ctrl.GetCurrentStats();\">GET CURRENT STATS</button> <button class=\"btn btn-info btn-default-bright btn-sm\" ng-click=\"$ctrl.ForceRange()\">FORCE RANGE</button> <button class=\"btn btn-primary btn-default-bright btn-sm\" ng-click=\"$ctrl.ClearTerminal();\">CLEAR TERMINAL STATS</button> <button class=\"btn btn-primary btn-default-bright btn-sm\" ng-click=\"$ctrl.ReloadTables();\">RELOAD TABLES</button> <button class=\"btn btn-primary btn-default-bright btn-sm\" ng-click=\"$ctrl.ForceFallBack();\">FORCE FALLBACK</button> <button class=\"btn btn-warningbtn-default-bright btn-sm\" ng-click=\"$ctrl.Reboot();\">REBOOT</button> <button class=\"btn btn-danger btn-default-bright btn-sm\" ng-click=\"$ctrl.abrirSignOff();\">SIGN OFF</button> <table class=\"table\"> <thead> <th></th> <th>Timestamp</th> <th>Operating UL Es/No</th> <th>UL Margin</th> <th>Symbol Rate-FEC</th> <th>UL Es/No Avail</th> <th>DL Es/No</th> <th>MODCOD</th> <th>pkt loss %</th> <th>UL Devation</th> <th>DL Devation</th> </thead> <tbody> <tr> <td>Target Values</td> <td>0</td> <!-- {{$ctrl.DetailsOVT2.terminal.odusn}} --> <td>0</td> <td>0</td> <td>0</td> <td>{{$ctrl.DetailsOVT2.targetValues.ulEsNoAvail}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.dlEsNo}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.modcod}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.pktLossPct}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.ulDev}}</td> <td>{{$ctrl.DetailsOVT2.targetValues.dlDev}}</td> </tr> <tr> <td>current Values</td> <td>{{$ctrl.DetailsOVT2.currentValues.timestamp}}</td> <td>0</td> <td>0</td> <td>0</td> <td>{{$ctrl.DetailsOVT2.currentValues.ulEsNoAvail}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.dlEsNo}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.modcod}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.pktLossPct}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.ulDev}}</td> <td>{{$ctrl.DetailsOVT2.currentValues.dlDev}}</td> </tr> <tr> <td>Diference</td> <td>0</td> <td>0</td> <td>0</td> <td>0</td> <td>{{$ctrl.DetailsOVT2.differenceValues.ulEsNoAvail}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.dlEsNo}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.modcod}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.pktLossPct}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.ulDev}}</td> <td>{{$ctrl.DetailsOVT2.differenceValues.dlDev}}</td> </tr> </tbody> </table> </div> <div class=\"row\"> Diagnosis: {{$ctrl.DetailsOVT2.diagnosis.recommendedDiagnosis.name}} <br> Recommended action: <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.RecomendedDiag\"> <button class=\"btn btn-success btn-xs\" ng-click=\"$ctrl.CompleteAction();\">Completed action</button> </div> </div> <div class=\"col-md-12 card\" ui-if=\"$ctrl.showmapa\"> <ng-map zoom=\"9\" style=\"height:100%; width:100%\"> <marker icon=\"{{$ctrl.customIcon}}\" position=\"{{$ctrl.points.latitude}}, {{$ctrl.points.longitude}}\"></marker> </ng-map> </div> </div> </div> </div>"
  );


  $templateCache.put('views/provision/ModalBusquedaSuscriptor.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Suscriptores</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#suscriptor\" data-target=\"#suscriptor-1\" aria-expanded=\"false\"> <header>Buscar Suscriptor</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"suscriptor-1\" class=\"collapse buscarSuscriptor\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-md-2\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Suscriptor\" class=\"form-control\" ng-change=\"ctrl.cambiarBusqueda(1)\" ng-model=\"ctrl.bsan\"> </div> </div> <div class=\"col-md-4\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Nombre\" class=\"form-control\" ng-change=\"ctrl.cambiarBusqueda(2)\" ng-model=\"ctrl.bnombre\"> </div> </div> <div class=\"col-md-6\"> <p class=\"text-right\"> <button type=\"button\" class=\"btn btn-raised btn-primary btn-sm\" ng-click=\"ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </p> </div> </div> </div> <!-- panel body --> </div> </div> <!--end .panel --> </div> </div> </div> <table class=\"table\"> <thead> <tr> <th>Suscriptor</th> <th>Nombre</th> <th>Correo</th> <th>Telefono</th> <th>Ciudad</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in ctrl.suscriptores|itemsPerPage:8\"> <td>{{x.IdSuscriptor}}</td> <td>{{x.Nombre}} {{x.Apellido}}</td> <td>{{x.Email}} </td> <td>{{x.Telefono}}</td> <td>{{x.Ciudad}}</td> <td> <button class=\"btn btn-xs btn-info\" ng-click=\"ctrl.SeleccionarSusc(x)\"> <i class=\"fa fa-search\" aria-hidden=\"true\"></i> </button> </td> </tr> </tbody> </table> <div> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">cerrar</button> </div>"
  );


  $templateCache.put('views/provision/ModalDetalleSuscriptor.html',
    "<style type=\"text/css\">.scrollDiv{\r" +
    "\n" +
    "\t    height: 250px;\r" +
    "\n" +
    "\t    overflow: auto;\r" +
    "\n" +
    "\t    overflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Detalle de suscriptor #{{$ctrl.suscriptor.IdSuscriptor}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <div class=\"col-md-6\"> <h5><strong>Nombre: </strong>{{$ctrl.suscriptor.Nombre}}</h5> <h5><strong>Apellidos: </strong>{{$ctrl.suscriptor.Apellido}}</h5> <h5><strong>Teléfono: </strong>{{$ctrl.suscriptor.Telefono}}</h5> <h5><strong>Email: </strong>{{$ctrl.suscriptor.Email}}</h5> <h5><strong>Referencia: </strong>{{$ctrl.suscriptor.Referencia}}</h5> </div> <div class=\"col-md-6\"> <h5><strong>Ciudad: </strong>{{$ctrl.suscriptor.Ciudad}}</h5> <h5><strong>Colonia: </strong>{{$ctrl.suscriptor.Colonia}}</h5> <h5><strong>Calle: </strong>{{$ctrl.suscriptor.Calle}}</h5> <h5><strong>Número: </strong>{{$ctrl.suscriptor.Numero}}</h5> <h5><strong>CP: </strong>{{$ctrl.suscriptor.CP}}</h5> </div> </div> <div class=\"col-md-12\"> <hr> <h4 class=\"text-center\">Terminales</h4> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <th>SAN</th> <th>ESN</th> <th>Estado</th> <th>Servicio</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.terminales\"> <td>{{ x.SAN }}</td> <td>{{ x.ESN }}</td> <td>{{ x.Estatus }}</td> <td>{{ x.Servicio }}</td> </tr> </tbody> </table> </div> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancelar</button> </div>"
  );


  $templateCache.put('views/provision/ModalGestionTerminal.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Gestión Terminal #{{ctrl.Terminal.SAN}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Suscriptor:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Suscriptor}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Servicio:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Servicio}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Referencia:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Referencia}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">ESN:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.ESN}}</p> </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Fecha Alta:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaAlta}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Fecha Baja:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaSuspension}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Latitud:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.Latitud}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Longitud:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Longitud}}</p> </div> </div> <div class=\"col-md-12\"> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Status:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Estatus}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">Fap Status:</b> <p style=\"font-size:14px\">{{ctrl.FapStatus}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">SatelliteID:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.SatellitedID}}</p> </div> <div class=\"col-md-3\"> <b style=\"font-size:14px\">BeamID:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.BeamID}}</p> </div> </div> <div class=\"col-md-12\"> <b style=\"font-size:14px\">Comentarios:</b><br> <textarea ng-model=\"ctrl.Terminal.Comentarios\" disabled class=\"form-control input-sm\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "   </textarea> <!--  <div class=\"col-md-4\">\r" +
    "\n" +
    "      <b style=\"font-size:14px;\">Polarization:</b><br>\r" +
    "\n" +
    "      <p style=\"font-size:14px;\">{{ctrl.Terminal.Polarization}}</p>\r" +
    "\n" +
    "    </div>--> </div> <div class=\"col-md-12\"> <div class=\"text-center\"> <h5><b>Consumo de Terminal (MB)</b></h5> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Disponible:</b><br> <p style=\"font-size:14px\">{{ctrl.Consumo.Disponible}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Consumo:</b><br> <p style=\"font-size:14px\">{{ctrl.Consumo.Consumido}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Día de relleno:</b><br> <p style=\"font-size:14px\">{{ctrl.Consumo.DiaRelleno}}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Token disponible:</b><br> <p style=\"font-size:14px\">{{ctrl.Token}}</p> </div> </div> </div> <hr> <div class=\"row form-group text-center\"> <h5><b>Transacciones</b></h5> <div class=\"col-md-4\" style=\"padding-left: 25px\"> <b>Comando</b> <br> <select ng-model=\"ctrl.Comando\" class=\"form-control\" name=\"comando\" ng-options=\"item.Nombre for item in ctrl.Comandos track by item.IdComando\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona un comando</option> </select> </div> <div class=\"col-md-4\" ng-if=\"ctrl.Comando.IdComando == 5\"> <b>Cantidad (GB)</b> <input type=\"text\" name=\"cantidadToken\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"ctrl.cantidadToken\" required-message=\"'Error!, Este campo es obligatorio.'\" required> </div> <div class=\"col-md-4\" ng-if=\"ctrl.Comando.IdComando == 6\"> <b>Servicio</b> <br> <select ng-model=\"ctrl.Servicio\" class=\"form-control\" name=\"comando\" ng-options=\"item.Nombre for item in ctrl.Servicios track by item.IdServicio\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">Selecciona un servicio</option> </select> </div> <div class=\"col-md-2\"> <br> <button class=\"btn pull-right btn-raised btn-success\" type=\"button\" ng-click=\"ctrl.aplicaComando()\">Aplicar</button> </div> <div class=\"row\"> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/ModalGetLatLong.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Selecciona Latitud y longuitud</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div> <ng-map center=\"23.96617587126503, -101.953125\" zoom=\"4\" on-click=\"ctrl.getpos($event)\"> <marker position=\"{{ctrl.latlng}}\" title=\"Selecciona tu posición\" on-dragend=\"ctrl.getpos($event)\" animation=\"Animation.BOUNCE\" animation=\"DROP\" draggable=\"true\"></marker> </ng-map> {{ctrl.latlng}} </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cancelar</button> <button class=\"btn btn-primary\" type=\"button\" ng-click=\"ctrl.ok()\">Asignar</button> </div>"
  );


  $templateCache.put('views/provision/ModalHistoricosTerminales.html',
    "<div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Históricos de Terminal #{{ctrl.Terminal.SAN}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <canvas id=\"canvas\" width=\"770\" height=\"385\" style=\"display: block; width: 770px; height: 385px\"></canvas> </div> </div> <div class=\"row form-group text-center\"> <h5><b>Gráfica de Consumo de Terminal por Fechas</b></h5> <div class=\"col-md-4\"> <b>Fecha Inicio</b><br> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaInicio\"> </div> <!--<div class=\"col-md-2\">\r" +
    "\n" +
    "      <b>Hora Inicio</b><br>\r" +
    "\n" +
    "      <input type=\"time\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"hora\" required-message=\"'Este campo es obligatorio.'\"\r" +
    "\n" +
    "        required validate-on=\"dirty\" ng-model=\"ctrl.HoraInicio\">\r" +
    "\n" +
    "    </div>--> <div class=\"col-md-4\"> <b>Fecha Fin</b><br> <input type=\"datetime-local\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"ctrl.FechaFin\"> </div> <!--<div class=\"col-md-2\">\r" +
    "\n" +
    "      <b>Hora Fin</b><br>\r" +
    "\n" +
    "      <input type=\"time\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"hora\" required-message=\"'Este campo es obligatorio.'\"\r" +
    "\n" +
    "        required validate-on=\"dirty\" ng-model=\"ctrl.HoraFin\">\r" +
    "\n" +
    "    </div>--> <div class=\"col-md-2\"> <button class=\"btn pull-right btn-raised btn-success\" type=\"button\" ng-click=\"ctrl.graficar()\">Graficar</button> </div> </div> <div class=\"row form-group\"> <div class=\"col-md-12\"> <canvas id=\"chartjs-0\" class=\"chartjs\" width=\"770\" height=\"385\" style=\"display: block; width: 770px; height: 385px\"></canvas> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/MovimientosTerminales.html',
    "<style type=\"text/css\">.scrollDiv{\r" +
    "\n" +
    "\t    height: 250px;\r" +
    "\n" +
    "\t    overflow: auto;\r" +
    "\n" +
    "\t    overflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Movimientos De Terminal #{{ctrl.Terminal.SAN}}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Suscriptor:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Suscriptor}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Servicio:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Servicio}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Fecha Alta:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaAlta}}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Fecha Baja:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.FechaSuspension}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Latitud:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.Latitud}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Longitud:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Longitud}}</p> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b style=\"font-size:14px\">Status:</b> <p style=\"font-size:14px\">{{ctrl.Terminal.Estatus}}</p> </div> <div class=\"col-md-4\"> <b style=\"font-size:14px\">ESN:</b><br> <p style=\"font-size:14px\">{{ctrl.Terminal.ESN}}</p> </div> </div> <div class=\"row\"> <h3 class=\"text-center\">Movimientos</h3> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <th>ID</th> <th>Comando</th> <th>Origen</th> <th>Fecha</th> <th>Acciones</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in ctrl.movimientos\"> <td>{{ x.IdMovimiento }}</td> <td>{{ x.Comando }}</td> <td>{{ x.Origen }}</td> <td>{{ x.Fecha }}</td> <td><button class=\"btn btn-xs btn-warning\" ng-click=\"ctrl.detalleMovimiento(x)\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i></button></td> </tr> </tbody> </table> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/NuevaTerminal.html',
    "<form angular-validator-submit=\"$ctrl.GuardaTerminal()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:10px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">{{$ctrl.titulo}}</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Provisión</a></small> </header> <div class=\"tools\"> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> <button class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.provision.terminales\">Cancelar</button> </div> </div> <div class=\"card-body\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> <div class=\"panel-body\"> <div class=\"col-md-8\"> <div class=\"row form-group\"> <div class=\"col-md-10\"> <b>Suscriptor</b> <input type=\"text\" class=\"form-control input-sm\" disabled name=\"sucriptor\" ng-model=\"$ctrl.NombreSuscriptor\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-2 text-left\"> <br> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.BuscaSuscriptor()\"><i class=\"fa fa-search\"></i> Buscar</a> </div> </div> <div class=\"row\"> <br> <div class=\"col-md-4\"> <b>Latitud</b> <input type=\"text\" class=\"form-control\" name=\"latitus\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" placeholder=\"Ejemplo: -12.256555\" ng-model=\"$ctrl.Latitud\"> </div> <div class=\"col-md-4\"> <b>Longuitud</b><br> <input type=\"text\" name=\"longitud\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" class=\"form-control\" placeholder=\"Ejemplo: 2.2888555\" ng-model=\"$ctrl.Longuitud\"> </div> <div class=\"col-md-1\" style=\"margin-top:20px\"> <a class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.BuscaLatLong()\"><i class=\"fa fa-globe\"></i></a> </div> <div class=\"col-md-6\"> <br> <b>Servicio</b> <br> <select ng-model=\"$ctrl.Servicio\" class=\"form-control\" name=\"servicio\" ng-options=\"item as item.Nombre for item in $ctrl.Servicios track by item.IdServicio\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> <option value=\"\">selecciona</option> </select> </div> </div> <div class=\"row\"> <br> <div class=\"col-md-4\" style=\"margin-top:10px\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.ValidarServicio()\"><i class=\"fa fa-check-square\"></i> Validar Cobertura</a> </div> <div class=\"col-md-2\"> <b>Beam</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Beam\" name=\"beam\" ng-model=\"$ctrl.BeamID\" ng-disabled=\"true\"> </div> <div class=\"col-md-4\"> <b>Satellite</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"Satellite\" name=\"satellite\" ng-model=\"$ctrl.SatelliteID\" ng-disabled=\"true\"> </div> </div> <div class=\"row form-group\"> <br> <div class=\"col-md-5\"> <b>Status</b><br> <select type=\"text\" validate-on=\"dirty\" name=\"status\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-options=\"item as item.Nombre for item in $ctrl.ListaStatus track by item.clave\" class=\"form-control\" ng-model=\"$ctrl.Status\" ng-init=\"$ctrl.Status.clave='Pendiente'\" ng-disabled=\"true\"> </select> </div> <div class=\"col-md-5\"> <b>Fecha de alta</b><br> <input type=\"date\" class=\"form-control input-sm\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"$ctrl.FechaAlta\"> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Fecha de suspensión</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"fecha suspension\" ng-model=\"$ctrl.FechaSuspencion\" ng-disabled=\"true\"> </div> <div class=\"col-md-5\"> <b>Fecha de cancelación</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"fecha cancelación\" ng-model=\"$ctrl.FechaCancelacion\" ng-disabled=\"true\"> </div> </div> <div class=\"row\"> <div class=\"col-md-10\"> <b>Comentarios</b><br> <textarea class=\"form-control input-sm\" ng-model=\"$ctrl.Comentarios\" placeholder=\"Captura las observaciones \"></textarea> </div> </div> </div> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/provision/Terminales.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Terminales</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"> <a href=\"#\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Inicio</a>><a href=\"#\" class=\"paginaActiva\">Provisión</a></small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-sm btn-raised btn-success\" ng-if=\"$ctrl.idSuscriptor == 0\" permission permission-only=\"'terminalesAdd'\" ui-sref=\"home.provision.terminalesNueva\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> <button type=\"button\" class=\"btn pull-right btn-sm btn-raised btn-success\" ng-if=\"$ctrl.idSuscriptor != 0\" permission permission-only=\"'terminalesAdd'\" ui-sref=\"home.provision.terminalesNueva({idSuscriptor:$ctrl.idSuscriptor})\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"card-body\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#suscriptor\" data-target=\"#suscriptor-1\" aria-expanded=\"false\"> <header>Buscar</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"suscriptor-1\" class=\"collapse buscarSuscriptor\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"panel-body\"> <uib-tabset active=\"active\"> <uib-tab index=\"0\" heading=\"Suscriptor\"> <div class=\"row\" style=\"padding: 10px\"> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.bsan\" placeholder=\"SAN\" ng-change=\"$ctrl.busquedaCambio(1)\"> </div> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.bsus\" placeholder=\"Nombre de suscriptor\" ng-change=\"$ctrl.busquedaCambio(2)\"> </div> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.esn\" placeholder=\"ESN\" ng-change=\"$ctrl.busquedaCambio(6)\"> </div> <div class=\"col-md-2\"> <select type=\"text\" ng-change=\"$ctrl.busquedaCambio(4)\" ng-options=\"item as item.Nombre for item in $ctrl.ListaStatus track by item.clave\" class=\"form-control input-sm\" ng-model=\"$ctrl.Status\" ng-init=\"$ctrl.Status.clave='Pendiente'\"> </select> </div> <div class=\"col-md-2\"> <input type=\"text\" class=\"form-control input-sm\" ng-model=\"$ctrl.BReferencia\" placeholder=\"Referencia\" ng-change=\"$ctrl.busquedaCambio(8)\">  </div> <div class=\"col-md-2\"> <button type=\"button\" class=\"btn btn-raised btn-sm btn-primary\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Servicio\"> <div class=\"row\" style=\"padding: 10px\"> <div class=\"col-md-4\"> <label class=\"text-muted\">Beam</label> <select class=\"form-control input-sm\" ng-model=\"$ctrl.beam\" ng-change=\"$ctrl.busquedaCambio(5)\" ng-options=\"v.Name for v in $ctrl.Beams track by v.BeamId \"> <option value=\"\">Selecciona</option> </select> </div> <div class=\"col-md-3\"> <label class=\"text-muted\">Servicios</label> <select class=\"form-control input-sm\" ng-model=\"$ctrl.bservicio\" ng-change=\"$ctrl.busquedaCambio(3)\" ng-options=\"v.Nombre for v in $ctrl.servicios track by v.IdServicio\"> </select> </div> <div class=\"col-md-3\"> <label class=\"text-muted\">Satélite</label> <select class=\"form-control input-sm\" ng-model=\"$ctrl.bsatelite\" ng-change=\"$ctrl.busquedaCambio(7)\"> <option value=\"\" disabled>Selecciona</option> <option value=\"65w\">65w</option> <option value=\"EchoStar 19\">EchoStar 19</option> </select> </div> <div class=\"col-md-2\"> <br> <button type=\"button\" class=\"btn btn-raised btn-sm btn-primary\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </div> </div> </uib-tab> </uib-tabset> </div> <!-- panel body --> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\"> <table class=\"table\"> <thead> <tr> <th>San</th> <th>Suscriptor</th> <th>ESN</th> <th>Servicio</th> <th>Referencia</th> <th>Estatus</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.terminales|itemsPerPage:7\"> <td>{{ x.SAN }}</td> <td>{{ x.Suscriptor }}</td> <td>{{ x.ESN }}</td> <td>{{x.Servicio}}</td> <td>{{x.Referencia}}</td> <td>{{x.Estatus}}</td> <td> <a ng-click=\"$ctrl.GestionTerminal(x)\" class=\"btn btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Gestionar Terminal\"><i class=\"fa fa-laptop\" aria-hidden=\"true\"></i></a> <a ng-click=\"$ctrl.verMovimientos(x)\" class=\"btn btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Movimientos\"><i class=\"fa fa-exchange\" aria-hidden=\"true\"></i></a> <!-- <a ng-click=\"$ctrl.EditarTerminal(x)\" permission permission-only=\"'terminalesUpdate'\" class=\"btn  btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar Terminal\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a> --> <a ng-click=\"$ctrl.verHistoricos(x)\" class=\"btn btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Históricos\"><i class=\"fa fa-tachometer\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <div style=\"padding-left: 20px\" ng-show=\"true\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/provision/activacion.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Activación de Terminales</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Activación</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> </div> </div> </div> <div class=\"section-body\"> <form angular-validator-submit=\"$ctrl.activarTerminal()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel form-element-padding\"> <div class=\"panel-body\"> <div class=\"row\"> <div class=\"col-md-4\"> <b>SAN</b><br> <input type=\"text\" class=\"form-control input-sm\" placeholder=\"SAN\" name=\"san\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.SAN\"> </div> <div class=\"col-md-2\" style=\"margin-top:20px\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.validarSAN()\"><i class=\"fa fa-search\"></i> Validar SAN</a> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b>PIN</b><br> <input type=\"text\" ng-disabled=\"true\" class=\"form-control input-sm\" placeholder=\"PIN\" name=\"pin\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.PIN\"> </div> </div> <div class=\"row\"> <div class=\"col-md-4\"> <b>ESN</b><br> <input type=\"text\" class=\"form-control input-sm\" ng-disabled=\"$ctrl.bockEsn\" placeholder=\"ESN\" name=\"esn\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.ESN\"> </div> </div> <div class=\"row\"> <div class=\"col-md-6 text-left\"> <br> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Activar</button> </div> </div> </div> </div> </form> </div> </div>"
  );


  $templateCache.put('views/provision/detalleMovimiento.html',
    "<style type=\"text/css\">.scrollDiv {\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "    overflow: auto;\r" +
    "\n" +
    "    overflow-x: hidden;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "  \r" +
    "\n" +
    "  td.fecha {\r" +
    "\n" +
    "    width: 150px;\r" +
    "\n" +
    "  }</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Movimiento #{{ ctrl.movimiento.IdMovimiento }}</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row\"> <div class=\"col-md-12\"> <p ng-if=\"ctrl.movimiento.IdComando != 5 && ctrl.movimiento.IdComando != 6\"><b>Comando: </b>{{ ctrl.movimiento.Comando }}</p> <p ng-if=\"ctrl.movimiento.IdComando == 5\"><b>Comando: </b>{{ ctrl.movimiento.Comando }} - {{ ctrl.movimiento.Detalle1 }}</p> <p ng-if=\"ctrl.movimiento.IdComando == 6\"><b>Comando: </b>{{ ctrl.movimiento.Comando }} {{ ctrl.movimiento.Detalle1 }} - {{ ctrl.movimiento.Detalle2 }}</p> <p><b>Fecha: </b>{{ ctrl.movimiento.Fecha }}</p> <p><b>Origen: </b>{{ ctrl.movimiento.Origen }}</p> <p><b>Mensaje: </b>{{ ctrl.movimiento.Mensaje }}</p> <p><b>Usuario: </b>{{ ctrl.movimiento.Usuario }}</p> </div> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <td class=\"text-center fecha\">Fecha</td> <td class=\"text-center fecha\">Hora</td> <td class=\"text-center\">Detalle</td> </tr> </thead> <tbody> <tr ng-if=\"ctrl.detalles.length == 0\"> <td colspan=\"2\" class=\"text-center\">Movimiento sin detalles</td> </tr> <tr ng-repeat=\"x in ctrl.detalles\" ng-if=\"ctrl.detalles.length > 0\"> <td class=\"text-center fecha\">{{ x.Fecha }}</td> <td class=\"text-center fecha\">{{ x.Hora }}</td> <td>{{ x.Mensaje }}</td> </tr> </tbody> </table> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"ctrl.cancel()\">Cerrar</button> </div>"
  );


  $templateCache.put('views/provision/editarSuscriptor.html',
    "<form angular-validator-submit=\"$ctrl.guardar()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Editar Suscriptor</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Editar Suscriptor</small> </header> <div class=\"tools\"> <button class=\"btn btn-raised btn-default btn-sm\" type=\"button\" ui-sref=\"home.provision.suscriptores\">Cancelar</button> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> </div> </div> <div class=\"section-body\"> <div class=\"panel form-element-padding\"> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"row\"> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-10\"> <b>Nombre</b> <input type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Nombre\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-10\"> <b>Apellidos</b> <input type=\"text\" class=\"form-control\" name=\"apellidos\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Apellido\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Teléfono</b> <input type=\"text\" ui-mask=\"(999) 999-9999\" minlength=\"10\" name=\"telefono\" validate-on=\"dirty\" invalid-message=\"'Formato de teléfono no valido.'\" ui-mask-placeholder ui-mask-placeholder-char=\"_\" ng-model=\"$ctrl.suscriptor.Telefono\" class=\"form-control mask-phone_us\"> </div> <div class=\"col-md-5\"> <b>Email</b> <input type=\"email\" ng-model=\"$ctrl.suscriptor.Email\" validate-on=\"dirty\" name=\"email\" invalid-message=\"'Formato de correo no valido.'\" class=\"form-control\"> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Referencia</b> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Referencia\"> </div> </div> </div> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-8\"> <b>Estado</b> <select validate-on=\"dirty\" name=\"estado\" class=\"form-control\" ng-model=\"$ctrl.estado\" ng-options=\"v.Nombre for v in $ctrl.estados track by v.IdEstado\" required-message=\"'Este campo es obligatorio.'\" required> </select></div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Ciudad</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"ciudad\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Ciudad\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Colonia</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"colonia\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Colonia\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Calle</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"calle\" class=\"form-control\" ng-model=\"$ctrl.suscriptor.Calle\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Número</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" class=\"form-control\" name=\"numero\" ng-model=\"$ctrl.suscriptor.Numero\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>CP</b> <input type=\"text\" ng-model=\"$ctrl.suscriptor.CP\" validate-on=\"dirty\" name=\"cp\" required-message=\"'Este campo es obligatorio.'\" class=\"form-control\" required> </div> </div> </div> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/provision/editarTerminal.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h3 class=\"animated fadeInLeft\">Editar Terminal</h3> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Terminales</p> </div> </div> </div> <div class=\"col-md-12\"> <form angular-validator-submit=\"$ctrl.GuardaTerminal()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"panel form-element-padding\"> <div class=\"panel-heading\"> <p class=\"text-right\"> <button class=\"btn btn-raised btn-default btn-sm\" ui-sref=\"home.provision.terminales\">Cancelar</button> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> </p> <div class=\"tools\" style=\"margin-top:-30px\"> <p class=\"text-left\">Editar Terminal </p> </div> </div> <div class=\"panel-body\"> <div class=\"col-md-8\"> <div class=\"row form-group\"> <div class=\"col-md-6\"> <b>Suscriptor</b> <input type=\"text\" class=\"form-control\" disabled name=\"sucriptor\" ng-model=\"$ctrl.NombreSuscriptor\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </div> <div class=\"col-md-6 text-left\"> <br> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.BuscaSuscriptor()\"><i class=\"fa fa-search\"></i> Buscar</a> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <b>Servicio</b> <br> <select ng-model=\"$ctrl.Servicio\" class=\"form-control\" name=\"servicio\" ng-options=\"item as item.Nombre for item in $ctrl.Servicios track by item.IdServicio\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required> </select> </div> <div class=\"col-md-6\"> <b>ESN</b><br> <input type=\"text\" class=\"form-control\" placeholder=\"ESN\" name=\"esn\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" ng-model=\"$ctrl.ESN\"> </div> </div> <div class=\"row\"> <br> <div class=\"col-md-5\"> <b>Latitud</b> <input type=\"text\" class=\"form-control\" name=\"latitus\" validate-on=\"dirty\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" placeholder=\"Latitud\" ng-model=\"$ctrl.Latitud\"> </div> <div class=\"col-md-5\"> <b>Longuitud</b><br> <input type=\"text\" name=\"longitud\" required-message=\"'Este campo es obligatorio.'\" validate-on=\"dirty\" required validate-on=\"dirty\" class=\"form-control\" placeholder=\"Longuitud\" ng-model=\"$ctrl.Longuitud\"> </div> <div class=\"col-md-2\" style=\"margin-top:20px\"> <a class=\"btn btn-warning btn-sm\" ng-click=\"$ctrl.BuscaLatLong()\"><i class=\"fa fa-globe\"></i></a> </div> </div> <div class=\"row form-group\"> <div class=\"col-md-6\"> <b>Status</b><br> <select type=\"text\" validate-on=\"dirty\" name=\"status\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-options=\"item as item.Nombre for item in $ctrl.ListaStatus track by item.clave\" class=\"form-control\" ng-model=\"$ctrl.Status\"> <option value=\"\">selecciona</option> </select> </div> <div class=\"col-md-6\"> <b>Fecha de alta</b><br> <input type=\"date\" class=\"form-control\" validate-on=\"dirty\" name=\"fecha\" required-message=\"'Este campo es obligatorio.'\" required validate-on=\"dirty\" ng-model=\"$ctrl.FechaAlta\"> </div> </div> <div class=\"row\"> <div class=\"col-md-6\"> <b>Fecha de suspensión</b><br> <input type=\"text\" class=\"form-control\" placeholder=\"fecha suspension\" ng-model=\"$ctrl.FechaSuspencion\" ng-disabled=\"true\"> </div> <div class=\"col-md-6\"> <b>Fecha de cancelación</b><br> <input type=\"text\" class=\"form-control\" placeholder=\"fecha cancelación\" ng-model=\"$ctrl.FechaCancelacion\" ng-disabled=\"true\"> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <b>Comentarios</b><br> <textarea class=\"form-control\" ng-model=\"$ctrl.Comentarios\"></textarea> </div> </div> </div> </div> </div> </form> </div>"
  );


  $templateCache.put('views/provision/nuevoSuscriptor.html',
    "<form angular-validator-submit=\"$ctrl.guardar()\" name=\"myForm\" class=\"form-horizontal\" novalidate angular-validator> <div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Nuevo Suscriptor</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Nuevo Suscriptor</small> </header> <div class=\"tools\"> <button class=\"btn btn-raised btn-default btn-sm\" type=\"button\" ui-sref=\"home.provision.suscriptores\">Cancelar</button> <button class=\"btn btn-raised btn-success btn-sm\" type=\"submit\">Guardar </button> </div> </div> <div class=\"section-body\"> <div class=\"panel form-element-padding\"> <div class=\"panel-body\" style=\"padding-bottom:30px\"> <div class=\"row\"> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-10\"> <b>Nombre</b> <input type=\"text\" name=\"nombre\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.nombre\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-10\"> <b>Apellidos</b> <input type=\"text\" class=\"form-control\" name=\"apellidos\" validate-on=\"dirty\" class=\"form-control\" ng-model=\"$ctrl.apellidos\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Teléfono</b> <input type=\"text\" ui-mask=\"(999) 999-9999\" minlength=\"10\" name=\"telefono\" validate-on=\"dirty\" invalid-message=\"'Formato de teléfono no valido.'\" ui-mask-placeholder ui-mask-placeholder-char=\"_\" ng-model=\"$ctrl.telefono\" class=\"form-control\"> </div> <div class=\"col-md-5\"> <b>Email</b> <input type=\"email\" ng-model=\"$ctrl.email\" validate-on=\"dirty\" name=\"email\" invalid-message=\"'Formato de correo no valido.'\" class=\"form-control\"> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Referencia</b> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.referencia\"> </div> </div> </div> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-8\"> <b>Estado</b> <select validate-on=\"dirty\" name=\"estado\" class=\"form-control\" ng-model=\"$ctrl.estado\" ng-options=\"v.Nombre for v in $ctrl.estados track by v.IdEstado\" required-message=\"'Este campo es obligatorio.'\" required></select> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Ciudad</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"ciudad\" class=\"form-control\" ng-model=\"$ctrl.ciudad\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Colonia</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"colonia\" class=\"form-control\" ng-model=\"$ctrl.colonia\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-8\"> <b>Calle</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" name=\"calle\" class=\"form-control\" ng-model=\"$ctrl.calle\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>Número</b> <input type=\"text\" class=\"form-control\" validate-on=\"dirty\" class=\"form-control\" name=\"numero\" ng-model=\"$ctrl.numero\" required-message=\"'Este campo es obligatorio.'\" required> </div> </div> <div class=\"row\"> <div class=\"col-md-5\"> <b>CP</b> <input type=\"text\" ng-model=\"$ctrl.cp\" validate-on=\"dirty\" name=\"cp\" required-message=\"'Este campo es obligatorio.'\" class=\"form-control\" required> </div> </div> </div> </div> </div> </div> </div> </div> </form>"
  );


  $templateCache.put('views/provision/suscriptores.html',
    "<div class=\"card\" style=\"margin-top:20px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Suscriptores</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Provisión>Suscriptores</small> </header> <div class=\"tools\"> <div class=\"btn-group\"> <button type=\"button\" class=\"btn pull-right btn-raised btn-success btn-sm\" permission permission-only=\"'suscriptoresAdd'\" ui-sref=\"home.provision.suscriptoresNuevo\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Nuevo</button> </div> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"card panel\"> <div class=\"card-head card-head-xs collapsed\" data-toggle=\"collapse\" data-parent=\"#suscriptor\" data-target=\"#suscriptor-1\" aria-expanded=\"false\"> <header>Buscar</header> <div class=\"tools\"> <a class=\"btn btn-icon-toggle\"><i class=\"fa fa-angle-down\"></i></a> </div> </div> <div id=\"suscriptor-1\" class=\"collapse buscarSuscriptor\" aria-expanded=\"false\" style=\"height: 0px\"> <div class=\"panel-body\"> <uib-tabset active=\"active\"> <uib-tab index=\"0\" heading=\"Suscriptor\" ng-click=\"$ctrl.buscar()\"> <br><br> <div class=\"row\"> <div class=\"col-md-2\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"number\" placeholder=\"Suscriptor\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(1)\" ng-model=\"$ctrl.bsan\"> </div> </div> <div class=\"col-md-3\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Nombre\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(2)\" ng-model=\"$ctrl.bnombre\"> </div> </div> <div class=\"col-md-3\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Apellidos\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(2)\" ng-model=\"$ctrl.bApellidos\"> </div> </div> <div class=\"col-md-3\" style=\"margin-top:-30px\"> <div class=\"panel-body\"> <input type=\"text\" placeholder=\"Referencia\" class=\"form-control input-sm\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.brefe\"> </div> </div> <div class=\"col-md-1\"> <p class=\"text-right\"> <button type=\"button\" class=\"btn btn-raised btn-primary btn-sm\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Buscar</button> </p> </div> </div> </uib-tab> <uib-tab index=\"1\" heading=\"Domicilio\" ng-click=\"$ctrl.buscar()\"> <br><br> <div class=\"row\"> <div class=\"col-md-3\"> <input type=\"text\" placeholder=\"Calle\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.Calle\" class=\"form-control input-sm\"> </div> <div class=\"col-md-1\"> <input type=\"text\" placeholder=\"Numero\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.Numero\" class=\"form-control input-sm\"> </div> <div class=\"col-md-3\"> <input type=\"text\" placeholder=\"Colonia\" ng-change=\"$ctrl.cambiarBusqueda(3)\" ng-model=\"$ctrl.Colonia\" class=\"form-control input-sm\"> </div> <div class=\"col-md-3\"> <input type=\"text\" ng-model=\"$ctrl.Ciudad\" ng-change=\"$ctrl.cambiarBusqueda(3)\" placeholder=\"Ciudad\" class=\"form-control input-sm\"> </div> <div class=\"col-md-2\"> <button class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.buscar()\"><i class=\"fa fa-search\"></i> Buscar</button> </div> </div> </uib-tab> </uib-tabset> </div> <!-- panel body --> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table class=\"table\"> <thead> <tr> <th>Suscriptor</th> <th>Nombre</th> <th>Referencia</th> <th>Correo</th> <th>Calle y num.</th> <th>Ciudad</th> <th>Opciones</th> </tr> </thead> <tbody> <tr dir-paginate=\"x in $ctrl.suscriptores|itemsPerPage:8\"> <td>{{ x.IdSuscriptor }}</td> <td>{{ x.Nombre }} {{ x.Apellido }}</td> <td>{{ x.Referencia }}</td> <td>{{ x.Email }} </td> <td>{{ x.Calle }} #{{x.Numero}}</td> <td>{{ x.Ciudad }}</td> <td> <button class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Detalle de suscriptor\" ng-click=\"$ctrl.DetalleSuscriptor(x);\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></button> <button class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Editar suscriptor\" permission permission-only=\"'suscriptoresUpdate'\" ui-sref=\"home.provision.suscriptoresEditar({id:x.IdSuscriptor})\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button> <a class=\"btn i btn-xs btn-default\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Terminales\" ui-sref=\"home.provision.terminales({idSuscriptor: x.IdSuscriptor })\"><i class=\"fa fa-laptop\" aria-hidden=\"true\"></i></a> </td> </tr> </tbody> </table> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </div> </div> </div> </div>"
  );


  $templateCache.put('views/provision/terminalesSuscriptor.html',
    "<style type=\"text/css\">.scrollDiv{\r" +
    "\n" +
    "\t    height: 300px;\r" +
    "\n" +
    "\t    overflow: auto;\r" +
    "\n" +
    "\t    overflow-x: hidden;\r" +
    "\n" +
    "\t}</style> <div class=\"modal-header\"> <button class=\"close\" aria-label=\"Close\" type=\"button\" ng-click=\"$ctrl.cancel()\">×</button> <h4 class=\"modal-title\">Terminales Ligadas</h4> </div> <div class=\"modal-body\" style=\"padding-top:20px\"> <div class=\"row form-group\"> <div class=\"col-md-12\"> <h5><strong>Suscriptor: </strong>{{$ctrl.suscriptor.Nombre}} {{$ctrl.suscriptor.Apellido}}</h5> <h5><strong>San: </strong>{{$ctrl.suscriptor.IdSuscriptor}}</h5> <hr> </div> <div class=\"col-md-12 scrollDiv\"> <table class=\"table\"> <thead> <tr> <th>SAN</th> <th>ESN</th> <th>Estado</th> <th>Servicio</th> </tr> </thead> <tbody> <tr ng-repeat=\"x in $ctrl.terminales\"> <td>{{ x.SAN }}</td> <td>{{ x.ESN }}</td> <td>{{ x.Estatus }}</td> <td>{{ x.Servicio }}</td> </tr> </tbody> </table> </div> </div> </div> <div class=\"modal-footer\"> <button class=\"btn btn-default\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancelar</button> </div>"
  );


  $templateCache.put('views/reportes/reportes.html',
    "<div class=\"panel\" style=\"height:100px\"> <div class=\"panel-body\" style=\"margin-top:-20px\"> <div class=\"col-md-6 col-sm-12\"> <h4 style=\"margin-top: 20px\" class=\"animated fadeInLeft\">Reportes</h4> <p class=\"animated fadeInDown\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Incidencias>Reportes</p> </div> </div> </div> <div class=\"row\"> <div class=\"col-md-12\"> <div class=\"panel form-element-padding\"> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesContrato.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.3pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td.media{font-size: 8.7pt;}\r" +
    "\n" +
    "  input.media{font-size: 8.7pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-green {\r" +
    "\n" +
    "  color: green;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-blue {\r" +
    "\n" +
    "  color: #1E90FF; /*dodgerblue*/\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-red {\r" +
    "\n" +
    "  color: red;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".color-orange {\r" +
    "\n" +
    "  color: orange;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-yellow {\r" +
    "\n" +
    "  color: #999900; /*amarillo*/\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px; padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Contrato</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-25px\"> <!--  <input type=\"text\" ng-model=\"$ctrl.search\" class=\"form-control\" placeholder=\"buscar san...\"> --> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"Referencia\"> Referencia </th> <th st-sort=\"IdSuscriptor\">Id Suscriptor</th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"Servicio\">Servicio</th> <th st-sort=\"Fap\">Fap</th> </tr> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Servicio\" placeholder=\"Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Fap\" placeholder=\"Fap\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td>{{row.SAN}}</td> <td>{{row.Referencia}}</td> <td>{{row.IdSuscriptor}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Beam}}</td> <td>{{row.Servicio}}</td> <td>{{row.Fap}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> </div> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\" ng-hide=\"$ctrl.divExportar\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> "
  );


  $templateCache.put('views/reportes/reportesdatosDelSuscriptor.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.5pt;}\r" +
    "\n" +
    "  td.media{font-size: 9.2pt;}\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Datos del Suscriptor</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"IdSuscriptor\">Id <br> Suscriptor</th> <th st-sort=\"Referencia\">Referencia</th> <th st-sort=\"Nombre\">Nombre</th> <th st-sort=\"Estado\">Estado</th> <th st-sort=\"Municipio\">Municipio</th> <th st-sort=\"Colonia\">Colonia</th> <th st-sort=\"Calle\">Calle</th> <th st-sort=\"NumeroExt\">Número Exterior</th> <th st-sort=\"CP\">Código <br> Postal</th> <th st-sort=\"Telefono\">Teléfono</th> <th st-sort=\"Celular\">Celular</th> <th st-sort=\"Email\">Email</th> </tr> <!--<tr>\r" +
    "\n" +
    "                  <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "                </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Nombre\" placeholder=\"Nombre\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estado\" placeholder=\"Estado\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Municipio\" placeholder=\"Municipio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Colonia\" placeholder=\"Colonia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Calle\" placeholder=\"Calle\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"NumeroExt\" placeholder=\"Número Ext\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"CP\" placeholder=\"C. P.\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Telefono\" placeholder=\"Teléfono\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Celular\" placeholder=\"Celular\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Email\" placeholder=\"Email\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"5%\">{{row.SAN}}</td> <td>{{row.IdSuscriptor}}</td> <td>{{row.Referencia}}</td> <td>{{row.Nombre}}</td> <td class=\"media\">{{row.Estado}}</td> <td class=\"media\">{{row.Municipio}}</td> <td class=\"media\">{{row.Colonia}}</td> <td class=\"media\">{{row.Calle}}</td> <td class=\"media\">{{row.NumeroExt}}</td> <td width=\"5%\" class=\"media\">{{row.CP}}</td> <td class=\"media\">{{row.Telefono}}</td> <td class=\"media\">{{row.Celular}}</td> <td class=\"media\">{{row.Email}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesdetalleterm.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.3pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td.media{font-size: 8.7pt;}\r" +
    "\n" +
    "  input.media{font-size: 8.63pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-green {\r" +
    "\n" +
    "  color: green;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-blue {\r" +
    "\n" +
    "  color: #1E90FF; /*dodgerblue*/\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-red {\r" +
    "\n" +
    "  color: red;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".color-orange {\r" +
    "\n" +
    "  color: orange;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".color-yellow {\r" +
    "\n" +
    "  color: #999900; /*amarillo*/\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px; padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Detalle de Terminales</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Beam</label> <div class=\"col-sm-8\"> <select class=\"form-control\" ng-model=\"$ctrl.beam_input\" ng-options=\"v.BeamId for v in $ctrl.listaBeam track by v.BeamId\"> </select> </div> </div> </div> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Plan</label> <div class=\"col-sm-8\"> <select class=\"form-control\" ng-model=\"$ctrl.plan_input\" ng-options=\"v.Nombre for v in $ctrl.listaPlan track by v.IdServicio\"> </select> </div> </div> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Estado</label> <div class=\"col-sm-8\"> <select class=\"form-control\" ng-model=\"$ctrl.estado_input\" ng-options=\"v.Nombre for v in $ctrl.listaEstado track by v.IdEstado\"> </select> </div> </div> </div> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">ESN</label> <div class=\"col-sm-8\"> <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.san_input\" placeholder=\"\" style=\"\"> </div> </div> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">Id Suscriptor</label> <div class=\"col-sm-8\"> <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.idSuscriptor_input\" placeholder=\"\" style=\"\"> </div> </div> </div> <div class=\"row\"> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-left\">SAN</label> <div class=\"col-sm-8\"> <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.siteId_input\" placeholder=\"\" style=\"\"> </div> </div> <div class=\"form-group col-md-4\"> <label class=\"col-sm-4 control-label text-right\"></label> <div class=\"col-md-8\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteDetalleT();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" st-reset-search ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-25px\"> <!--  <input type=\"text\" ng-model=\"$ctrl.search\" class=\"form-control\" placeholder=\"buscar san...\"> --> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN</th> <th st-sort=\"Estado\">Estado</th> <th st-sort=\"Beam\">Beam </th> <th st-sort=\"SatellitedID\">Satellite </th> <th st-sort=\"PlanServ\">Plan de <br> Servicio</th> <th st-sort=\"ESN\">ESN <br> Serie</th> <th st-sort=\"IdSuscriptor\">Id <br>Suscriptor</th> <th st-sort=\"EstadoFap\">Estado FAP </th> <th st-sort=\"Ipv4\">IPV4</th> <th st-sort=\"Ipv6\">IPV6</th> <th st-sort=\"AssocTime\">Assoc <br> Time</th> <th st-sort=\"Latitud\">Latitud</th> <th st-sort=\"Longitud\">Longitud</th> <th st-sort=\"AvailTokens\">Avail <br>Tokens</th> <th st-sort=\"TxBytes\">TXBytes</th> <th st-sort=\"RxBytes\">RXBytes</th> </tr> <!--<tr>\r" +
    "\n" +
    "                <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "              </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estado\" placeholder=\"Estado\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanServ\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"EstadoFap\" placeholder=\"Estado Fap\" class=\"input-sm form-control media\" type=\"search\"> </th> <th colspan=\"2\"> <input st-search placeholder=\"IP\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"AssocTime\" placeholder=\"Assoc Time\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"AvailTokens\" placeholder=\"Avail Tokens\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"TxBytes\" placeholder=\"TxBytes\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"RxBytes\" placeholder=\"RxBytes\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|filter:$ctrl.search|itemsPerPage:5\"> <td width=\"5%\"> {{row.SAN}}</td> <!--<i class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></i>--> <!-- <td> <i ng-class=\"{'fa fa-check-circle-o':row.Estado ==='Activa'}\"></i> {{row.Estado}} </td> --> <td ng-class=\"{'color-yellow':(row.Estado =='Incompleta'), \r" +
    "\n" +
    "                        'color-blue':(row.Estado=='Pendiente'),\r" +
    "\n" +
    "                        'color-green':(row.Estado=='Activa'),\r" +
    "\n" +
    "                        'color-red':(row.Estado=='Cancelada'),\r" +
    "\n" +
    "                        'color-orange':(row.Estado=='Suspendida')}\" width=\"6%\"> {{row.Estado}}</td> <!--\r" +
    "\n" +
    "                        <td>\r" +
    "\n" +
    "                          <i ng-class = \"{'fa fa-check-circle-o':(row.Estado =='Activa'), 'fa fa-check-circle-o': (row.Estado == 'Pendiente')}\"> \r" +
    "\n" +
    "                          </i> {{row.Estado}}                          \r" +
    "\n" +
    "                        </td> --> <td width=\"5.5%\"> {{row.Beam}}</td> <td> {{row.SatellitedID}}</td> <td class=\"media\">{{row.PlanServ}}</td> <td class=\"media\">{{row.ESN}}</td> <td width=\"5.5%\">{{row.IdSuscriptor}}</td> <td>{{row.EstadoFap}}</td> <td class=\"media\">{{row.Ipv4}}</td> <td class=\"media\">{{row.Ipv6}}</td> <td>{{row.AssocTime}}</td> <td class=\"media\">{{row.Latitud}}</td> <td class=\"media\">{{row.Longitud}}</td> <td>{{row.AvailTokens}}</td> <td>{{row.TxBytes}}</td> <td>{{row.RxBytes}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> </div> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\" ng-hide=\"$ctrl.divExportar\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> "
  );


  $templateCache.put('views/reportes/reportesgeneral.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th{font-size: 8.9pt;}\r" +
    "\n" +
    "  td {font-size: 8.66pt;}\r" +
    "\n" +
    "  td.media{font-size: 8.6pt;}\r" +
    "\n" +
    "  td.little{font-size: 8.2pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; \r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".conSinFap {\r" +
    "\n" +
    "  color: #CC3399; /*amarillo*/\r" +
    "\n" +
    "  font-size: 7.9pt\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>General</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th rowspan=\"2\" st-sort=\"SAN\">SAN</th> <th rowspan=\"2\" st-sort=\"ESN\">ESN</th> <th rowspan=\"2\" st-sort=\"PlanDeServicio\">Plan de <br>Servicio</th> <th rowspan=\"2\" st-sort=\"Beam\">Beam</th> <th colspan=\"2\" style=\"text-align: center\">Velocidad</th> <th rowspan=\"2\" st-sort=\"Suscriptor\">Suscriptor</th> <th rowspan=\"2\" st-sort=\"Referencia\">Referencia</th> <th rowspan=\"2\" st-sort=\"Estatus\">Estatus Comercial</th> <th rowspan=\"2\" st-sort=\"Latitud\">Latitud</th> <th rowspan=\"2\" st-sort=\"Longitud\">Longitud</th> <th rowspan=\"2\" st-sort=\"IpNateada\">Ip <br> Nateada</th> <th rowspan=\"2\" st-sort=\"Fap\">FAP</th> <th rowspan=\"2\" st-sort=\"FechaJovian\">Fecha JOVIAN</th> <th rowspan=\"2\" st-sort=\"Estado\">Estado</th> <th rowspan=\"2\" st-sort=\"Municipio\">Municipio</th> <th rowspan=\"2\" st-sort=\"Direccion\">Dirección</th> </tr> <!--<tr><th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th> </tr> --> <tr> <th st-sort=\"VelocidadBajada\">Bajada</th> <th st-sort=\"VelocidadSubida\">Subida </th> </tr> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanDeServicio\" placeholder=\"Plan Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"VelocidadBajada\" placeholder=\"Bajada\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"VelocidadSubida\" placeholder=\"Subida\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estatus\" placeholder=\"Estatus\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IpNateada\" placeholder=\"Ip\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Fap\" placeholder=\"FAP\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaJovian\" placeholder=\"Fecha\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estado\" placeholder=\"Estado\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Municipio\" placeholder=\"Municipio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Dirección\" placeholder=\"Dirección\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"5%\">{{row.SAN}}</td> <td>{{row.ESN}}</td> <td>{{row.PlanDeServicio}}</td> <td>{{row.Beam}}</td> <td width=\"3%\">{{row.VelocidadBajada}}</td> <td width=\"3%\">{{row.VelocidadSubida}}</td> <td>{{row.Suscriptor}}</td> <td class=\"media\">{{row.Referencia}}</td> <td width=\"5%\" class=\"little\">{{row.Estatus}}</td> <td class=\"media\">{{row.Latitud}}</td> <td class=\"media\">{{row.Longitud}}</td> <td class=\"media\">{{row.IpNateada}}</td> <td ng-class=\"{'conSinFap':(row.Fap =='ILIMITADO'), \r" +
    "\n" +
    "                        'color-blue':(row.Fap=='Pendiente')}\"> {{row.Fap}}</td> <td>{{row.FechaJovian}}</td> <td>{{row.Estado}}</td> <td class=\"media\">{{row.Municipio}}</td> <td>{{row.Direccion}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesgeneralPlataforma.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th{font-size: 9pt;}\r" +
    "\n" +
    "  td {font-size: 8.9pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; \r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    ".tituloBold {\r" +
    "\n" +
    "  font-weight: bold;\r" +
    "\n" +
    "  text-align: left;\r" +
    "\n" +
    "}\r" +
    "\n" +
    ".tituloBoldRight\r" +
    "\n" +
    "{\r" +
    "\n" +
    "  font-weight: bold;\r" +
    "\n" +
    "  text-align: right;\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>General por Plataforma</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"col-md-10 col-md-offset-1 panel form-element-padding\" style=\"margin-top:-20px\"> <div style=\"overflow: auto; max-height:550px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead fix-head> <tr> <th st-sort=\"Plataforma\">Plataforma</th> <th st-sort=\"PlanDeServicio\">Plan de Servicio</th> <th colspan=\"3\" style=\"text-align: center\"> Status de Servicios </th> <th style=\"text-align: center\" st-sort=\"Total\">Total</th> <th style=\"text-align: center\" st-sort=\"TokensProv\">Tokens Provisión</th> </tr> <tr> <th> <input st-search=\"Plataforma\" placeholder=\"Plataforma\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanDeServicio\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th style=\"text-align: right\" st-sort=\"Activos\">Activos</th> <th style=\"text-align: right\" st-sort=\"Suspendidos\">Suspendidos</th> <th style=\"text-align: right\" st-sort=\"PorInstalar\">Por Instalar</th> <th> <input st-search=\"Total\" placeholder=\"Total\" class=\"input-sm form-control\" type=\"search\" style=\"text-align:center\"> </th> <th> <input st-search=\"TokensProv\" placeholder=\"Tokens Provisión\" class=\"input-sm form-control\" type=\"search\" style=\"text-align:center\"> </th> </tr> </thead> <tbody> <tr ng-repeat=\"row in $ctrl.displayedCollection4\"> <td>{{row.Plataforma}}</td> <td ng-class=\"{'tituloBold':(row.PlanDeServicio =='CON FAP' \r" +
    "\n" +
    "                  || row.PlanDeServicio =='SIN FAP'), \r" +
    "\n" +
    "                  'tituloBoldRight':( row.PlanDeServicio =='TOTAL ESTATUS CON FAP'\r" +
    "\n" +
    "                  || row.PlanDeServicio =='TOTAL ESTATUS SIN FAP' \r" +
    "\n" +
    "                  || row.PlanDeServicio =='TOTAL ESTATUS GENERAL'\r" +
    "\n" +
    "                  || row.PlanDeServicio =='TOTAL SUMA RESIDENCIALES, EMPRESARIALES SIN FAP')\r" +
    "\n" +
    "                  }\"> {{row.PlanDeServicio}}</td> <td style=\"text-align: right\">{{row.Activos}}</td> <td style=\"text-align: right\">{{row.Suspendidos}}</td> <td style=\"text-align: right\">{{row.PorInstalar}}</td> <td style=\"text-align: right\">{{row.Total}}</td> <td style=\"text-align: right\">{{row.TokensProv}}</td> </tr> </tbody> </table> </div> </div> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\" ng-hide=\"$ctrl.divExportar\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> "
  );


  $templateCache.put('views/reportes/reportesmigraciones.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th{font-size: 10pt;}\r" +
    "\n" +
    "  td {font-size: 10pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; \r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Migraciones</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteMigra()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN</th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"Satellite\">Satellite</th> <th st-sort=\"PlanInicial\">Plan Inicial </th> <th st-sort=\"PlanFinal\">Plan Final</th> <th st-sort=\"FechaMigracion\">Fecha Migración</th> <th st-sort=\"ESN\">ESN </th> <th st-sort=\"Latitud\">Latitud</th> <th st-sort=\"Longitud\">Longitud</th> <th st-sort=\"Usuario\">Usuario</th> </tr> <!--<tr><th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th> </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanInicial\" placeholder=\"Plan Inicial\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanFinal\" placeholder=\"Plan Final\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaMigracion\" placeholder=\"Fecha Migración\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Usuario\" placeholder=\"Usuario\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"7%\">{{row.SAN}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Beam}}</td> <td>{{row.SatellitedId}}</td> <td>{{row.PlanInicial}}</td> <td>{{row.PlanFinal}}</td> <td>{{row.FechaMigracion}}</td> <td>{{row.ESN}}</td> <td>{{row.Latitud}}</td> <td>{{row.Longitud}}</td> <td>{{row.Usuario}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesmovimientos.html',
    "<style type=\"text/css\">.myGrid {\r" +
    "\n" +
    "    width: 500px;\r" +
    "\n" +
    "    height: 250px;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "  th {\r" +
    "\n" +
    "    font-size: 10pt;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td {\r" +
    "\n" +
    "    font-size: 9.8pt;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #008b45;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv:hover {\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #fff;\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf:hover {\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color: #fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Movimientos</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteMovimientos()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"SatellitedID\">Satellite</th> <th st-sort=\"Usuario\">Usuario</th> <th st-sort=\"FechaMovim\">Fecha <br>Movimiento </th> <th st-sort=\"ESN\">ESN</th> <th st-sort=\"Movimiento\">Movimiento </th> <th st-sort=\"Mensaje\">Mensaje </th> </tr> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Usuario\" placeholder=\"Usuario\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaMovim\" placeholder=\"Fecha Movimiento\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Movimiento\" placeholder=\"Movimiento\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Mensaje\" placeholder=\"Mensaje\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"6%\">{{row.SAN}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Beam}}</td> <td>{{row.SatellitedID}}</td> <td>{{row.Usuario}}</td> <td>{{row.FechaMovim}}</td> <td>{{row.ESN}}</td> <td>{{row.Movimiento}}</td> <td width=\"30%\">{{row.Mensaje}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportesplanta.html',
    "<style type=\"text/css\">th{font-size: 9.7pt;}\r" +
    "\n" +
    "  td {font-size: 9.1pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  td.media{font-size: 8.7pt;}\r" +
    "\n" +
    "  th.mediaTh{font-size: 9.4pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  input.media{font-size: 8.6pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Planta</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-5\"> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i> Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th rowspan=\"2\" st-sort=\"SAN\"> SAN </th> <th rowspan=\"2\" st-sort=\"IdSuscriptor\" class=\"mediaTh\">Id <br>Suscriptor </th> <th rowspan=\"2\" st-sort=\"Suscriptor\">Suscriptor</th> <th rowspan=\"2\" st-sort=\"Referencia\">Referencia</th> <th rowspan=\"2\" st-sort=\"PlanDeServicio\" class=\"mediaTh\">Plan de Servicio</th> <th rowspan=\"2\" st-sort=\"Beam\">Beam</th> <th rowspan=\"2\" st-sort=\"SatellitedID\">Satellite</th> <th rowspan=\"2\" st-sort=\"ESN\">ESN</th> <th rowspan=\"2\" st-sort=\"Estatus\">Est. Comercial</th> <th rowspan=\"2\" st-sort=\"EstTecnico\">Est. FAP</th> <th rowspan=\"2\" st-sort=\"Latitud\">Latitud</th> <th rowspan=\"2\" st-sort=\"Longitud\">Longitud</th> <th rowspan=\"2\" st-sort=\"FechaAlta\" class=\"mediaTh\"> Fecha Alta</th> <th rowspan=\"2\" st-sort=\"FechaActivacion\" class=\"mediaTh\">Fecha Activación</th> <th rowspan=\"2\" st-sort=\"FechaSuspension\" class=\"mediaTh\"> Fecha Suspensión</th> <th rowspan=\"2\" st-sort=\"FechaCancelacion\" class=\"mediaTh\"> Fecha Cancelación</th> <th rowspan=\"2\" st-sort=\"consumoAnytime\">Consumo Anytime (Gb)</th> <th rowspan=\"2\" st-sort=\"consumoBonus\">Consumo Bonus (Gb)</th> <th rowspan=\"2\" st-sort=\"TokenDisp\">Token Disp (Gb)</th> </tr> <tr> </tr>  <!--<tr>\r" +
    "\n" +
    "                  <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "                </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"IdSuscriptor\" placeholder=\"Id Suscriptor\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Referencia\" placeholder=\"Referencia\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"PlanDeServicio\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Estatus\" placeholder=\"Estatus\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"EstTecnico\" placeholder=\"Est. Fap\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaAlta\" placeholder=\"Fecha Alta\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"FechaActivacion\" placeholder=\"Fecha Activacion\" class=\"input-sm form-control media\" type=\"search\"> </th><th> <input st-search=\"FechaSuspension\" placeholder=\"Fecha Suspension\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"FechaCancelacion\" placeholder=\"Fecha Cancelacion\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"consumoAnytime\" placeholder=\"Consumo Anytime\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"consumoBonus\" placeholder=\"Consumo Bonus\" class=\"input-sm form-control media\" type=\"search\"> </th> <th> <input st-search=\"TokenDisp\" placeholder=\"Token Disp\" class=\"input-sm form-control media\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"4%\">{{row.SAN}}</td> <td width=\"5.4%\">{{row.IdSuscriptor}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.Referencia}}</td> <td class=\"media\">{{row.PlanDeServicio}}</td> <td width=\"5.3%\">{{row.Beam}}</td> <td>{{row.SatellitedID}}</td> <td class=\"media\">{{row.ESN}}</td> <td>{{row.Estatus}}</td> <td>{{row.EstTecnico}}</td> <td class=\"media\">{{row.Latitud}}</td> <td class=\"media\">{{row.Longitud}}</td> <td>{{row.FechaAlta}}</td> <td>{{row.FechaActivacion}}</td> <td>{{row.FechaSuspension}}</td> <td>{{row.FechaCancelacion}}</td> <td>{{row.ConsumoAnytime}}</td> <td>{{row.ConsumoBonus}}</td> <td>{{row.TokenDisp}}</td> </tr>  </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );


  $templateCache.put('views/reportes/reportestokens.html',
    "<style type=\"text/css\">th{font-size: 9.8pt;}\r" +
    "\n" +
    "  td {font-size: 9.7pt;}\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-csv {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #008b45;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#008b45; /*font-size: 13px;*/\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    "  .btn-pdf {\r" +
    "\n" +
    "    background-color: #fff;\r" +
    "\n" +
    "    border-color: #8B0000;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#8B0000;\r" +
    "\n" +
    "\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-csv:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #008b45;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "}\r" +
    "\n" +
    "\r" +
    "\n" +
    ".btn-pdf:hover\r" +
    "\n" +
    "{\r" +
    "\n" +
    "    background-color: #8B0000;\r" +
    "\n" +
    "    border-color: #fff;\r" +
    "\n" +
    "    font-size: 11.5px;\r" +
    "\n" +
    "    color:#fff;\r" +
    "\n" +
    "\r" +
    "\n" +
    "}</style> <div id=\"pdfreportimages\" style=\"display:none\"> <img crossorigin=\"\" src=\"images/StarGoPng.png\" id=\"pdflogoimage\"> </div> <div class=\"card\" style=\"margin-top:20px;padding-bottom: 30px\"> <div class=\"card-head style-default-light\" style=\"padding-top:10px; padding-left:10px\"> <header> <strong style=\"font-weight:bold; border:none; margin-left:10px\">Reportes</strong> <br><small class=\"text-muted\" style=\"font-size:14px; margin-left:10px\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> Reportes>Tokens</small> </header> <div class=\"tools\"> </div> </div> <div class=\"section-body\"> <div class=\"col-md-12\"> <div class=\"panel-heading\"> <div class=\"tools\"> <div class=\"panel-group\" id=\"suscriptor\"> <div class=\"row\"> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Inicio: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaInicio\" type=\"date\"> </div> </div> <div class=\"col-md-3\"> <div style=\"float:left\" class=\"col-md-4\"> <label for=\"fechaInicio\">Fecha Fin: </label> </div> <div class=\"input-group\"> <input class=\"form-control\" ng-model=\"$ctrl.fechaFin\" type=\"date\"> </div> </div> <div class=\"col-md-5\"> <a class=\"btn btn-primary btn-sm\" ng-click=\"$ctrl.getReporteTokens()\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Buscar\"> <i class=\"fa fa-search\"></i> Buscar</a> <a class=\"btn btn-info btn-sm\" ng-click=\"$ctrl.limpiarFiltros();\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Limpiar filtros\"> <i class=\"fa fa-eraser\"></i>Limpiar </a> </div> </div> <!--end .panel --> </div> </div> </div> <div class=\"panel form-element-padding\" style=\"margin-top:-20px\"> <table st-table=\"$ctrl.displayedCollection4\" st-safe-src=\"$ctrl.rowCollection4\" class=\"table table-striped\" st-filtered-collection=\"$ctrl.filteredCollection\"> <thead> <tr> <th st-sort=\"SAN\">SAN </th> <th st-sort=\"Beam\">Beam</th> <th st-sort=\"SatellitedID\">Satellite</th> <th st-sort=\"Suscriptor\">Suscriptor</th> <th st-sort=\"PlanServ\">Plan de Servicio</th> <th st-sort=\"ESN\">ESN</th> <th st-sort=\"Detalle1\">Token (MB)</th> <th st-sort=\"FechaIngreso\">Fecha Ingreso Token </th> <th st-sort=\"Latitud\">Latitud</th> <th st-sort=\"Longitud\">Longitud</th> <th st-sort=\"FechaAlta\">Fecha Alta</th> <th st-sort=\"Usuario\">Usuario</th> </tr> <!--<tr>\r" +
    "\n" +
    "                  <th colspan=\"5\"><input st-search=\"\" class=\"form-control\" placeholder=\"global search ...\" type=\"text\"/></th>\r" +
    "\n" +
    "                </tr> --> <tr> <th> <input st-search=\"SAN\" placeholder=\"SAN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Beam\" placeholder=\"Beam\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"SatellitedID\" placeholder=\"Satellite\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Suscriptor\" placeholder=\"Suscriptor\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"PlanServ\" placeholder=\"Plan de Servicio\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"ESN\" placeholder=\"ESN\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Detalle1\" placeholder=\"Token (MB)\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaIngreso\" placeholder=\"Fecha Ingreso\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Latitud\" placeholder=\"Latitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Longitud\" placeholder=\"Longitud\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"FechaAlta\" placeholder=\"Fecha Alta\" class=\"input-sm form-control\" type=\"search\"> </th> <th> <input st-search=\"Usuario\" placeholder=\"Usuario\" class=\"input-sm form-control\" type=\"search\"> </th> </tr> </thead><!-- <td>{{row.SAN | uppercase}}</td> --> <tbody> <tr dir-paginate=\"row in $ctrl.displayedCollection4|orderBy:sortKey:reverse|itemsPerPage:5\"> <td width=\"5%\">{{row.SAN}}</td> <td>{{row.Beam}}</td> <td>{{row.SatellitedID}}</td> <td>{{row.Suscriptor}}</td> <td>{{row.PlanServ}}</td> <td>{{row.ESN}}</td> <td>{{row.Detalle1}}</td> <td>{{row.FechaIngreso}}</td> <td>{{row.Latitud}}</td> <td>{{row.Longitud}}</td> <td>{{row.FechaAlta}}</td> <td>{{row.Usuario}}</td> </tr> </tbody> <tfoot> <tr> <td colspan=\"18\" class=\"text-left\"> <dir-pagination-controls max-size=\"5\" direction-links=\"true\" boundary-links=\"true\"> </dir-pagination-controls> </td> </tr> </tfoot> </table> <div class=\"col-md-8 col-md-offset-2\" style=\"margin-bottom: 20px\" align=\"center\"> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-click=\"$ctrl.crearVisibleAsCsv()\" style=\"white-space: normal\"> Exportar datos visibles como CSV  </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-csv btn-sm\" ng-hide=\"$ctrl.todoAsCsv\" ng-click=\"$ctrl.crearTodoAsCsv()\" style=\"white-space: normal\"> Exportar todo <br> como CSV </button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('visible')\" style=\"white-space: normal\">Exportar datos visibles como pdf</button> </div> <div class=\"col-sm-3\"> <button class=\"btn btn-pdf btn-sm\" ng-click=\"$ctrl.createPdfTodo('todo')\" style=\"white-space: normal\">Exportar todo <br> como pdf </button> </div> </div> <button class=\"btn btn-default\" id=\"csvUno\" ng-hide=\"$ctrl.csvUnoHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> <button class=\"btn btn-default\" id=\"csvDos\" ng-hide=\"$ctrl.csvDosHide\" csv-column-order=\"$ctrl.order\" ng-csv=\"$ctrl.arrayReporte\" filename=\"{{ $ctrl.filename }}.csv\" field-separator=\",\" decimal-separator=\".\" add-bom=\"true\"> esconder botón visible data as csv</button> <!--csv-column-order=\"$ctrl.order\"  --> </div> </div> </div> </div>"
  );

}]);
