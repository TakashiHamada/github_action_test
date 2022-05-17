var app = new Vue({
    el: '#app',
    data: {
        key: "",
        keyCode: null,
        radicals: [],
        cursorIdx: 0,
    },
    created: function () {

        for (let idx = 0; idx < 2; idx++) {
            this.radicals.push({
                radicalIdx: idx,
                images: ['A', 'B', 'C', 'D', 'E'],
                kindIdx: 0,
            });
        }
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
            // --
            this.cursorIdx += getCursorChange(event.key, this.cursorIdx);

            let target = this.radicals.filter(radical => radical.radicalIdx === this.cursorIdx)[0];
            target.kindIdx = getKindIdx(event.key, target);

            // --
            function getCursorChange(key, current) {
                switch (key) {
                    case 'ArrowRight' :
                        if (current < 1) return 1;
                    case 'ArrowLeft' :
                        if (0 < current) return -1;
                }
                return 0
            }

            // --
            function getKindIdx(key, target) {
                let value = target.kindIdx;
                let max = target.images.length - 1;

                switch (key) {
                    case 'ArrowUp' :
                        value++;
                        if (max < value)
                            value = 0;
                        break;
                    case 'ArrowDown' :
                        value--;
                        if (value < 0)
                            value = max;
                        break;
                }
                return value; 
            }
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