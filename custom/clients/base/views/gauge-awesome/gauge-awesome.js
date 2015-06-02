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
    plugins: ['Dashlet'],
        
    initDashlet: function () {		
		this.gaugeMaxfield = this.settings.get("gaugeMax") || "";
		this.settings.set("gaugeMax", this.gaugeMaxfield);
		if (isNaN(this.model.get(this.gaugeMaxfield)))
			this.gaugeMax = 10;
		else {
			this.gaugeMax = parseInt(this.model.get(this.gaugeMaxfield));
			if (isNaN(this.gaugeMax)) this.gaugeMax=0;
		}
		this.gaugeValuefield = this.settings.get("gaugeValue") || "";
		this.settings.set("gaugeValue", this.gaugeValuefield);
		if (isNaN(this.model.get(this.gaugeValuefield)))
			this.gaugeValue = 4;
		else {
			this.gaugeValue = parseInt(this.model.get(this.gaugeValuefield));
			if (isNaN(this.gaugeValue)) this.gaugeValue=0;
		}
		this.gaugeTitle = this.settings.get("gaugeTitle") || "";
		this.settings.set("gaugeTitle", this.gaugeTitle);
		
		this.gaugeNbRanges = this.settings.get("gaugeNbRanges") || 4;
		this.settings.set("gaugeNbRanges", this.gaugeNbRanges);
		if (isNaN(this.gaugeNbRanges)) this.gaugeNbRanges = 4;
		
		this.gaugeRangesNames = this.settings.get("gaugeRangesNames") || 'Range 1,Range 2,Range 3,Range 4';
		this.settings.set("gaugeRangesNames", this.gaugeRangesNames);

		this.model.on('change:'+this.gaugeValuefield, this.loadData, this);
		this.model.on('change:'+this.gaugeMaxfield, this.loadData, this);

		/*
		console.log('this.gaugeMaxfield='+this.gaugeMaxfield);
		console.log('this.gaugeMax='+this.gaugeMax);
		console.log('this.GaugeValuefield='+this.gaugeValuefield);
		console.log('this.GaugeValue='+this.gaugeValue);
		console.log('this.gaugeNbRanges='+this.gaugeNbRanges);
		console.log('this.gaugeRangesNames='+this.gaugeRangesNames);
		*/
    },
        
    loadData: function (options) {

		this.gaugeMax = (isNaN(this.model.get(this.gaugeMaxfield))) ? this.gaugeMax : this.model.get(this.gaugeMaxfield);
		this.gaugeValue = (isNaN(this.model.get(this.gaugeValuefield))) ? this.gaugeValue : this.model.get(this.gaugeValuefield);
		
		var chartData = {};
		chartData.properties = {};
		chartData.properties.title = this.gaugeTitle;
		chartData.properties.values = [];
		chartData.properties.values[0] = {};
		chartData.properties.values[0].group = 1;
		chartData.properties.values[0].t = this.gaugeValue;

		chartData.data = [];
		var ranges = this.gaugeRangesNames.split(',');
		for (var i=0; i < this.gaugeNbRanges; i++) {
			chartData.data[i] = {};
			chartData.data[i].key = (i >= ranges.length) ? '' : ranges[i].trim();
			if (chartData.data[i].key=='') chartData.data[i].key = ' ';
			//chartData.data[i].y   = (i == this.gaugeNbRanges - 1) ? this.gaugeNbRanges : Math.round( this.gaugeMax / this.gaugeNbRanges) * (i+1);
			//chartData.data[i].y   = Math.round( this.gaugeMax / this.gaugeNbRanges) * (i+1);
			chartData.data[i].y   =  this.gaugeMax / this.gaugeNbRanges * (i+1);
			//console.log('chartData.data[i].y='+chartData.data[i].y);
		}
		this.chartData = chartData;
		this.render();
	},
	
    _renderHtml: function() {
        this._super('_renderHtml');

		var showPointer = 1;
		var direction = 'ltr';
		var color = 'default';
		var self = this;
		var chart;
		var data = this.chartData;
		
		if (this.sugar_version_greater(7,5)) { // 7.6
			var chart = nv.models.gaugeChart()
				  .x(function(d) { return d.key; })
				  .y(function(d) { return d.y; })
				  .showLabels(true)
				  .showTitle(true)
				  .showPointer(showPointer)
				  .direction(direction)
				  .ringWidth(50)
				  .maxValue(this.gaugeMax)
				  .transitionMs(4000);

			d3.select('#gauge1_'+self.cid)
				.on('click', chart.dispatch.chartClick);

			colorLength = data.data.length;
			chart
			  .colorData(color, {c1: '#e8e2ca', c2: '#3e6c0a', l: colorLength});
			d3.select('#gauge1_'+this.cid+' svg')
				.datum(data)
				.call(chart);
			nv.utils.windowResize(chart.update);
		}
		else { // 7.5
			chart = nv.models.gaugeChart()
				  .x(function(d) { return d.key; })
				  .y(function(d) { return d.y; })
				  .showLabels(true)
				  .showTitle(true)
				  .colorData('default')
				  .ringWidth(50)
				  .maxValue(this.gaugeMax)
				  .transitionMs(4000);

			d3.select('#gauge1_'+this.cid+' svg')
				.datum(data)
				.call(chart);
			nv.utils.windowResize(chart.update);
		}
    },
    
    sugar_version: function() {
		return (app.metadata.getServerInfo().version.split('.'));
	},
	
    sugar_version_greater: function(v1,v2) {
		// return true if current sugar version x1.x2 is greater than v1.v2
		var x = app.metadata.getServerInfo().version.split('.');
		if (parseInt(x[0]) > v1) return true;
		if ((parseInt(x[0]) == v1)&&(parseInt(x[1]) > v2)) return true;
		return false;
	}
	
    
    

    
})
