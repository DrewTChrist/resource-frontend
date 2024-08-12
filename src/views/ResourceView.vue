<script setup>
import { ref, reactive, onMounted } from 'vue'
import { streamResource } from '../api.js'

// const mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
// const content = reactive({
//   contentBlob: null,
//   contentUrl: null
// })

const contentBlob = ref(null)
const contentUrl = ref(null)
const videoElement = ref(null)

const props = defineProps({
  resourceId: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  videoElement.value = document.getElementById('video-element')
  // videoElement.value.controls = false
  // videoElement.value.removeAttribute('controls')
  // videoElement.value.addEventListener('durationchange', () => {
  //   console.log('durationchange', videoElement.value.duration)
  // })
  // videoElement.value.addEventListener('ended', () => {
  //   videoElement.value.pause()
  // })
  fetchVideo(props.resourceId)
  // loadVideo()
})

/*function playPause() {
  if (videoElement.value.paused) {
    videoElement.value.play()
  } else {
    videoElement.value.pause()
  }
}

function loadVideo() {
  if (MediaSource.isTypeSupported(mimeCodec)) {
    const mediaSource = new MediaSource();
    console.log('loadVideo', mediaSource.readyState); // closed
    videoElement.value.src = URL.createObjectURL(mediaSource);
    // videoElement.value.srcObject = mediaSource.handle;
    mediaSource.addEventListener("sourceopen", sourceOpen);
  } else {
    console.error("Unsupported MIME type or codec: ", mimeCodec);
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/SourceBuffer
async function sourceOpen() {
  console.log('sourceOpen', this.readyState); // open
  console.log(videoElement.value.src)
  const mediaSource = this;
  const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  const response = await streamResource(props.resourceId, 0, '')
  console.log(response)
  // const buffer = await response.arrayBuffer();
  const buffer = await response.data.arrayBuffer()
  sourceBuffer.addEventListener("updateend", () => {
    if (mediaSource.readyState == 'open') {
      mediaSource.endOfStream();
      videoElement.value.play();
      console.log(mediaSource.readyState); // ended
    }
  });
  sourceBuffer.appendBuffer(buffer);
}*/

async function fetchVideo(resourceId) {
  const size = 2299653
  var read = 0
  const chunkSize = 64000
  var parts = []
  while (read < size) {
    console.log(`Read: ${read}`)
    var end = Math.min(read + chunkSize, size)
    end = end == size ? '' : end
    try {
      const response = await streamResource(resourceId, read, end)
      // console.log(response)
      parts.push(response.data)
      contentBlob.value = new Blob(parts, { type: 'video/mp4' })
      contentUrl.value = URL.createObjectURL(contentBlob.value)
      // videoElement.value.srcObject = contentUrl.value
      read += parseInt(response.headers['content-length'])
    } catch (err) {
      console.log(err)
      break
    }
  }
  // .then((response) => {
  //   console.log(response)
  //   const url = URL.createObjectURL(new Blob([response.data], { type: 'video/mp4' }))
  //   var myVid = document.getElementById('vidObj')
  //   myVid.setAttribute('src', url)
  // })
  // .catch((error) => {
  //   console.log(error)
  // })
}
</script>

<template>
  <div class="container">
    <h1>Resource View</h1>
    <h1>Resource ID: {{ resourceId }}</h1>
    <div id="media-container">
      <figure id="video-container"></figure>
      <video
        id="video-element"
        style="display: block"
        preload="metadata"
        width="500"
        height="360"
        controls
        muted
      >
        <source v-if="contentUrl" :src="contentUrl" type="video/mp4" />
      </video>
      <!-- <div id="media-controls">
        <button @click="playPause" class="btn btn-primary" type="button">Play</button>
      </div> -->
    </div>
  </div>
</template>

<style></style>
