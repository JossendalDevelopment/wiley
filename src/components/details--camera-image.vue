<notes>
    Consists of an image with a canvas drawn over it that can handle drawing bounding boxes from source props data.
    However images will come from inference engine with boxes pre-drawn.
    The use of the canvas is poorly implemented. The idea is that this component will will have its ``zoom()`` method triggered
    from `Details.vue` via ref. That adds a transform scale style to the image centered on the center of the bounding box data.
    TODO: fileservers path is being harcoded because `process` is not available when img src is loaded. Maybe load from config file
</notes>
<template>
  <div class="images-container" :class="zoomed ? 'zoom-out-cursor' : 'zoom-in-cursor'">
    <transition appear name="fade" mode="out-in" :duration="100">
      <v-img
        :aspect-ratio="4/3"
        ref="dummyImage"
        :key="source.id"
        :src="`http://localhost:3000${source.image_filepath}/${source.image_filename}`"
        style="position:absolute; width:100%;"
        :style="setScale"
        @click="zoom()"
      >
        <svg class="svg-responsive" viewBox="0 0 640 480" preserveAspectRatio="none">
          <g>
            <rect
              :x="source.bbox_xmin"
              :y="source.image_height - source.bbox_ymin"
              :width="source.bbox_width"
              :height="source.bbox_height"
              fill="transparent"
              stroke="red"
              stroke-width="5"
            />
            <rect
              :x="source.bbox_xmin"
              :y="source.image_height - source.bbox_ymin"
              width="80"
              height="20"
              fill="red"
            />
            <text
              :x="source.bbox_xmin + 3"
              :y="source.image_height - source.bbox_ymin + 14"
              font-family="Verdana"
              font-size="14"
              fill="black"
            >Train 99%</text>
          </g>
        </svg>
        <!-- <canvas
          ref="myCanvas"
          id="myCanvas"
          style="position:absolute; top:0; left:0; width:100%;"
        >Your browser does not support the HTML5 canvas tag.</canvas>-->

        <div class="image-overlay zoom-text">
          <span>CLICK IMAGE OR USE BAR TO ZOOM</span>
        </div>
        <!-- Inferenced images already come with timestamp? -->
        <!-- <div class="image-overlay date">
          <span>{{ formatDate }}</span>
        </div>-->

        <template v-slot:placeholder>
          <v-layout fill-height align-center justify-center ma-0>
            <v-progress-circular indeterminate color="#FFFFFF55"></v-progress-circular>
          </v-layout>
        </template>
      </v-img>
    </transition>
  </div>
</template>
<script>
import format from "date-fns/format";
import config from "../../config/env/production";

export default {
  props: {
    source: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data: () => ({
    canvas: null,
    zoomed: false
  }),
  methods: {
    getPathZoomed() {
      return this.source.staticImageZoomed;
    },
    drawCanvas() {
      this.canvas = this.$refs.myCanvas;
      //   var canvas = this.$refs.myCanvas;
      // Make it visually fill the positioned parent
      //   canvas.style.width = "100%";
      //   canvas.style.height = "100%";
      // ...then set the internal size to match
      //   canvas.width = canvas.offsetWidth;
      //   canvas.height = canvas.offsetHeight;
      // 0.75 is for 4:3 ratio
      //   const heightRatio = 0.75;
      // for 16:9
      //   const heightRatio = 1.778;

      //   canvas.height = canvas.width * heightRatio;
      //   console.log("CANVAS HEIGHT", canvas.height);
      //   this.drawBoundary();
    },
    drawBoundary() {
      let ctx = this.$refs.myCanvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // draw inner red box
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      console.log(
        "DRAW BOX",
        this.source.bbox_xmin.toFixed(0),
        this.source.image_height - this.source.bbox_ymin.toFixed(0),
        this.source.bbox_width.toFixed(0),
        this.source.bbox_height.toFixed(0)
      );
      ctx.rect(
        90,
        // this.source.bbox_xmin,
        this.source.image_height - this.source.bbox_ymin,
        this.source.bbox_width,
        this.source.bbox_height
      );
      ctx.stroke();
      // draw outer white box
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "white";
      ctx.rect(
        this.source.bbox_xmin - 2,
        this.source.image_height - this.source.bbox_ymin - 2,
        this.source.bbox_width + 5,
        this.source.bbox_height + 5
      );
      ctx.stroke();
    },
    zoom() {
      this.zoomed = !this.zoomed;
      //   this.getPath;
    },
    zoomOut() {
      if (this.zoomed) {
        this.zoomed = false;
      }
    }
  },
  computed: {
    getPath() {
      if (this.zoomed) {
        return this.source.staticImageZoomed;
      } else {
        return this.source.staticImage;
      }
    },
    setScale() {
      if (this.zoomed) {
        // THIS HERE WORKS FOR 16:9
        let img = this.$refs.dummyImage.$el.getBoundingClientRect();
        let x =
          this.source.image_width / 2 -
          (this.source.bbox_xmin + this.source.bbox_width / 2);
        let y =
          this.source.image_height / 2 -
          (this.source.image_height -
            this.source.bbox_ymin +
            this.source.bbox_height / 2);
        console.log("ORIGINAL X Y", x, y);
        // prevent an image from being translated beyond its x min/max, causing blank space
        let negX = x < 0 ? true : false;
        let negY = y < 0 ? true : false;
        // Hopefully this is temporary, if the x translation is more than 25% width of the image either pos or neg
        // then we only want to translate to the edge of the image. This applies only to a transform scale of 2
        let computedX =
          Math.abs(x) > img.width / 4
            ? negX
              ? -(img.width / 4)
              : img.width / 4
            : x;
        let computedY =
          Math.abs(y) > img.height / 4
            ? negY
              ? -(img.height / 4)
              : img.height / 4
            : y;
        console.log("ZOOM TO", computedX, computedY);
        return `transform: scale(2) translate(${computedX}px, ${computedY}px)`;
      }
      return ``;
    },
    formatDate() {
      return format(new Date(), "MMM DD HH:MM:SS");
    }
  },
  mounted() {
    setTimeout(() => {
      console.log("CONFIG", config);
      this.drawCanvas();
    }, 400);
  },
  watch: {
    source() {
      setTimeout(() => {
        // fade transition requires keyed elements to redraw image properly
        // so you cant redraw the canvas/bounding box until after transition completes
        this.drawCanvas();
      }, 400);
    }
  }
};
</script>
<style lang="scss" scoped>
.images-container {
  overflow: hidden;
  position: relative;
  //   padding-bottom: 55.65%;
  padding-bottom: 75%;
  &.zoom-in-cursor {
    cursor: url(/assets/images/zoom-in.png) 10 3, auto;
  }
  &.zoom-out-cursor {
    cursor: url(/assets/images/zoom-out.png) 10 3, auto;
  }
}
.image-overlay {
  background-color: var(--v-buttonBlack-base);
  border: 1px solid var(--v-border-base);
  letter-spacing: 2px;
  padding: 0px 10px;
  color: #fff;
  position: absolute;
  top: 12px;
  z-index: 2001;
  &.zoom-text {
    right: 12px;
  }
  &.date {
    left: 12px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

