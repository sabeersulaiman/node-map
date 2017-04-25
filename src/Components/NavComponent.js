var m = require('mithril')
var Stream = require('mithril/stream')
var DietModel = require('../Models/DietModel')
var DietComponent = require('../Components/DietComponent')
var Toast = require('../Components/Toast')
var DietList = require('../Components/DietList')

var NavComponent = {
    oninit : (vnode) => {
    },
    view : (vnode) => {
        return [
            m('#snackbar', Toast.toastVal),
            m(".container-fluid", [
                m(".row", [
                    m(".col-md-12[id='logo']", [m("img.img-responsive[src='./images/login_logo.png']")])
                ])
            ]),
            m(".container-fluid[id='page']", [
                m(".row", [
                    m(".col-sm-2[id='menu']", [
                        m("ul.menu-high", [
                            m("li", [m("a",{
                                href : "/diet/all",
                                oncreate : m.route.link
                            }, "Diets")])
                        ])
                    ]),
                    (m.route.param('id') !== 'all') ? m(DietComponent) : m(DietList)
                ])
            ])
        ]
    }
}

module.exports = NavComponent