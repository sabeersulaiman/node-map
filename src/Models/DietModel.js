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
        if(!DietModel.diet._id) {
            DietModel.loading = true
            m.request({
                method : "PUT",
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
        }
        else {
            DietModel.loading = true
            m.request({
                method : "POST",
                data : DietModel.diet,
                url : config.diets + DietModel.diet._id
            }).then(
                (response) => {
                    if(response === false) {
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
        }
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
                    var d = response
                    var mapper = DietModel.mapper

                    var diet = {
                        plan : Stream(d.plan),
                        monday : {
                            early : d.monday.early.map(mapper),
                            break : d.monday.break.map(mapper),
                            lunch : d.monday.lunch.map(mapper),
                            even : d.monday.even.map(mapper),
                            din : d.monday.din.map(mapper)
                        },
                        tuesday : {
                            early : d.tuesday.early.map(mapper),
                            break : d.tuesday.break.map(mapper),
                            lunch : d.tuesday.lunch.map(mapper),
                            even : d.tuesday.even.map(mapper),
                            din : d.tuesday.din.map(mapper)
                        },
                        wednesday : {
                            early : d.wednesday.early.map(mapper),
                            break : d.wednesday.break.map(mapper),
                            lunch : d.wednesday.lunch.map(mapper),
                            even : d.wednesday.even.map(mapper),
                            din : d.wednesday.din.map(mapper)
                        },
                        thursday : {
                            early : d.thursday.early.map(mapper),
                            break : d.thursday.break.map(mapper),
                            lunch : d.thursday.lunch.map(mapper),
                            even : d.thursday.even.map(mapper),
                            din : d.thursday.din.map(mapper)
                        },
                        friday : {
                            early : d.friday.early.map(mapper),
                            break : d.friday.break.map(mapper),
                            lunch : d.friday.lunch.map(mapper),
                            even : d.friday.even.map(mapper),
                            din : d.friday.din.map(mapper)
                        },
                        saturday : {
                            early : d.saturday.early.map(mapper),
                            break : d.saturday.break.map(mapper),
                            lunch : d.saturday.lunch.map(mapper),
                            even : d.saturday.even.map(mapper),
                            din : d.saturday.din.map(mapper)
                        },
                        sunday : {
                            early : d.sunday.early.map(mapper),
                            break : d.sunday.break.map(mapper),
                            lunch : d.sunday.lunch.map(mapper),
                            even : d.sunday.even.map(mapper),
                            din : d.sunday.din.map(mapper)
                        },
                        exercise : [],
                        items : [],
                        dos : [],
                        dont : [],
                        veg : Stream(d.veg),
                        dia : Stream(d.dia),
                        _id : d._id
                    }

                    DietModel.diet = diet

                    Toast.showToast("Loaded the diet")
                }
                DietModel.loading = false
            },
            (error) => {
                Toast.showToast("Failed To load the diet, please reload.")
                DietModel.loading = false
            }
        )
    },
    mapper : (en) => {
        return {
            item : Stream(en.item),
            quantity : Stream(en.quantity),
            protien : Stream(en.protien),
            calories : Stream(en.calories)
        }
    }
}

module.exports = DietModel