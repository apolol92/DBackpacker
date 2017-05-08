var dbackpacker = angular.module("dbackpacker", []);
const remote = require("electron").remote;
const path = require("path")
const url = require("url")

function maxValueOfItems(items) {
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
        sum += items[i].value;
    }
    return sum;
}

dbackpacker.run(function ($rootScope) {
    $rootScope.items = JSON.parse(sessionStorage.getItem('allItems'));
    if (sessionStorage.getItem('packing') == 1) {
        //angular.copy($rootScope.items, $rootScope.packedItems)
        maxValue = maxValueOfItems($rootScope.items);
        var DGeneticPacker = new genetic.GeneticPacker($rootScope.items, sessionStorage.getItem('maxWeight'), maxValue);
        DGeneticPacker.evolution(10, 1);
        $rootScope.packedItems = DGeneticPacker.getBestItemCombination();
    }
    if ($rootScope.items === null) {
        $rootScope.items = [];
    }
});

dbackpacker.controller("packerController", function ($scope) {
    $scope.pack = function () {
        sessionStorage.setItem("packing", 1);
        sessionStorage.setItem("maxWeight",$scope.maxWeightInput);
        sessionStorage.setItem('allItems', JSON.stringify($scope.items));
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
        $scope.items.splice(0, $scope.items.length);
        /*document.getElementById("itemnameInput").placeholder = "Gegenstandname..";
        document.getElementById("weightInput").placeholder = "Gewicht (kg)..";
        document.getElementById("valueInput").placeholder = "Wert (€)..";
        document.getElementById("maxWeightInput").placeholder = "Maximal Gewicht in kg";*/
    }

    $scope.exit = function () {
        var window = remote.getCurrentWindow();
        window.close();
    };
})

dbackpacker.controller("backController", function ($scope) {
    $scope.back = function () {
        var window = remote.getCurrentWindow();
        sessionStorage.setItem("packing", 0);
        window.loadURL(url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        }));
    };
});