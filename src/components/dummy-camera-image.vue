<notes>
    This component contains the dummy video control bar as well.
</notes>
<template>
    <span>
        <v-img :src="getPath()">
            <canvas ref="myCanvas" id="myCanvas" style="position:absolute;">
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </v-img>
    </span>
</template>
<script>
export default {
    props: {
        source: {
            type: String,
            required: false,
            default: ''
        },
        boundary: {
            type: Object,
            default: () => ({
                x: 220,
                y: 160,
                width: 100,
                height: 75
            })
        }
    },
    data: () => ({
        canvas: null
    }),
    methods: {
        getPath() {
            return this.source
        },
        drawBoundary() {
            let ctx = this.canvas.getContext("2d");
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            ctx.rect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height);
            ctx.stroke();
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.canvas = this.$refs.myCanvas;
            var canvas = this.$refs.myCanvas;
            // Make it visually fill the positioned parent
            canvas.style.width ='100%';
            canvas.style.height='100%';
            // ...then set the internal size to match
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            this.drawBoundary();
        })
    },
    watch: {
        boundary() {
            this.drawBoundary();
        }
    }
}
</script>