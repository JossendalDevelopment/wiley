#!/bin/bash
VIDSOURCE="rtsp://admin:jossendal0579@192.168.50.83/cam/realmonitor?channel=1subtype=0"
# AUDIO_OPTS="-c:a aac -b:a 160000 -ac 2"
VIDEO_OPTS="-fflags nobuffer -s 842x480 -c:v libx264 -b:v 1400k -bufsize 768k -maxrate 800k -preset veryfast -tune zerolatency"
OUTPUT_HLS="-hls_time 3 -hls_list_size 10 -start_number 1 -hls_flags delete_segments"
# ffmpeg -i "$VIDSOURCE" -y $AUDIO_OPTS $VIDEO_OPTS $OUTPUT_HLS mystream.m3u8
ffmpeg  -rtsp_transport tcp -i "$VIDSOURCE" -y $VIDEO_OPTS $OUTPUT_HLS mystream.m3u8