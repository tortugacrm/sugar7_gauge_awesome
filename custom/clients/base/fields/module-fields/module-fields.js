/*
 * This file is part of the 'Gauge Awesome Dashlet' module.
 * Copyright [2015/06/02] [Olivier Nepomiachty - SugarCRM]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Author: Olivier Nepomiachty SugarCRM
 */
({
    plugins: ['EllipsisInline'],
    initialize: function (options) {
		
        var serverInfo = app.metadata.getServerInfo();
        app.view.Field.prototype.initialize.call(this, options);
    },
    
    _render: function() {
        this._super('_render');

		var moduleName = this.context.attributes.module;
		var moduleFields = _.keys(app.metadata.getModule(moduleName).fields);
		var data = [];
		for (var i=0; i<moduleFields.length; i++) {
			var o = {};
			o.id = o.text = moduleFields[i];
			data.push(o);
		}
		//console.log(data);
		var fieldname = this.model.get(this.name) || '';
		var $field = this.$(this.fieldTag);
		$field.select2({
		  placeholder: fieldname,
		  data: data
		});
	}
    
})
