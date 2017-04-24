var m = require('mithril')
var DietModel = require('../Models/DietModel')

var DietComponent = {
    oninit : (vnode) => {
        if(m.route.param('id') === "new") {
            //load the Diet as new
            DietModel.newDiet()
        }
        else {
            //load the Diet as a new Diet
            var id = m.route.param('id')
            DietModel.loadDiet(id)
        }
    },
    view : (vnode) => {
        return (DietModel.diet) ? [m(".col-sm-10[id='content']", [
                        m(".row", [
                            m(".col-md-12", [
                                m(".centerDiv", m("h1", "Add new Diet")),
                                m("button.save", {
                                    onclick : DietModel.save
                                }, "Save Now"),
                                m("input.planName[type='text'][placeholder='Diet Name']", {
                                    oninput : m.withAttr('value', DietModel.diet.plan),
                                    value : DietModel.diet.plan()
                                }),
                                m("label.checker",
                                    m("input[type='checkbox']", {
                                        checked : DietModel.diet.veg(),
                                        onclick : m.withAttr('checked', DietModel.diet.veg)
                                    }), "Vegetarian"
                                ),
                                m("label.checker",
                                    m("input[type='checkbox']", {
                                        checked : DietModel.diet.dia(),
                                        onclick : m.withAttr('checked', DietModel.diet.dia)
                                    }), "For Diabetic"
                                ),
                                m(".tabs", [
                                    m("ul.nav.nav-pills", [
                                        m("li.active", [m("a[data-toggle='tab'][href='#mon']", "Monday")]),
                                        m("li[class='']", [m("a[data-toggle='tab'][href='#tue']", "Tuesday")]),
                                        m("li[class='']", [m("a[data-toggle='tab'][href='#wed']", "Wednesday")]),
                                        m("li[class='']", [m("a[data-toggle='tab'][href='#thu']", "Thursday")]),
                                        m("li[class='']", [m("a[data-toggle='tab'][href='#fri']", "Friday")]),
                                        m("li[class='']", [m("a[data-toggle='tab'][href='#sat']", "Saturday")]),
                                        m("li[class='']", [m("a[data-toggle='tab'][href='#sun']", "Sunday")])
                                    ]),
                                    m(".tab-content", [
                                        DietComponent.tabWeekDay("mon", DietModel.diet.monday, true),
                                        DietComponent.tabWeekDay("tue", DietModel.diet.tuesday),
                                        DietComponent.tabWeekDay("wed", DietModel.diet.wednesday),
                                        DietComponent.tabWeekDay("thu", DietModel.diet.thursday),
                                        DietComponent.tabWeekDay("fri", DietModel.diet.friday),
                                        DietComponent.tabWeekDay("sat", DietModel.diet.saturday),
                                        DietComponent.tabWeekDay("sun", DietModel.diet.sunday)
                                    ])
                                ])
                        ])
                ])
        ])] : [m(".col-sm-10[id='content']", m(".loading"))]
    },
    tabWeekDay : (tabId, model, active) => {
        if (active) classes = ".tab-pane.fade.active.in"
        else classes = ".tab-pane.fade"

        return [m("" + classes,{id : tabId}, [
                    m(".tabs", [
                        m("ul.nav.nav-pills", [
                            m("li.active", [m("a[data-toggle='tab'][href='#early"+ tabId +"']", "Early Morning")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#break"+ tabId +"']", "Breakfast")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#lunch"+ tabId +"']", "Lunch")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#even"+ tabId +"']", "Evening")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#din"+ tabId +"']", "Dinner")])
                        ]),
                        m(".tab-content", [
                            DietComponent.tabTime("early" + tabId, model.early, true),
                            DietComponent.tabTime("break" + tabId, model.break),
                            DietComponent.tabTime("lunch" + tabId, model.lunch),
                            DietComponent.tabTime("even" + tabId, model.even),
                            DietComponent.tabTime("din" + tabId, model.din)
                        ])
                    ])
                ])
            ]
    },
    tabTime : (tabId, model, active) => {
        if(active) classes = ".tab-pane.fade.active.in"
        else classes = ".tab-pane.fade"
        return              m("" + classes, {id: tabId}, [
                                m("button.new", {onclick : DietComponent.pusher(model)}, "+ Add new"),
                                m(".food-head", [
                                    m(".col-xs-3", "Menu Item"),
                                    m(".col-xs-3", "Quantity"),
                                    m(".col-xs-3", "Calories"),
                                    m(".col-xs-3", "Protien")
                                ]),
                                model.map((food) => {
                                    return m(".food-in", [
                                        m(".col-xs-3", [
                                            m("input[placeholder='Menu Item'][type='text']", {
                                                value : food.item(),
                                                oninput : m.withAttr('value', food.item)
                                            })
                                        ]),
                                        m(".col-xs-3", [
                                            m("input[placeholder='Quantity'][type='text']", {
                                                value : food.quantity(),
                                                oninput : m.withAttr('value', food.quantity)
                                            })
                                        ]),
                                        m(".col-xs-3", [
                                            m("input[placeholder='Calories'][type='text']", {
                                                value : food.calories(),
                                                oninput : m.withAttr('value', food.calories)
                                            })
                                        ]),
                                        m(".col-xs-3", [
                                            m("input[placeholder='Protien'][type='text']", {
                                                value : food.protien(),
                                                oninput : m.withAttr('value', food.protien)
                                            })
                                        ])
                                    ])
                                })
                            ])
    },
    pusher : (model) => {
        return () => {
            model.push(DietModel.newFood())
        }
    } 
}

module.exports = DietComponent