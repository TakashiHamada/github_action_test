// params
var ANSWERS = ["l_0-r_0", "l_1-r_1", "l_2-r_2", "l_3-r_3", "l_0-r_1", "l_1-r_0"];
var LEFT = ["l_0", "l_1", "l_2", "l_3"];
var RIGHT = ["r_0", "r_1", "r_2", "r_3"];
// --
var app = new Vue({
    el: '#app',
    data: {
        radicals: [],
        cursorIdx: 0,
    },
    created: function () {

        for (let idx = 0; idx < 2; idx++) {
            this.radicals.push({
                radicalIdx: idx,
                images: [],
                kindIdx: 0,
            });
        }
        
        this.radicals[0].images = shuffleArray(LEFT);
        this.radicals[1].images = shuffleArray(RIGHT);

        function shuffleArray(inputArray){
            return inputArray.sort(()=> Math.random() - 0.5);
        }
    },
    mounted() {
        document.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeyDown)
    },
    methods: {
        isClear() {
            return true;//this.radicals[0].images.length === 0;
        },
        onKeyDown(event) {
            // Judge
            if (event.key === "Enter") {
                if (judge(this.radicals)) {
                    this.radicals.forEach(e => {
                        let target = e.images.splice(e.kindIdx, 1);
                        e.images = e.images.filter(n => n !== target);
                        if (0 < e.kindIdx)
                            e.kindIdx--;
                    });
                }
            }
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
            
            // --
            function judge(radicals) {
                let a = radicals[0].images[radicals[0].kindIdx] + "";
                let b = radicals[1].images[radicals[1].kindIdx] + "";
                return ANSWERS.includes(a + "-" + b);
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
