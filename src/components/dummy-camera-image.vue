<notes>
    This component contains the dummy video control bar as well.
</notes>
<template>
    <div style="overflow:hidden; position:relative;">
        <v-img ref="dummyImage" :src="getPath()" :style="setScale()" @click="getClick($event)">
            <canvas ref="myCanvas" id="myCanvas" style="position:absolute;">
                Your browser does not support the HTML5 canvas tag.
            </canvas>
        </v-img>
        <!-- icon floats when image is zoomed, removed until fix is found -->
        <!-- <v-img ref="zoomIcon" :src="require('../../public/assets/images/icon-zoom.svg')" :style="setIconStyle" /> -->
    </div>
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
        canvas: null,
        zoomed: false
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
        zoom() {
            this.zoomed = !this.zoomed;
        },
        getClick() {
            let img = this.$refs.dummyImage.$el.getBoundingClientRect();
            console.log("IMAGE CENTER", img, img.width / 2, img.height / 2)
            console.log("BOUNDARY", this.boundary)
            let x = img.width / 2 - (this.boundary.x + this.boundary.width / 2);
            let y = img.height / 2 - (this.boundary.y + this.boundary.height / 2);
            this.$refs.dummyImage.$el.style = `transform: scale(3) translate(${x}px, ${y}px)`
        },
        setScale() {
            if(this.zoomed) {
                let img = this.$refs.dummyImage.$el.getBoundingClientRect();
                let x = img.width / 2 - (this.boundary.x + this.boundary.width / 2);
                let y = img.height / 2 - (this.boundary.y + this.boundary.height / 2);
                return `transform: scale(3) translate(${x}px, ${y}px)`;
            }
            return ``;
        },
    },
    computed: {
        setIconStyle() {
            return `
                position:absolute; 
                height:15px; 
                width:15px; 
                top:${this.boundary.y - 15}px; 
                left:${this.boundary.x + this.boundary.width}px; 
            `
        }
    },
    mounted() {
        setTimeout(() => {
            this.canvas = this.$refs.myCanvas;
            var canvas = this.$refs.myCanvas;
            // Make it visually fill the positioned parent
            canvas.style.width ='100%';
            canvas.style.height='100%';
            // ...then set the internal size to match
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            this.drawBoundary();
        },500)
    },
    watch: {
        boundary() {
            this.drawBoundary();
        }
    }
}
</script>
