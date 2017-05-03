var dbackpacker = angular.module("dbackpacker",[]);

dbackpacker.controller("itemController", function($scope) {
    $scope.items = [];

    $scope.updateItemTable = function() {
        item = {name:$scope.itemnameInput, weight:$scope.weightInput, value:$scope.valueInput};
        $scope.items.push(item);
        $scope.itemnameInput = $scope.weightInput = $scope.valueInput = undefined;
        document.getElementById("itemnameInput").placeholder = "Gegenstandname..";
        document.getElementById("weightInput").placeholder = "Gewicht (kg)..";
        document.getElementById("valueInput").placeholder = "Wert (€)..";
    };
});