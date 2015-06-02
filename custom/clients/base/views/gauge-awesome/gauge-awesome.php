<?php
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
 
if(!defined('sugarEntry'))define('sugarEntry', true);


$viewdefs['base']['view']['gauge-awesome'] = array(

    'dashlets' => array(
        array(
            'label' => 'Gauge Awesome',
            'description' => 'Bring an awesome gauge to the intelligence panel',
            
            'config' => array(
                'gaugeMax' => 'fmax_c',
                'gaugeValue' => 'fvalue_c',
                'gaugeTitle' => 'Gauge KPI chart',
                'gaugeNbRanges' => 4,
                'gaugeRangesNames' => 'Range 1,Range 2,Range 3,Range 4',
            ),
            'preview' => array(
                'gaugeMax' => 'fmax_c',
                'gaugeValue' => 'fvalue_c',
                'gaugeTitle' => 'Gauge KPI chart',
                'gaugeNbRanges' => 4,
                'gaugeRangesNames' => 'Range 1,Range 2,Range 3,Range 4',
            ),
            /*
            'filter' => array(
                'module' => array(
                ),
                'view' => array(
					'record', 
				),
            ),
            */
        ),
    ),
    
    'config' => array(
        'fields' => array(

            array(
                'name' => 'gaugeTitle',
                'label' => 'Title',
                'type' => 'string',
            ),

            array(
                'name' => 'gaugeValue',
                'label' => 'Field used for position of the needle',
                'type' => 'module-fields',
            ),

            array(
                'name' => 'gaugeMax',
                'label' => 'Field for the max value of the gauge',
                'type' => 'module-fields',
            ),

            array(
                'name' => 'gaugeNbRanges',
                'label' => 'Number of Ranges',
                'type' => 'Integer',
            ),

            array(
                'name' => 'gaugeRangesNames',
                'label' => 'Ranges names separated with comma',
                'type' => 'string',
            ),

		),
	),
    
);
