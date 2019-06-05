<notes>
    This component contains the dummy video control bar as well. The use of the canvas is poorly implemented.
    It handles the drawing of bounding box over image but is complicated by the transition effect which 
    required the v-img element to be removed from the dom when the source changes.
    Also handling the floating zoom icon doesn't reposition itself when zoomed.
</notes>
<template>
    <div class="images-container" :class="zoomed ? 'zoom-out-cursor' : 'zoom-in-cursor'">
        <transition appear name="fade" mode="out-in" :duration="100">
            <v-img 
                v-if="!zoomed" 
                ref="dummyImage" 
                :key="source.id" 
                :src="source.staticImage" 
                style="position:absolute; width:100%;"
                @click="zoom()">

                <!-- <canvas ref="myCanvas" id="myCanvas" style="position:absolute; top:0; bottom:0; right:0; left:0;">
                    Your browser does not support the HTML5 canvas tag.
                </canvas> -->

                <div class="image-overlay-text">
                    <span>PRESS SPACE BAR TO ZOOM</span>
                </div>

                <template v-slot:placeholder>
                    <v-layout
                        fill-height
                        align-center
                        justify-center
                        ma-0
                    >
                        <v-progress-circular indeterminate color="#FFFFFF55"></v-progress-circular>
                    </v-layout>
                </template>
            </v-img>
            <v-img 
                v-if="zoomed" 
                ref="dummyImage" 
                :key="source.id" 
                :src="source.staticImageZoomed" 
                style="position:absolute; width:100%;"
                @click="zoom()">
            </v-img>

        </transition>
    </div>
</template>
<script>
export default {
    props: {
        source: {
            type: Object,
            required: false,
            default: () => {}
        },
        boundary: {
            type: Object,
            default: () => ({
                x: 220,
                y: 160,
                width: 100,
                height: 75
            })
        },
    },
    data: () => ({
        canvas: null,
        zoomed: false,
        relBoundary: {
            yMin: 0.19369137287139893,
            xMin: 0.4157434105873108,
            yMax: 0.33124929666519165,
            xMax: 0.4459244608879089
        }
    }),
    methods: {
        getPathZoomed() {
            return this.source.staticImageZoomed;
        },
        drawCanvas() {
            this.canvas = this.$refs.myCanvas;
            var canvas = this.$refs.myCanvas;
            // Make it visually fill the positioned parent
            canvas.style.width ='100%';
            canvas.style.height='100%';
            // ...then set the internal size to match
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            this.drawBoundary();
        },
        drawBoundary() {
            let ctx = this.$refs.myCanvas.getContext("2d");
            ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "red";
            console.log("CANVAS W/H", this.canvas.width, this.canvas.height)
            console.log("CANVAS BOX W/H", this.canvas.width - (this.canvas.width * this.relBoundary.xMin))
            ctx.rect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height);
            ctx.stroke();
        },
        zoom() {
            this.zoomed = !this.zoomed;
            this.getPath;
        },
        zoomOut() {
            if (this.zoomed) {
                this.zoomed = false;
            }
        },
        getClick() {
            let img = this.$refs.dummyImage.$el.getBoundingClientRect();
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
        getPath() {
            if(this.zoomed) {
                return this.source.staticImageZoomed;
            } else {
                return this.source.staticImage;
            }
        },
    },
    mounted() {
        setTimeout(() => {
            // this.drawCanvas();
        }, 400)
    },
    watch: {
        boundary() {
            setTimeout(() => {
                // fade transition requires keyed elements to redraw image properly
                // so you cant redraw the canvas/bounding box until after transition completes
                // this.drawCanvas();
            }, 400)
        }
    }
}
</script>
<style lang="scss" scoped>
.images-container {
    overflow: hidden; 
    position: relative; 
    padding-bottom: 55.65%;
    &.zoom-in-cursor {
        cursor: url(/assets/images/zoom-in.png) 10 3, auto;
    }
    &.zoom-out-cursor {
        cursor: url(/assets/images/zoom-out.png) 10 3, auto;
    }
}
.image-overlay-text {
    background-color: var(--v-buttonBlack-base);
    border: 1px solid var(--v-border-base);
    letter-spacing: 2px;
    padding: 0px 10px;
    color: #FFF;
    position: absolute;
    bottom: 20px;
    right: 20px;
    z-index: 2001;;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

