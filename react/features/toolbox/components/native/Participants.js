/* Created by Gibraan Jafar on 5/11/20 */

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
import { IconParticipants } from '../../../base/icons';

import React from 'react';
import { Modal, Text } from 'react-native';

// Get TypeError on uncommenting below 2 imports
//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';

class ParticipantsButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.participants';
    icon = IconParticipants;
    label = 'Participants';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        //this.props.dispatch(toggleAudioOnly();
        //navigation.navigate('')
        console.log("Go to a new screen or open a modal \n ",this.props);
        this.props.onModalOpen();
    }
}

function _mapStateToProps(state, ownProps): Object {
    console.log("When is this executed ?");
    return {
            
    };
}



export default translate(connect(_mapStateToProps)(ParticipantsButton));