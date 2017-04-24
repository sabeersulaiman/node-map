var m = require('mithril')
var stream = require('mithril/stream')

var NavComponent = {
    oninit : (vnode) => {
        
    },
    view : (vnode) => {
        return [
            m("input[type='text']", {
                value : vnode.state.inputData(),
                oninput : m.withAttr('value', vnode.state.inputData)
            }),
            m("h2", vnode.state.inputData())
        ]
    }
}

module.exports = NavComponent