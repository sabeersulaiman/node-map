var m = require('mithril')
var DietModel = require('../Models/DietModel')

var DietList = {
    oninit : (vnode) => {
        DietModel.loadAll()
    },
    view : (vnode) => {
        return (DietModel.loading) ? [m(".col-sm-10[id='content']", m(".loading"))]
        : m(".col-sm-10[id='content']",
            m("a.save", {
                href : "/diet/new",
                oncreate : m.route.link
            }, "Add New Diet"),
            m("ul", DietModel.diets.map((d) =>{
                return m("li", m("a", {
                    href : "/diet/" + d._id,
                    oncreate : m.route.link
                }, d.plan))
            }))
        )
    }
}

module.exports = DietList