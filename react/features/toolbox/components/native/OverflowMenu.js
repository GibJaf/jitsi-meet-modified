// @flow

import React, { PureComponent, useState } from "react";
import {
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import Collapsible from "react-native-collapsible";

import { ColorSchemeRegistry } from "../../../base/color-scheme";
import { BottomSheet, hideDialog, isDialogOpen } from "../../../base/dialog";
import { IconDragHandle } from "../../../base/icons";
import { connect } from "../../../base/redux";
import { StyleType } from "../../../base/styles";
import { SharedDocumentButton } from "../../../etherpad";
import { InviteButton } from "../../../invite";
import { LobbyModeButton } from "../../../lobby/components/native";
import { AudioRouteButton } from "../../../mobile/audio-mode";
import { LiveStreamButton, RecordButton } from "../../../recording";
import { RoomLockButton } from "../../../room-lock";
import { ClosedCaptionButton } from "../../../subtitles";
import { TileViewButton } from "../../../video-layout";
import { VideoShareButton } from "../../../youtube-player/components";
import HelpButton from "../HelpButton";
import MuteEveryoneButton from "../MuteEveryoneButton";

import AudioOnlyButton from "./AudioOnlyButton";
import MoreOptionsButton from "./MoreOptionsButton";
import RaiseHandButton from "./RaiseHandButton";
import ScreenSharingButton from "./ScreenSharingButton.js";
import ToggleCameraButton from "./ToggleCameraButton";
import styles from "./styles";

// Import added by Gibraan Jafar
import Participants from "./Participants";
//import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';

// const PARTICIPANTS = [
//   { name: "Priti B (Host)" },
//   { name: "Priti A" },
//   { name: "Girish S" },
//   { name: "Manish K" },
//   { name: "Manish G" },
//   { name: "Bhanu K" },
//   { name: "Prakash N" },
//   { name: "Pragati J" },
//   { name: "Sagar S" },
//   { name: "Gibraan J" },
// ];

var serverURL = "https://winjit.tring.us:3000/api/v1.0/meeting/getMeetingDetailsById";


/**
 * The type of the React {@code Component} props of {@link OverflowMenu}.
 */
type Props = {
  /**
   * The color-schemed stylesheet of the dialog feature.
   */
  _bottomSheetStyles: StyleType,

  /**
   * True if the overflow menu is currently visible, false otherwise.
   */
  _isOpen: boolean,

  /**
   * Whether the recoding button should be enabled or not.
   */
  _recordingEnabled: boolean,

  /**
   * Used for hiding the dialog when the selection was completed.
   */
  dispatch: Function,
};

type State = {
  /**
   * True if the bottom scheet is scrolled to the top.
   */
  scrolledToTop: boolean,

  /**
   * True if the 'more' button set needas to be rendered.
   */
  showMore: boolean,

  /* True if the participants modal is open
   */
  isParticipantModelVisible: boolean,
  
  // Experiment by Gibraan Jafar on 26th Nov 2020.
  ParticipantsList: []
};

/**
 * The exported React {@code Component}. We need it to execute
 * {@link hideDialog}.
 *
 * XXX It does not break our coding style rule to not utilize globals for state,
 * because it is merely another name for {@code export}'s {@code default}.
 */
let OverflowMenu_; // eslint-disable-line prefer-const

/**
 * Implements a React {@code Component} with some extra actions in addition to
 * those in the toolbar.
 */
class OverflowMenu extends PureComponent<Props, State> {
  /**
   * Initializes a new {@code OverflowMenu} instance.
   *
   * @inheritdoc
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      scrolledToTop: true,
      showMore: false,
      isParticipantModelVisible: false,
      ParticipantsList: []
    };


    // Bind event handlers so they are only bound once per instance.
    this._onCancel = this._onCancel.bind(this);
    this._onSwipe = this._onSwipe.bind(this);
    this._onToggleMenu = this._onToggleMenu.bind(this);
    this._renderMenuExpandToggle = this._renderMenuExpandToggle.bind(this);
    this._onModalOpen = this._onModalOpen.bind(this);
    this._renderParticipantsList = this._renderParticipantsList.bind(this);
    
  }

  
  /**
   * Implements React's {@link Component#render()}.
   *
   * @inheritdoc
   * @returns {ReactElement}
   */


  

  _onModalOpen() {
    console.log(" Start _onModalOpen() ");
    const payload = {
      meetingId: "5fbe47f43001a7457742136d",
      };
    var tempParticipantsList = [];
    // axios.post(serverURL,payload)
    //      .then( response =>  {
    //         this.setState({ ParticipantsList: response.data.result.peopleInfo }, () => {
    //           console.log(" Trying to update ParticipantsList in _renderParticipantsList");
    //         });
    axios.post(serverURL, payload)
         .then( response => {
            this.setState({ isParticipantModelVisible: true,
                            ParticipantsList: response.data.result.peopleInfo }, () => {
                              console.log(" callback after updating isParticipantModelVisible and ParticipantsList in same this.setState",this.state)
                            })
         })
         .catch(error => {
           console.log(error);
         });


    // this.setState({ isParticipantModelVisible: true }, () => {
    //     // for some reason this is not getting called properly.
    //     console.log(" callback after this should open the modal ", this.state);
    //  });
  }

  _renderParticipantsList() {
    // console.log(" Start _renderParticipantsList() ");
    
    
    //   // var arr  = response.data.result.peopleInfo;
    //   // console.log("Getting meeting details => \n");
    //   // for(a in arr){
    //   //   //console.log(arr[a].userName);
    //   //   tempParticipantsList.push({name: arr[a].userName});
    //   //   console.log(tempParticipantsList);
    //   // }
    //   // console.log(" Array.isArray() => ",Array.isArray(tempParticipantsList));
      
    //   //console.log("\n Getting meeting details => ",response.data.result.peopleInfo,"\n");        
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

  }

  render() {
    const { _bottomSheetStyles } = this.props;
    const { showMore, isParticipantModelVisible, ParticipantsList } = this.state;

    //useState approach won't work cuz we are dealing with class based components
    //const [ParticipantsList, setParticipantsList] = useState([]);

    console.log(" isParticipantsModelVisible inside render => ", isParticipantModelVisible);
    console.log(" ParticipantsList inside render => ",ParticipantsList);

    const buttonProps = {
      afterClick: this._onCancel,
      showLabel: true,
      styles: _bottomSheetStyles.buttons,
    };

    const moreOptionsButtonProps = {
      ...buttonProps,
      afterClick: this._onToggleMenu,
      visible: !showMore,
    };

    return (
      <>
        {isParticipantModelVisible ? (
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={isParticipantModelVisible}
            // style={{
            //     backgroundColor: "#000",
            //     flex: 1,
            //     justifyContent: "center",
            //     alignItems: "center"
            // }}
            onRequestClose={() =>
              this.setState({ isParticipantModelVisible: false })
            }
          >
                <View
                    style = {{alignItems: "stretch",
                              flexDirection: "row"}}
                >
                    <TouchableOpacity
                        style={ParticipantModalStyle.buttonContainer}
                        onPress={() => {
                            this.setState({ isParticipantModelVisible: false })
                        }}
                    >
                       <Text style={ParticipantModalStyle.buttonText} > Close </Text>
                    </TouchableOpacity>

                    <Text style={ParticipantModalStyle.participantsText}> Participants </Text>
                </View>

                <View style={ParticipantModalStyle.UserContainer}>
                    <Text style={ParticipantModalStyle.UsersText}>
                        Users (10)
                    </Text>
                    {/* Here replace this.state.ParticipantsList with this.method name */}
                    {/* <Text>{this._renderParticipantsList()}</Text>  */}
                    <FlatList
                        keyExtractor={participant => participant.userName}
                        data={ParticipantsList}
                        renderItem={({item}) => {
                            return (
                                <View style={ParticipantModalStyle.ParticipantsFlatListContainer}>
                                    <Icon name="contacts" size={30} color="black" style={{flex: 2}}/>
                                    <Text style={ParticipantModalStyle.ParticipantsFlatList}>{item.userName}</Text>
                                    <Icon name="message1" size={25} color="black" style={{flex: 1}}/>
                                    <Feather name="mic-off" size={25} color="black" style={{flex: 1}}/>
                                    <Feather name="video" size={25} color="red" style={{flex: 1}}/>

                                </View>
                            );
                        }}
                    />
                </View>
            
          </Modal>
        ) : null}

        <BottomSheet
          onCancel={this._onCancel}
          onSwipe={this._onSwipe}
          renderHeader={this._renderMenuExpandToggle}
        >
          <Participants {...buttonProps} onModalOpen={this._onModalOpen} />
          <AudioRouteButton {...buttonProps} />
          <InviteButton {...buttonProps} />
          <AudioOnlyButton {...buttonProps} />
          <RaiseHandButton {...buttonProps} />
          <LobbyModeButton {...buttonProps} />
          <ScreenSharingButton {...buttonProps} />
          <MoreOptionsButton {...moreOptionsButtonProps} />
          <Collapsible collapsed={!showMore}>
            <ToggleCameraButton {...buttonProps} />
            <TileViewButton {...buttonProps} />
            <RecordButton {...buttonProps} />
            <LiveStreamButton {...buttonProps} />
            <VideoShareButton {...buttonProps} />
            <RoomLockButton {...buttonProps} />
            <ClosedCaptionButton {...buttonProps} />
            <SharedDocumentButton {...buttonProps} />
            <MuteEveryoneButton {...buttonProps} />
            <HelpButton {...buttonProps} />
          </Collapsible>
        </BottomSheet>
      </>
    );
  }

  _renderMenuExpandToggle: () => React$Element<any>;

  /**
   * Function to render the menu toggle in the bottom sheet header area.
   *
   * @returns {React$Element}
   */
  _renderMenuExpandToggle() {
    return (
      <View
        style={[
          this.props._bottomSheetStyles.sheet,
          styles.expandMenuContainer,
        ]}
      >
        <TouchableOpacity onPress={this._onToggleMenu}>
          {/* $FlowFixMeProps */}
          <IconDragHandle style={this.props._bottomSheetStyles.expandIcon} />
        </TouchableOpacity>
      </View>
    );
  }

  _onCancel: () => boolean;

  /**
   * Hides this {@code OverflowMenu}.
   *
   * @private
   * @returns {boolean}
   */
  _onCancel() {
    if (this.props._isOpen) {
      this.props.dispatch(hideDialog(OverflowMenu_));

      return true;
    }

    return false;
  }

  _onSwipe: (string) => void;

  /**
   * Callback to be invoked when swipe gesture is detected on the menu. Returns true
   * if the swipe gesture is handled by the menu, false otherwise.
   *
   * @param {string} direction - Direction of 'up' or 'down'.
   * @returns {boolean}
   */
  _onSwipe(direction) {
    const { showMore } = this.state;

    switch (direction) {
      case "up":
        !showMore &&
          this.setState({
            showMore: true,
          });

        return !showMore;
      case "down":
        showMore &&
          this.setState({
            showMore: false,
          });

        return showMore;
    }
  }

  _onToggleMenu: () => void;

  /**
   * Callback to be invoked when the expand menu button is pressed.
   *
   * @returns {void}
   */
  _onToggleMenu() {
    this.setState({
      showMore: !this.state.showMore,
    });
  }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
  return {
    _bottomSheetStyles: ColorSchemeRegistry.get(state, "BottomSheet"),
    _isOpen: isDialogOpen(state, OverflowMenu_),
  };
}

const ParticipantModalStyle = StyleSheet.create({
  ModalHeadText: {
    fontSize: 22,
    fontWeight: "bold",
    color: 'black'
  },
  CloseButton: {
    color: "blue",
  },

  buttonContainer: {
    //borderWidth: 1,
    borderColor: 'red',
    //elevation: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop : 17,
    paddingHorizontal: 12,
    flex: 1
},
buttonText: {
    fontSize: 18,
    color: "blue",
    alignSelf: "center",
    textTransform: "uppercase"
  },
participantsText: {
    fontWeight: "bold",
    //borderWidth: 1,
    //borderColor: "black",
    fontSize: 20,
    marginTop: 5,
    marginRight: 5,
    paddingVertical: 10,
    paddingLeft: 45,
    flex: 4,
    //textAlign: 'center',
},
UserContainer: {
    padding: 10,
    //borderColor: 'purple',
    //borderWidth: 1
},
UsersText: {
    //borderColor: 'blue',
    //borderWidth: 1,
    fontWeight: 'bold',
    paddingTop: 35,
    paddingBottom: 5, 
    height: 60
},
ParticipantsFlatListContainer: {
    height: 50,
    //borderColor: "pink",
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
},
ParticipantsFlatList: {
    paddingVertical: 15,
    paddingLeft: 10,
    //borderColor: 'green',
    //borderWidth: 1,
    flex: 5,
}
});

OverflowMenu_ = connect(_mapStateToProps)(OverflowMenu);

export default OverflowMenu_;
