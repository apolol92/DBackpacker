class GeneticPacker {
    constructor(items, maxWeight, maxValue) {
        this.items = items;
        this.maxWeight = maxWeight;
        this.maxValue = maxValue;
        this.bestIndindivdiaul = [];
    }

    evolution(populationSize, maxEpochs) {
        var population = [];
        var indivdiaulSequenceLength = this.items.length;
        //Generate just bad individual
        for(var i = 0; i < indivdiaulSequenceLength; i++) {
            this.bestIndindivdiaul.push(0);
        }
        //Random Population init
        for (var i = 0; i < populationSize; i++) {
            population.push(this._generateRndIndivdiaul(indivdiaulSequenceLength));
        }
        for (var e = 0; e < maxEpochs; e++) {
            //Fitness-Sort DESC
            population = this._fitnessSort(population);
            //Kill all individuals with weight larger then maxWeight
            population = this._fatBurner(population);
            if(population.length>2) {
                population = [population[0],population[1]];
            }
            else if(population.length==1) {
                var tmp = [];
                for(var c = 0; c < population[0].length; c++) {
                    tmp.push(population[0][c]);
                }
                population.push(tmp);
            }
             //If apocalipse.. random repopulation..
            else {
                //Random Population init with size 2
                for (var i = 0; i < 2; i++) {
                    population.push(this._generateRndIndivdiaul(indivdiaulSequenceLength));
                }
            }
            //Only 2 individuals remained..
            //Get the best individual of all time..
            //alert(population[0] + " : " + this.bestIndindivdiaul);
            //alert(this._individualValue(population[0]) + ":" + this._individualValue(this.bestIndindivdiaul));
            if(this._individualValue(population[0])>this._individualValue(this.bestIndindivdiaul)) {
                var tmp = [];
                for(var c = 0; c < population[0].length; c++) {
                    tmp.push(population[0][c]);
                }
                this.bestIndindivdiaul = tmp;
            }            
            //Create (populationSize-2) childrens..
            for(var i = 0; i < populationSize-2; i++) {
                population.push(this._crossing(population[0],population[1]));
            }
            //Maybe some mutations..
            for(var i = 0; i < population.length; i++) {
                population[i] = this._mutation(population[i]);
            }
        }
    }

    _crossing(indivdiaul1, indivdiaul2) {
        var max = 1, min = 0;
        var child = [];
        for(var i = 0; i < indivdiaul1.length; i++) {
            var rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if(rndNum==0) {
                child.push(indivdiaul1[i]);
            }
            else {
                child.push(indivdiaul2[i]);
            }
        }
        return child;
    }

    _mutation(indivdiaul) {
        var max = 6, min = 1;
        var child = [];
        for(var i = 0; i < indivdiaul.length; i++) {
            var rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if(rndNum<=5) {
                child.push(indivdiaul[i]);
            }
            else {
                var tmp = 1;
                if(indivdiaul[i]==1) {
                    tmp = 0;
                }
                child.push(tmp);
            }
        }
        return child;

    }
    _fatBurner(population) {
        for (var i = (population.length - 1); i >= 0; i--) {
            if (this._individualWeight(population[i]) > this.maxWeight) {
                population.splice(i, 1);
            }
        }
        return population;
    }

    _generateRndIndivdiaul(length) {
        var indivdiaul = [];
        var max = 1, min = 0;
        for (var i = 0; i < length; i++) {
            var rndNum = Math.floor(Math.random() * (max - min + 1)) + min;
            indivdiaul.push(rndNum);
        }
        return indivdiaul;
    }

    _fitnessSort(unsortedList) {
        var len = unsortedList.length;
        for (var i = 1; i < len; i++) {
            var tmp = unsortedList[i]; //Copy of the current element. 
            for (var j = i - 1; j >= 0 && (this._individualValue(unsortedList[j]) < this._individualValue(tmp)); j--) {
                //Shift the number
                unsortedList[j + 1] = unsortedList[j];
            }
            unsortedList[j + 1] = tmp;
        }
        return unsortedList;
    }



    _individualWeight(indivdiaulSequence) {
        var sum = 0;
        for (var i = 0; i < this.items.length; i++) {
            if (indivdiaulSequence[i] == 1) {
                sum += parseFloat(this.items[i].weight);
            }
        }
        return parseFloat(sum);
    }

    _individualValue(indivdiaulSequence) {
        var sum = 0;
        for (var i = 0; i < indivdiaulSequence.length; i++) {
            if (indivdiaulSequence[i] == 1) {
                sum += parseFloat(this.items[i].value);
            }
        }
        return parseFloat(sum);
    }

    getBestItemCombination() {
        var itemCombination = [];
        for(var i = 0; i < this.bestIndindivdiaul.length; i++) {
            if(this.bestIndindivdiaul[i]==1) {
                itemCombination.push(this.items[i]);
            }
        }
        return itemCombination;
    }
}

module.exports.GeneticPacker = GeneticPacker;