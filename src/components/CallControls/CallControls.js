/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallState } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from './CallControls.css';

export type Props = {
  state: CallState,
  size: 'normal' | 'large',
  isVisible: boolean,
  isMuted?: boolean,
  isCameraOn?: boolean,
  isScreenShareOn?: boolean,
  onEnd: () => void,
  onAnswer: () => void,
  onMuteToggle?: () => void,
  onCameraToggle?: ?() => void,
  onScreenShareToggle?: ?() => void,
  onCall: boolean,
  withVideo: boolean
};

class CallControls extends PureComponent {
  props: Props;

  render() {
    const { state, size, isVisible, onCall, withVideo } = this.props;
    const className = classNames(styles.container, {
      [styles.hide]: !isVisible,
      [styles.onCall]: onCall,
      [styles.withVideo]: withVideo,
      [styles.large]: size === 'large'
    });

    const buttons = [];

    if (state === 'ringing_incoming') {
      buttons.push(
        <IconButton
          flat
          key="answer"
          size={size}
          theme="success"
          glyph="call"
          className={styles.button}
          onClick={this.props.onAnswer}
        />
      );
    }

    buttons.push(
      <IconButton
        flat
        key="end"
        size={size}
        theme="danger"
        glyph="call_end"
        className={styles.button}
        onClick={this.props.onEnd}
      />
    );

    if (this.props.onMuteToggle) {
      buttons.push(
        <IconButton
          flat
          key="mic"
          size={size}
          theme="primary"
          glyph={this.props.isMuted ? 'mic_material_off' : 'mic_material'}
          className={styles.button}
          onClick={this.props.onMuteToggle}
        />
      );
    }


    if (this.props.onCameraToggle) {
      buttons.push(
        <IconButton
          flat
          key="camera"
          size={size}
          theme="info"
          glyph={this.props.isCameraOn ? 'videocam_off' : 'videocam'}
          className={styles.button}
          onClick={this.props.onCameraToggle}
        />
      );
    }

    if (this.props.onScreenShareToggle) {
      buttons.push(
        <IconButton
          flat
          key="screen_share"
          size={size}
          theme="info"
          glyph={this.props.isScreenShareOn ? 'screen_share_stop' : 'screen_share'}
          className={styles.button}
          onClick={this.props.onScreenShareToggle}
        />
      );
    }

    return (
      <div className={className}>
        {buttons}
      </div>
    );
  }
}

export default CallControls;