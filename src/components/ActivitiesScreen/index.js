import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base'
import HeaderBar from '../HeaderBar/index.js'


const ActivitiesScreen = () => (
  <Container>
    <HeaderBar
      title="My Activities"
    />
    <Content>
      <Text>
        This is Content Section
      </Text>
    </Content>
    <Footer>
      <FooterTab>
        <Button full>
          <Text>Footer</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
)

export default ActivitiesScreen
