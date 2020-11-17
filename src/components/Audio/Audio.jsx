//  ----------------------------------------------------------------------------
//  Dependencies
//  ----------------------------------------------------------------------------
import React, {useState, useEffect, useRef} from 'react'
import WaveSurfer from 'wavesurfer.js'
import PropTypes from 'prop-types'
import {peaks} from './peaks'

//  -- Styles -------------------------
import * as Style from './styles'

//  ----------------------------------------------------------------------------
//  Component
//  ---------------------------------------------------------------------------- a
//
//  -- Description
//  Audio description
//
//  -- Props
//  Audio props
//
const Audio = ({data}) => {
  const waveformRef = useRef();
  const [play, setPlay] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [statusForLoading, setStatusForLoading] = useState(false);
  const [statusForWaveRef, setStatusForWaveRef] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');

  const handleAudio = () => {
    setPlay(!play);
    wavesurfer.playPause();
  }

  useEffect(() => {
    const formatTime = val => [Math.floor((val % 3600) / 60), ('00' + Math.floor(val % 60)).slice(-2)].join(':');
    if (waveformRef.current && !statusForWaveRef) {
      setStatusForWaveRef(true);
      setWavesurfer(
        WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#818489',
          progressColor: '#4e5156',
          responsive: true,
          height: 40,
          backend: 'MediaElement',
          cursorWidth: 1,
          cursorColor: '#10182F',
        }),
      );
    }
    if (wavesurfer && !statusForLoading) {
      wavesurfer.load(data, peaks);
      setStatusForLoading(true);
    }
    if (wavesurfer) {
      wavesurfer.on('audioprocess', () => {
        setCurrentTime(formatTime(wavesurfer.getCurrentTime()));
      });
      wavesurfer.on('ready', () => {
        setDuration(formatTime(wavesurfer.getDuration()))
      });
      wavesurfer.on('finish', () => {
        setPlay(false);
      });
    }
  }, [data, wavesurfer, waveformRef, statusForLoading, statusForWaveRef])

  return (
    <Style.Container>
      <Style.AudioButton onClick={handleAudio}>
        {!play && <span>&#9655;</span>}
        {play && <span>&#10074;&#10074;</span>}
      </Style.AudioButton>
      <Style.AudioText>{currentTime}</Style.AudioText>
      <Style.AudioWave>
        <div ref={waveformRef}></div>
      </Style.AudioWave>
      <Style.AudioText>{duration}</Style.AudioText>
    </Style.Container>
  )
}

//  ----------------------------------------------------------------------------
//  Prop types
//  ----------------------------------------------------------------------------
Audio.propTypes = {
    data: PropTypes.string,
}

Audio.defaultProps = {
    data: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
}

export default React.memo(Audio)
