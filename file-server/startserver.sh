#!/usr/bin/env bash
docker container run -p 3000:3000 -e IP_CAM_RTSP_URL_ONE=rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov -e IP_CAM_RTSP_URL_TWO=rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov test-fileserver