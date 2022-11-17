import axios from "axios";
import { useEffect, useRef, useState } from "react";
import VideoInfo from "../interface/VideoInterface";

let mediaSource: any;
let sourceBuffer: { appendBuffer: (arg0: any) => void };
const mimeCodec = `video/webm; codecs="vp9,opus"`;
let segmentDuration: number;
let nbSegment: number;
let requestedSegments: boolean[];
let video: any;

const useStreamVideo = (videoInfo: VideoInfo) => {
  const [imageActive, setImageActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cancelToken = axios.CancelToken.source();

  useEffect(() => {
    video = videoRef.current;

    initiateVideoPlayer();
    console.log(videoInfo.name);

    return () => {
      removeEventListener(video);
      cancelToken.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initiateVideoPlayer = () => {
    mediaSource = new MediaSource();
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener("sourceopen", function source() {
      sourceOpen();
      mediaSource.removeEventListener("sourceopen", source);
    });
  };

  const sourceOpen = () => {
    sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    fetchVideoInfo();
  };

  const fetchVideoInfo = () => {
    axios({
      method: "get",
      url: "/api/v1/video/info/" + videoInfo.name,
      cancelToken: cancelToken.token,
    })
      .then((response) => {
        setUpVideo(response.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Cancelled Info");
        }
      });
  };

  const setUpVideo = (videoData: any) => {
    mediaSource.duration = videoData.videoDuration;
    nbSegment = videoData.nbSegment;
    requestedSegments = new Array(nbSegment).fill(false);
    segmentDuration = videoData.segmentDuration;

    fetchVideoSegment(0);
    requestedSegments[0] = true;

    video.addEventListener("timeupdate", videoUpdate);
    video.addEventListener("seeking", seek);
    video.addEventListener("waiting", videoUpdate);
    video.addEventListener("canplay", canPlay);
    video.addEventListener("ended", ended);
  };

  const fetchVideoSegment = async (segmentNo: string | number) => {
    console.log("segment: " + segmentNo);
    await axios({
      method: "get",
      url: "/api/v1/video/segment/" + videoInfo.name,
      params: { segmentID: segmentNo },
      responseType: "blob",
      cancelToken: cancelToken.token,
    })
      .then(async (response) => {
        setImageActive(false);
        const videoBuffer = await response.data.arrayBuffer();
        sourceBuffer.appendBuffer(videoBuffer);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Cancelled Segment");
        }
      });
  };

  const seek = () => {
    video.pause();
  };

  const canPlay = () => {
    video.play();
    video.removeEventListener("canplay", canPlay);
  };

  const ended = () => {
    setImageActive(true);
  };

  const videoUpdate = () => {
    const nextSegment = getNextSegment();
    const currentSegment = nextSegment - 1;

    if (endOfStream()) {
      mediaSource.endOfStream();
    }

    if (allSegments()) {
      video.removeEventListener("timeupdate", videoUpdate);
      return;
    }

    if (fetchNextSegment(nextSegment)) {
      requestedSegments[nextSegment] = true;
      fetchVideoSegment(nextSegment);
      return;
    }

    if (fetchCurrentSegment(currentSegment)) {
      requestedSegments[currentSegment] = true;
      fetchVideoSegment(currentSegment);
      return;
    }
  };

  const removeEventListener = (video: any) => {
    video.removeEventListener("timeupdate", videoUpdate);
    video.removeEventListener("canplay", canPlay);
    video.removeEventListener("waiting", videoUpdate);
    video.removeEventListener("ended", ended);
  };

  const getNextSegment = () => {
    return ((video.currentTime / segmentDuration) | 0) + 1;
  };

  const endOfStream = () => {
    return getNextSegment() === nbSegment && mediaSource.readyState === "open";
  };

  const fetchNextSegment = (nextSegment: number) => {
    const currentSegment = nextSegment - 1;
    return (
      video.currentTime > segmentDuration * nextSegment * 0.8 &&
      !requestedSegments[nextSegment] &&
      requestedSegments[currentSegment] &&
      nextSegment < nbSegment
    );
  };

  const fetchCurrentSegment = (currentSegment: number) => {
    return !requestedSegments[currentSegment] && currentSegment < nbSegment;
  };

  const allSegments = () => {
    return requestedSegments.every(function (val) {
      return !!val;
    });
  };

  return { videoRef: videoRef, imageActive: imageActive };
};

export default useStreamVideo;
