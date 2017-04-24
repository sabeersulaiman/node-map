var Stream = require('mithril/stream')
var m = require('mithril')
var config = require("../../config")

var DietModel = {
    diet : null,
    newDiet : () => {
        var d = {
            plan : Stream(''),
            monday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            tuesday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            wednesday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            thursday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            friday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            saturday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            sunday : {
                early : [],
                break : [],
                mid : [],
                lunch : [],
                even : [],
                din : []
            },
            exercise : [],
            items : [],
            dos : [],
            dont : [],
            veg : Stream(false),
            dia : Stream(false)
        }

        DietModel.diet = d
    },
    addFoodToWeek : (day, time) => {
        var food = DietModel.newFood()
        if(DietModel.diet) {
            var daySelect;
            switch(day) {
                case "mon" : daySelect = DietModel.diet.monday;
                             break
                            
                case "tue" : daySelect = DietModel.diet.tuesday
                             break
                            
                case "wed" : daySelect = DietModel.diet.wednesday
                             break
                            
                case "thu" : daySelect = DietModel.diet.thursday
                             break
                            
                case "fri" : daySelect = DietModel.diet.friday
                             break
                            
                case "sat" : daySelect = DietModel.diet.saturday
                             break
                            
                case "sun" : daySelect = DietModel.diet.sunday
                             break
                default    : daySelect = null
                             break
            }

            if(daySelect)
                switch(time) {
                    case "early" : 
                                daySelect.early.push(food)
                                break
                                
                    case "break" : 
                                daySelect.break.push(food)
                                break
                                
                    case "lunch" : 
                                daySelect.lunch.push(food)
                                break
                                
                    case "even" : 
                                daySelect.even.push(food)
                                break
                                
                    case "mid" : 
                                daySelect.mid.push(food)
                                break

                    case "din" : 
                                daySelect.din.push(food)
                                break
                    default    : 
                                daySelect = null
                                break
                }
        }
    },
    newFood : () => {
        return {
            item : Stream(''),
            quantity : Stream(''),
            protien : Stream(''),
            calories : Stream('')
        }
    },
    addExercise : (str) => {
        if(DietModel.diet) {
            DietModel.diet.exercise.push(Stream(''))
        }
    },
    save : () => {
        m.request({
            method : "POST",
            data : DietModel.diet,
            url : config.diets
        }).then(
            (response) => {
                console.log(response)
            },
            (error) => {
                console.log(error)
            }
        )
    }
}

module.exports = DietModel