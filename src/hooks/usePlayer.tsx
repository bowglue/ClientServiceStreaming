import dashjs from "dashjs";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import VideoInfo from "../interface/VideoInterface";

const usePlayer = (video: VideoInfo) => {
  const [imageActive, setImageActive] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  let player!: dashjs.MediaPlayerClass;

  useEffect(() => {
    initPlayer();
    return () => {
      player.destroy();
    };
  }, []);

  const initPlayer = () => {
    var url = "/api/v1/video/" + video.name;
    player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current!, url, true);

    player.on(dashjs.MediaPlayer.events["CAN_PLAY"], function canPlay() {
      setImageActive(false);
      player.off(dashjs.MediaPlayer.events["CAN_PLAY"], canPlay);
    });
    player.on(dashjs.MediaPlayer.events["PLAYBACK_ENDED"], function ended() {
      setImageActive(true);
      player.off(dashjs.MediaPlayer.events["PLAYBACK_ENDED"], ended);
    });
  };
  return { imageActive: imageActive, videoRef: videoRef };
};

usePlayer.propTypes = {
  video: PropTypes.object.isRequired,
};

export default usePlayer;
