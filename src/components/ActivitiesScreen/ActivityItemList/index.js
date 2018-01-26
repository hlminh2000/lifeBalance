import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ListView } from 'react-native'
import {
  Container, Content, Button,
  Left, Right, Body, Icon, List,
  ListItem, Card, CardItem, H1,
  Item, Label, Form
} from 'native-base'

const ActivityItem = ({ activity }) => (
  <ListItem icon key={activity.id}>
    <Left>
      <Icon name="plane" />
    </Left>
    <Body>
      <Text> {activity.title} </Text>
    </Body>
  </ListItem>
)

// export default ({ activities, onInfoPressed, onDeletePressed }) => {
//   const dataSource = new ListView.DataSource({
//     rowHasChanged: (r1, r2) => r1 !== r2
//   })
//   return (
//     <List
//       enableEmptySections={true}
//       dataSource={ dataSource.cloneWithRows(activities) }
//       renderRow={(activity) => (
//         <ActivityItem activity={activity}/>
//       )}
//       renderLeftHiddenRow={data => (
//         <Button full onPress={ () => onInfoPressed(data) }>
//           <Icon active name="information-circle" />
//         </Button>
//       )}
//       renderRightHiddenRow={(data, secId, rowId, rowMap) => (
//         <Button full danger onPress={ () => onDeletePressed(data) }>
//           <Icon active name="trash" />
//         </Button>
//       )}
//       leftOpenValue={75}
//       rightOpenValue={-75}
//     />
//   )
// }

export default class ActivityItemList extends Component {
  render(){
    const {
      onInfoPressed,
      onDeletePressed,
      activities
    } = this.props
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    return (
      <List
        closeOnRowBeginSwipe={true}
        enableEmptySections={true}
        dataSource={ dataSource.cloneWithRows(activities) }
        renderRow={(activity) => (
          <ActivityItem activity={activity}/>
        )}
        renderLeftHiddenRow={data => (
          <Button full onPress={ () => {
            onInfoPressed(data)
            this.setState({})
          }}>
            <Icon active name="information-circle" />
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button full danger onPress={ () => {
            onDeletePressed(data)
            this.setState({})
          }}>
            <Icon active name="trash" />
          </Button>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    )
  }
}
