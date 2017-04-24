var m = require('mithril')
var NavComponent = require('./Components/NavComponent')

m.route(document.body, "/home", {
    "/home" : {
        render : (vnode) => {
            return m(NavComponent, vnode.attrs)
        }
    }
})