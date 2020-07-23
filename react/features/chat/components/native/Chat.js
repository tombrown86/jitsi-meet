// @flow

import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

import { translate } from '../../../base/i18n';
import { JitsiModal } from '../../../base/modal';
import { connect } from '../../../base/redux';

import { CHAT_VIEW_MODAL_ID } from '../../constants';

import AbstractChat, {
    _mapDispatchToProps,
    _mapStateToProps,
    type Props
} from '../AbstractChat';

import ChatInputBar from './ChatInputBar';
import MessageContainer from './MessageContainer';
import MessageRecipient from './MessageRecipient';
import styles from './styles';


/**
 * Implements a React native component that renders the chat window (modal) of
 * the mobile client.
 */
class Chat extends AbstractChat<Props> {

    /**
     * Instantiates a new instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onClose = this._onClose.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <JitsiModal
                headerLabelKey = 'chat.title'
                modalId = { CHAT_VIEW_MODAL_ID }
                onClose = { this._onClose }>

                <KeyboardAvoidingView
                    behavior = 'padding'
                    style = { styles.chatContainer }>
                    <MessageContainer messages = { this.props._messages } />
                    <MessageRecipient />
                    <ChatInputBar onSend = { this.props._onSendMessage } />
                </KeyboardAvoidingView>
            </JitsiModal>
        );
    }

    _onClose: () => boolean

    /**
     * Closes the window.
     *
     * @returns {boolean}
     */
    _onClose() {
        this.props._onToggleChat();

        return true;
    }
}

export default translate(connect(_mapStateToProps, _mapDispatchToProps)(Chat));
