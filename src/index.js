var m = require('mithril')
var NavComponent = require('./Components/NavComponent')

m.route(document.body, "/diet/new", {
    "/diet/:id" : {
        render : (vnode) => {
            return m(NavComponent, vnode.attrs)
        }
    }
})