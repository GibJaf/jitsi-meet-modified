/* Created by Gibraan Jafar on 5/11/20 */

import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';
import { IconParticipants } from '../../../base/icons';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

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
        
    }
}

function _mapStateToProps(state, ownProps): Object {
    return {
            
    };
}



export default translate(connect(_mapStateToProps)(ParticipantsButton));