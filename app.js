var ppoutreach = angular.module('ppoutreach', ['ngRoute','ui.bootstrap']);

ppoutreach.config(function($routeProvider) {
	$routeProvider
			
			.when('/', {
				templateUrl : 'login.html',
				controller  : 'mainController'
			})
			
			.when('/user/profile', {
				templateUrl : 'profile.html',
				controller  : 'profileController'
			})
			
			.when('/user/datasets', {
				templateUrl : 'datasets.html',
				controller  : 'datasetsController'
			})
			
			.when('/user/analysis', {
				templateUrl : 'analysis.html',
				controller  : 'analysisController'
			})
			
			.when('/user/reports', {
				templateUrl : 'reports.html',
				controller	: 'reportsController'
			});
});

ppoutreach.controller('mainController', function($scope) {
		
	$scope.data = {
        fields: [
            { key:"Username", val: "tomstevo" },
            { key:"Firstname", val: "Tom" },
            { key:"Surname", val: "Stevenson"},
            { key:"School", val: "pprc"},
            { key:"Email", val: "email"},
        ],
        progress: 6
    }; 
    
});

ppoutreach.controller('profileController', function($scope, $http) {

	$scope.data = {
        fields: [
            { key:"Username", val: "tomstevo" },
            { key:"Firstname", val: "Tom" },
            { key:"Surname", val: "Stevenson"},
            { key:"School", val: "pprc"},
            { key:"Email", val: "email"},
        ],
        progress: 6
    };

});

ppoutreach.controller('datasetsController', function($scope, $http) {

	$http.get('data/expData.json').success(function(data) {
      	$scope.dataSel = data;
    });
});

ppoutreach.controller('analysisController', function($scope) {
		$scope.message = 'This is where the histograms go.';
});

ppoutreach.controller('reportsController', function($scope, $sce) {
	$scope.tabs = [
    	{ title:'Abstract', content:'<div style=\"width: 95%\"><textarea id="textareaEdit" ng-model="textareaValue" placeholder="Abstract"></textarea></div>'},
    	{ title:'Introduction', content:'<div style=\"width: 95%\"><textarea id="textareaEdit" ng-model="textareaValue" placeholder="Introduction"></textarea></div>'},
    	{ title:'Method', content:'<div style=\"width: 95%\"><textarea id="textareaEdit" ng-model="textareaValue" placeholder="Method"></textarea></div>'},
    	{ title:'Results', content:'<div style=\"width: 95%\"><textarea id="textareaEdit" ng-model="textareaValue" placeholder="Results"></textarea></div>'},
    	{ title:'Conclusion', content:'<div style=\"width: 95%\"><textarea id="textareaEdit" ng-model="textareaValue" placeholder="Conclusions"></textarea></div>'}
  	];
  	
  	$scope.to_trusted = function(html_code) {
    	return $sce.trustAsHtml(html_code);
	};
});

ppoutreach.directive('chart', function($http) {
        return {
          restrict: 'A',
          link: function($scope, $elm, $attr) {
            // Create the data table.
            $http.get('data/expData.json').success(function(data) {
            
            	var dataHist = new google.visualization.DataTable();
        		dataHist.addColumn('string', 'value');
        		dataHist.addColumn('number', 'Mgg');
        		$scope.dataNew = [];
        		angular.forEach(data, function(value) {
        			$scope.dataNew.push(["Mgg",value]);
        			//console.log(value.pt);
     			});
     			dataHist.addRows($scope.dataNew);
     			
     			// Set chart options
            	/*var options = {'title':'Dinosaur Lengths',
          				legend: { position: 'none' },
                        'width':700,
                        'height':500};*/
				var dashboard = new google.visualization.Dashboard(
            		document.getElementById('dashboard_div'));
            	
            	var lengthRangeSlider = new google.visualization.ControlWrapper({
          			'controlType': 'NumberRangeFilter',
          			'containerId': 'filter_div',
          			'options': {
            			'filterColumnLabel': 'Mgg',
            			'ui': {'ticks' : 10}
          			}
        			});
			
				var Chart = new google.visualization.ChartWrapper({
          			'chartType': 'Histogram',
          			'containerId': 'chart_div',
          			'options': {
            		'width': 600,
            		'height': 400
          			}
        		});

				dashboard.bind(lengthRangeSlider, Chart);
				dashboard.draw(dataHist);

           	 // Instantiate and draw our chart, passing in some options.
            /*var chart = new google.visualization.Histogram($elm[0]);
            chart.draw(dataHist, options);*/
            });
            
          }
      }
});

var ButtonsCtrl = function ($scope) {

  $scope.radioModel = 'Remove';

};

var LoginButtonsCtrl = function ($scope) {

};