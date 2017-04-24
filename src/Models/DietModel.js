var Stream = require('mithril/stream')
var m = require('mithril')
var config = require("../../config")
var Toast = require('../Components/Toast')

var DietModel = {
    diet : null,
    loading : true,
    newDiet : () => {
        var d = {
            plan : Stream(''),
            monday : {
                early : [],
                break : [],
                lunch : [],
                even : [],
                din : []
            },
            tuesday : {
                early : [],
                break : [],
                lunch : [],
                even : [],
                din : []
            },
            wednesday : {
                early : [],
                break : [],
                lunch : [],
                even : [],
                din : []
            },
            thursday : {
                early : [],
                break : [],
                lunch : [],
                even : [],
                din : []
            },
            friday : {
                early : [],
                break : [],
                lunch : [],
                even : [],
                din : []
            },
            saturday : {
                early : [],
                break : [],
                lunch : [],
                even : [],
                din : []
            },
            sunday : {
                early : [],
                break : [],
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
        DietModel.loading = false
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
        DietModel.loading = true
        m.request({
            method : "POST",
            data : DietModel.diet,
            url : config.diets
        }).then(
            (response) => {
                if(response === null) {
                    Toast.showToast("Unable to save, please try again.")
                }
                else {
                    console.log(response)
                    Toast.showToast("Diet saved successfully.")
                }

                DietModel.loading = false
            },
            (error) => {
                    Toast.showToast("Network Error, please try again.")
                    DietModel.loading = false
            }
        )
    },
    loadDiet : (id) => {
        DietModel.loading = true

        m.request({
            method : "GET",
            url : config.diets + id
        }).then(
            (response) => {
                if(response === null) {
                    Toast.showToast("Failed To load the diet, please reload.")
                }
                else {
                    DietModel.diet = response
                    console.log(response)
                    Toast.showToast("Loaded the diet")
                }
                DietModel.loading = false
            },
            (error) => {
                Toast.showToast("Failed To load the diet, please reload.")
                DietModel.loading = false
            }
        )
    }
}

module.exports = DietModel