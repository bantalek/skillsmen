import React from 'react';
import {
  View,
  ScrollView,
  Image,
} from 'react-native';
import styles from '../styles/ChatList';
import ChatTile from '../components/ChatTile';

const blueImg = require('../assets/bluePatternBackground.png');

class ChatList extends React.Component {
  render() {
    const { chatList, goToChat, profile } = this.props;
    return (
      <View >
        <Image
          style={styles.bluePattern}
          source={blueImg}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {chatList &&
            chatList.map((chat, i) =>
            (<ChatTile
              key={i}
              chat={chat}
              goToChat={goToChat}
              profile={profile}
            />),
          )}
        </ScrollView>
      </View>
    );
  }
}

ChatList.propTypes = {
  chatList: React.PropTypes.array,
  goToChat: React.PropTypes.func,
  profile: React.PropTypes.object,
};

export default ChatList;