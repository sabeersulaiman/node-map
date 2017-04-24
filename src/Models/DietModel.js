var Stream = require('mithril/stream')

var DietModel = {
    diet : null,
    newDiet : () => {
        var d = {
            plan : "",
            monday : [],
            tuesday : [],
            wednesday : [],
            thursday : [],
            friday : [],
            saturday : [],
            name : [],
            exercise : [],
            items : [],
            dos : [],
            dont : []
        }

        DietModel.diet = d
    },
    addFoodToWeek : (day, food) => {
        if(DietModel.diet) {
            switch(day) {
                case "mon" : DietModel.diet.monday.push(food)
                             break
                            
                case "tue" : DietModel.diet.tueday.push(food)
                             break
                            
                case "wed" : DietModel.diet.wednesday.push(food)
                             break
                            
                case "thu" : DietModel.diet.thursday.push(food)
                             break
                            
                case "fri" : DietModel.diet.friday.push(food)
                             break
                            
                case "sat" : DietModel.diet.saturday.push(food)
                             break
                            
                case "sun" : DietModel.diet.sunday.push(food)
                             break
                default    : break
            }
        }
    },
    addExercise : (str) => {
        if(DietModel.diet) {
            DietModel.diet.exercise.push(Stream(''))
        }
    }
}

module.exports = DietModel