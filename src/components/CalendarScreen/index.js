import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import CircularSlider from 'react-native-circular-slider';

const WAKE_ICON = () => (
  <G>
    <Path d="M2,12.9h1.7h3h2.7h3H14c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7c-0.9,0-1.7-0.7-1.7-1.7v-4
      c0-2.1-1.5-3.8-3.4-4.2C9,1.6,9,1.4,9,1.3c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1c0,0.2,0,0.3,0.1,0.4c-2,0.4-3.4,2.1-3.4,4.2v4
      c0,0.9-0.7,1.7-1.7,1.7c-0.4,0-0.7,0.3-0.7,0.7C1.3,12.6,1.6,12.9,2,12.9z"/>
    <Path d="M8,15.7c1.1,0,2.1-0.9,2.1-2.1H5.9C5.9,14.8,6.9,15.7,8,15.7z"/>
  </G>
);

const BEDTIME_ICON = () => (
  <G>
    <Path d="M11.7,10.5c-3.6,0-6.4-2.9-6.4-6.4c0-0.7,0.1-1.4,0.4-2.1C3.1,2.9,1.2,5.3,1.2,8.1c0,3.6,2.9,6.4,6.4,6.4
      c2.8,0,5.2-1.8,6.1-4.4C13.1,10.4,12.4,10.5,11.7,10.5z"/>
    <Path d="M8,7.6l2-2.5H8V4.4H11v0.6L9,7.6h2v0.7H8V7.6z"/>
    <Path d="M11.7,5.4l1.5-1.9h-1.4V3h2.2v0.5l-1.5,1.9h1.5v0.5h-2.2V5.4z"/>
    <Path d="M9.4,3l1.1-1.4h-1V1.3H11v0.4L9.9,3H11v0.4H9.4V3z"/>
  </G>
);

const CalendarScreen = () => (
  <Container>
    <Header>
      <Left>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right />
    </Header>
    <Content>
      <Calendar/>
        <CircularSlider
        startAngle={this.state.startAngle}
        angleLength={this.state.angleLength}
        onUpdate={({ startAngle, angleLength }) => this.setState({ startAngle, angleLength })}
        segments={5}
        strokeWidth={40}
        radius={145}
        gradientColorFrom="#ff9800"
        gradientColorTo="#ffcf00"
        showClockFace
        clockFaceColor="#9d9d9d"
        bgCircleColor="#171717"
        stopIcon={<WAKE_ICON></WAKE_ICON>}
        startIcon={<BEDTIME_ICON></BEDTIME_ICON>}
      />
    </Content>
  </Container>
)

export default CalendarScreen
