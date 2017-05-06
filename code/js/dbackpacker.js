var dbackpacker = angular.module("dbackpacker", []);
const remote = require("electron").remote;
const path = require("path")
const url = require("url")

dbackpacker.run(function($rootScope) {
    $rootScope.items = JSON.parse(sessionStorage.getItem('key'));
    if($rootScope.items===null) {
        $rootScope.items = [];
    }
});

dbackpacker.controller("packerController", function($scope) {
    $scope.pack = function() {
        sessionStorage.setItem('key', JSON.stringify($scope.items));
        var window = remote.getCurrentWindow();
        window.loadURL(url.format({
            pathname: path.join(__dirname, "packedBackpack.html"),
            protocol: "file:",
            slashes: true
        }));
    };
});

dbackpacker.controller("itemController", function ($scope) {
    $scope.updateItemTable = function () {
        item = { name: $scope.itemnameInput, weight: $scope.weightInput, value: $scope.valueInput };
        $scope.items.push(item);
        $scope.itemnameInput = $scope.weightInput = $scope.valueInput = undefined;
        document.getElementById("itemnameInput").placeholder = "Gegenstandname..";
        document.getElementById("weightInput").placeholder = "Gewicht (kg)..";
        document.getElementById("valueInput").placeholder = "Wert (€)..";
    };
});

dbackpacker.controller("menuController", function ($scope) {

    $scope.resetAll = function () {
        $scope.items.splice(0,$scope.items.length);
        /*document.getElementById("itemnameInput").placeholder = "Gegenstandname..";
        document.getElementById("weightInput").placeholder = "Gewicht (kg)..";
        document.getElementById("valueInput").placeholder = "Wert (€)..";
        document.getElementById("maxWeightInput").placeholder = "Maximal Gewicht in kg";*/
    }

    $scope.options = function () {
        var window = remote.getCurrentWindow();
        window.loadURL(url.format({
            pathname: path.join(__dirname, "options.html"),
            protocol: "file:",
            slashes: true
        }));
    };

    $scope.exit = function () {
        var window = remote.getCurrentWindow();
        window.close();
    };
})

dbackpacker.controller("optionController", function ($scope) {
    $scope.backpacking = function () {
        var window = remote.getCurrentWindow();
        window.loadURL(url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        }));
    };
});