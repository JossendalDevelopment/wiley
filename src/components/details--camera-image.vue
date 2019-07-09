<notes>
    Component workflow explanation:
    1. We take the inferenced image from wherever fileserver and convert that to a png data uri.
        This step is required because when serializing the svg later, having an http url as the <image>
        source will result in a blank. Dataurls however, serialize correctly.
    2. Draw to the svg <image> tag with the dataurl
    3. Draw bounding box and any other overlaying rects. This all happens on mount(), and is retriggerd
        any time the `source` prop changes
    4. We then take the entire <svg> element, serialize it, create and add it to a canvas at 250px square.
    5. From canvas, we call toDataURL to create a png data url of the image and all it's drawn overlays.
    6. We emit this.png url up to the Details.vue to be added to the event when it is classified.

    TODO theres a race condition in convertSvgToCanvas where it will try to draw the canvas image before 
        the svg image is loaded, resulting in blank background or background from previous draw. using a 
        settimeout for lazy workaround both in mounted() and watcher() but find better way.
    TODO possibly reimplement the loading spinner, svgs load so fast it may not be needed
    TODO will images come with timestamp or will it need to be created and drawn
</notes>
<template>
  <div id="remove" class="images-container" :class="zoomed ? 'zoom-out-cursor' : 'zoom-in-cursor'">
    <transition appear name="fade" mode="out-in" :duration="100">
      <svg
        class="svg-responsive"
        viewBox="0 0 640 480"
        preserveAspectRatio="none"
        ref="dummyImage"
        @click="zoom()"
        :style="setScale"
        id="svgimage"
        v-show="pngDataUrl"
      >
        <g>
          <image :xlink:href="pngDataUrl" :height="source.image_height" :width="source.image_width" />
          <!-- Bounding box -->
          <rect
            :x="source.bbox_xmin"
            :y="source.image_height - source.bbox_ymin"
            :width="source.bbox_width"
            :height="source.bbox_height"
            fill="transparent"
            stroke="red"
            stroke-width="5"
          />
          <!-- name/percentage box -->
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
            font-family="DIN Condensed"
            font-size="14"
            fill="black"
          >{{ source.inferenced_classification }} {{ source.inferenced_percentage}}%</text>
          <!-- black info box -->
          <rect
            :x="source.image_width - 175"
            :y="5"
            :width="170"
            :height="20"
            fill="black"
            :stroke="$vuetify.theme.border"
            stroke-width="1"
          />
          <text
            :x="source.image_width - 165"
            :y="20"
            font-family="DIN Condensed"
            font-size="14"
            fill="white"
          >CLICK IMAGE OR USE BAR TO ZOOM</text>
        </g>
      </svg>

      <!-- <template v-slot:placeholder>
        <v-layout fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="#FFFFFF55"></v-progress-circular>
        </v-layout>
      </template>-->
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
    }
  },
  data: () => ({
    canvas: null,
    zoomed: false,
    pngDataUrl: null
  }),
  mounted() {
    this.toDataURL(
      `http://localhost:3000${this.source.image_filepath}/${this.source.image_filename}`
    ).then(dataUrl => {
      this.pngDataUrl = dataUrl;
      setTimeout(() => {
        this.convertSvgToPng();
      }, 1000);
    });
  },
  methods: {
    getPathZoomed() {
      return this.source.staticImageZoomed;
    },
    toDataURL(url) {
      return fetch(url)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
    },
    convertSvgToPng() {
      const svg = document.querySelector("#svgimage");
      const svgString = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      canvas.width = 250;
      canvas.height = 250;
      const ctx = canvas.getContext("2d");

      let img = new Image();
      img.onload = () => {
        // when img.src is set, onload is called and url is emitted
        ctx.drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        this.$emit("datauricreated", png);
      };
      const url = `data:image/svg+xml;base64,${btoa(svgString)}`;
      img.setAttribute("src", url);
    },
    zoom() {
      this.zoomed = !this.zoomed;
    },
    zoomOut() {
      if (this.zoomed) {
        this.zoomed = false;
      }
    }
  },
  computed: {
    setScale() {
      if (this.zoomed) {
        let img = document.querySelector("#svgimage").getBoundingClientRect();
        let x =
          this.source.image_width / 2 -
          (this.source.bbox_xmin + this.source.bbox_width / 2);
        let y =
          this.source.image_height / 2 -
          (this.source.image_height -
            this.source.bbox_ymin +
            this.source.bbox_height / 2);
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
        return `transform: scale(2) translate(${computedX}px, ${computedY}px)`;
      }
      return ``;
    }
  },
  watch: {
    source() {
      // recreate thumbnail every time source prop changes
      this.toDataURL(
        `http://localhost:3000${this.source.image_filepath}/${this.source.image_filename}`
      ).then(dataUrl => {
        this.pngDataUrl = dataUrl;
        setTimeout(() => {
          this.convertSvgToPng();
        }, 1000);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.images-container {
  overflow: hidden;
  position: relative;
  //   padding-bottom: 55.65%;
  //   padding-bottom: 75%;
  margin-bottom: -7px;
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

