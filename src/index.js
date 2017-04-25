var m = require('mithril')
var NavComponent = require('./Components/NavComponent')

m.route(document.body, "/diet/all", {
    "/diet/:id" : {
        render : (vnode) => {
            return m(NavComponent, vnode.attrs)
        }
    }
})