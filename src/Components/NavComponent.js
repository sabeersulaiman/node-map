var m = require('mithril')
var Stream = require('mithril/stream')
var DietModel = require('../Models/DietModel')

var NavComponent = {
    oninit : (vnode) => {
        DietModel.newDiet()
    },
    view : (vnode) => {
        return [
            m(".container-fluid", [
                m(".row", [
                    m(".col-md-12[id='logo']", [m("img.img-responsive[src='./images/login_logo.png']")])
                ])
            ]),
            m(".container-fluid[id='page']", [
                m(".row", [
                    m(".col-sm-2[id='menu']", [
                        m("ul.menu-high", [
                            m("li", [m("a[href='#diets']", "Diets")])
                        ])
                    ]),
                    m(".col-sm-10[id='content']", [
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
                                        NavComponent.tabWeekDay("mon", DietModel.diet.monday, true),
                                        NavComponent.tabWeekDay("tue", DietModel.diet.tuesday),
                                        NavComponent.tabWeekDay("wed", DietModel.diet.wednesday),
                                        NavComponent.tabWeekDay("thu", DietModel.diet.thursday),
                                        NavComponent.tabWeekDay("fri", DietModel.diet.friday),
                                        NavComponent.tabWeekDay("sat", DietModel.diet.saturday),
                                        NavComponent.tabWeekDay("sun", DietModel.diet.sunday)
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ]
    },
    tabWeekDay : (tabId, model, active) => {
        if (active) classes = ".tab-pane.fade.active.in"
        else classes = ".tab-pane.fade"

        return [m("" + classes,{id : tabId}, [
                    m(".tabs", [
                        m("ul.nav.nav-pills", [
                            m("li.active", [m("a[data-toggle='tab'][href='#early"+ tabId +"']", "Early Morning")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#break"+ tabId +"']", "Breakfast")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#mid"+ tabId +"']", "Mid Morning")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#lunch"+ tabId +"']", "Lunch")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#even"+ tabId +"']", "Evening")]),
                            m("li[class='']", [m("a[data-toggle='tab'][href='#din"+ tabId +"']", "Dinner")])
                        ]),
                        m(".tab-content", [
                            NavComponent.tabTime("early" + tabId, model.early, true),
                            NavComponent.tabTime("break" + tabId, model.break),
                            NavComponent.tabTime("mid" + tabId, model.mid),
                            NavComponent.tabTime("lunch" + tabId, model.lunch),
                            NavComponent.tabTime("even" + tabId, model.even),
                            NavComponent.tabTime("din" + tabId, model.din)
                        ])
                    ])
                ])
            ]
    },
    tabTime : (tabId, model, active) => {
        if(active) classes = ".tab-pane.fade.active.in"
        else classes = ".tab-pane.fade"
        return              m("" + classes, {id: tabId}, [
                                m("button.new", {onclick : NavComponent.pusher(model)}, "+ Add new"),
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

module.exports = NavComponent