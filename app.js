var app = new Vue({
    el: '#app',
    data: {
        test: "",
    },
    created: function () {
    },
    methods: {
    }
})

// --
function waitSec(sec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, sec * 1000);
    })
}