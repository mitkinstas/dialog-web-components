/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, Message, PeerInfo } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import MessageAttachmentItem from './MessageAttachmentItem';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import styles from './MessageAttachment.css';

type Props = {
  className?: string,
  from: ?PeerInfo,
  messages: Message[],
  onGoToPeer: (peer: Peer) => mixed,
  onGoToMessage: (peer: ?Peer, message: Message) => mixed,
  onLightboxOpen?: (message: Message) => mixed,
  maxHeight: number,
  maxWidth: number
};

class MessageAttachmentForward extends PureComponent<Props> {
  handleGoToPeer = (event: SyntheticEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    const peer = this.getPeer();
    if (peer) {
      this.props.onGoToPeer(peer);
    }
  };

  handleGoToMessage = (message: Message) => {
    this.props.onGoToMessage(this.getPeer(), message);
  };

  getPeer(): ?Peer {
    return this.props.from ? this.props.from.peer : null;
  }

  renderHeader() {
    const { from } = this.props;
    if (!from) {
      return null;
    }

    return (
      <div className={styles.from}>
        <Text id="MessageAttachment.from" />
        <Button
          theme="primary" view="link" onClick={this.handleGoToPeer} size="small"
          className={styles.fromButton}
        >
          {from.type === 'channel' || from.type === 'group' ? (
            <Icon glyph={from.type} className={styles.fromIcon} size={20} />
          ) : null}
          <PeerInfoTitle title={from.title} emojiSize={16} />
        </Button>
      </div>
    );
  }

  renderMessages() {
    const { messages, maxHeight, maxWidth } = this.props;
    let lastSenderId = 0;

    return messages.map((message) => {
      const isShort = message.sender ? message.sender.peer.id === lastSenderId : false;
      lastSenderId = message.sender ? message.sender.peer.id : 0;

      return (
        <MessageAttachmentItem
          key={message.rid}
          message={message}
          type="forward"
          short={isShort}
          onGoToPeer={this.props.onGoToPeer}
          onLightboxOpen={this.props.onLightboxOpen}
          onGoToMessage={this.handleGoToMessage}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
        />
      );
    });
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.renderHeader()}
        <div className={styles.messages}>
          {this.renderMessages()}
        </div>
      </div>
    );
  }
}

export default MessageAttachmentForward;
