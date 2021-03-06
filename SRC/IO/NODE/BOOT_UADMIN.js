/**
 * boot UADMIN.
 */
global.BOOT_UADMIN = METHOD({

	run : function(UPPERCASE_IO_PATH) {
		'use strict';
		//REQUIRED: UPPERCASE_IO_PATH

		var
		// session db
		sessionDB = SHARED_DB('sessionDB'),
		
		// model map
		modelMap = {},
		
		// model name map
		modelNameMap = {},
		
		// uri matcher
		uriMatcher = URI_MATCHER('__/{boxName}/{modelName}/{method}'),
		
		// UADMIN server
		uadminServer;
		
		UADMIN_CONFIG.init(function(box, model) {
			
			var
			// models
			models = modelMap[box.boxName],
			
			// name
			name = model.getName();
			
			if (models === undefined) {
				models = modelMap[box.boxName] = {};
				modelNameMap[box.boxName] = [];
			}
			
			models[name] = model;
			modelNameMap[box.boxName].push(name);
		});
		
		uadminServer = RESOURCE_SERVER({

			port : UADMIN_CONFIG.port,
			
			rootPath : UPPERCASE_IO_PATH + '/UADMIN',

			version : CONFIG.version
		}, {

			requestListener : function(requestInfo, _response, onDisconnected, replaceRootPath, next) {
				
				var
				// uri
				uri = requestInfo.uri,
				
				// session key
				sessionKey = requestInfo.cookies.__SESSION_KEY,
	
				// session
				session,
				
				// password
				password,
				
				// match info
				matchInfo,
				
				// uri params
				uriParams,
				
				// models
				models,
				
				// model
				model,
				
				// valid data set
				validDataSet,
				
				// response.
				response = function(content) {
					_response({
						content : content,
						headers : sessionKey !== undefined ? undefined : {
							'Set-Cookie' : CREATE_COOKIE_STR_ARRAY({
								__SESSION_KEY : RANDOM_STR(40)
							})
						}
					});
				};
				
				if (uri === '__LOGIN') {
					
					if (sessionKey !== undefined && requestInfo.data.password === UADMIN_CONFIG.password) {
						sessionDB.save({
							id : sessionKey,
							data : {
								password : requestInfo.data.password
							},
							removeAfterSeconds : 30 * 60 // 30 minutes
						});
						response('true');
					} else {
						response('false');
					}
					
					return false;
				}
				
				if (uri === '__LOGOUT') {
					
					if (sessionKey !== undefined) {
						sessionDB.remove(sessionKey);
					}
					
					response('true');
					
					return false;
				}
					
				// serve web server port.
				if (uri === '__WEB_SERVER_PORT') {
					
					response(CONFIG.webServerPort);
					
					return false;
				}
				
				// serve UPPERCASE.IO-BROWSER-PACK.
				if (uri.indexOf('UPPERCASE.IO-BROWSER-PACK/') === 0) {
					replaceRootPath(UPPERCASE_IO_PATH);
				}
				
				if (sessionKey !== undefined) {
					session = sessionDB.get(sessionKey);
					if (session !== undefined) {
						password = session.password;
					}
				}
				
				if (password !== UADMIN_CONFIG.password) {
					
					// serve login page.
					if (uri === '') {
						
						READ_FILE(UPPERCASE_IO_PATH + '/UADMIN/login.html', function(content) {
							response(content.toString());
						});
						
						return false;
					}
					
				} else {
					
					// serve model naem map.
					if (uri === '__MODEL_NAME_MAP') {
						
						response(STRINGIFY(modelNameMap));
						
						return false;
					}
					
					matchInfo = uriMatcher.check(uri);
					
					// serve model funcs.
					if (matchInfo.checkIsMatched() === true) {
						
						uriParams = matchInfo.getURIParams();
						
						models = modelMap[uriParams.boxName];
						
						if (models !== undefined) {
							
							model = models[uriParams.modelName];
							
							if (model !== undefined) {
								
								if (uriParams.method === '__GET_CREATE_VALID_DATA_SET') {
									
									if (model.getCreateValid() === undefined) {
										
										response('');
										
									} else {
										
										validDataSet = model.getCreateValid().getValidDataSet();
										
										EACH(model.getInitData(), function(notUsing, name) {
											delete validDataSet[name];
										});
										
										response(STRINGIFY(validDataSet));
									}
								}
								
								else if (uriParams.method === '__GET_UPDATE_VALID_DATA_SET') {
									
									if (model.getUpdateValid() === undefined) {
										
										response('');
										
									} else {
										
										validDataSet = model.getUpdateValid().getValidDataSet();
										
										EACH(model.getInitData(), function(notUsing, name) {
											delete validDataSet[name];
										});
										
										response(STRINGIFY(validDataSet));
									}
								}
								
								else if (uriParams.method === 'create' && model.create !== undefined) {
								
									model.create(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										notValid : function(validErrors) {
											response(STRINGIFY({
												validErrors : validErrors
											}));
										},
										success : function(savedData) {
											response(STRINGIFY({
												savedData : savedData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'get' && model.get !== undefined) {
								
									model.get(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(savedData) {
											response(STRINGIFY({
												savedData : savedData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'update' && model.update !== undefined) {
								
									model.update(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										notValid : function(validErrors) {
											response(STRINGIFY({
												validErrors : validErrors
											}));
										},
										success : function(savedData, originData) {
											response(STRINGIFY({
												savedData : savedData,
												originData: originData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'remove' && model.remove !== undefined) {
								
									model.remove(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(originData) {
											response(STRINGIFY({
												originData: originData
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'find' && model.find !== undefined) {
								
									model.find(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(savedDataSet) {
											response(STRINGIFY({
												savedDataSet : savedDataSet
											}));
										}
									});
									
									return false;
								}
								
								else if (uriParams.method === 'count' && model.count !== undefined) {
								
									model.count(requestInfo.data, {
										error : function(errorMsg) {
											response(STRINGIFY({
												errorMsg : errorMsg
											}));
										},
										success : function(count) {
											response(STRINGIFY({
												count : count
											}));
										}
									});
									
									return false;
								}
							}
						}
					}
				}
			},
			
			notExistsResource : function(resourcePath, requestInfo, response) {
				
				var
				// session key
				sessionKey = requestInfo.cookies.__SESSION_KEY,
				
				// session
				session,
				
				// password
				password;
				
				if (sessionKey !== undefined) {
					session = sessionDB.get(sessionKey);
					if (session !== undefined) {
						password = session.password;
					}
				}
				
				if (password !== UADMIN_CONFIG.password) {
					
					READ_FILE(UPPERCASE_IO_PATH + '/UADMIN/login.html', function(content) {
						response(content.toString());
					});
					
				} else {
				
					READ_FILE(UPPERCASE_IO_PATH + '/UADMIN/index.html', function(content) {
						response(content.toString());
					});
				}
				
				return false;
			}
		});
		
		console.log('[UPPERCASE.IO] UADMIN Tool BOOTed! => http://localhost:' + UADMIN_CONFIG.port);
	}
});
