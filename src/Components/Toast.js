var m = require('mithril');

var Toast = {
    toastVal : '',
    showToast : function (message) {
        var sbar = document.getElementById('snackbar');
        Toast.toastVal = message;
        sbar.className = "show";
        setTimeout(function(){ sbar.className = sbar.className.replace("show", ""); }, 3000);
    }
};

module.exports = Toast;