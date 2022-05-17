var app = new Vue({
    el: '#app',
    data: {
        key: "",
        keyCode: null
    },
    created: function () {
    },
    mounted() {
        document.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeyDown)
    },
    methods: {
        onKeyDown(event) {
            this.key = event.key
            this.keyCode = event.keyCode
        }
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