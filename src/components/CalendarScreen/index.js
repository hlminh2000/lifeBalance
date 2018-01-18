import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
      <Calendar
        current={'2012-03-01'}
        minDate={'2012-05-10'}
        maxDate={'2012-05-30'}
        onDayPress={(day) => {console.log('selected day', day)}}
        monthFormat={'yyyy MM'}
        onMonthChange={(month) => {console.log('month changed', month)}}
        hideArrows={true}
        renderArrow={(direction) => (<Arrow />)}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={true}
        showWeekNumbers={true}/>
    </Content>
  </Container>
)

export default CalendarScreen
