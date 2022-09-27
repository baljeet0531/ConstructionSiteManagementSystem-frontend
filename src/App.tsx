
import React from 'react';
import './App.css';

import { HStack } from '@chakra-ui/react';
import { useLazyQuery, gql } from '@apollo/client';
import Login from './Components/Login';
import Sidebar from './Components/Sidebar';
import MainScreen from './Components/MainScreen';

const GET_FEATURE = gql`
  query Feature($feature: String!){
    hello(name: $feature)
  }
`

const QUERY_LOGIN = gql`
  query{
    auth(username:"johndoe",password:"secret"){
      accessToken
      role
    }
  } 
`

function App() {

  const [featureName, setFeatureName] = React.useState("")

  const [getFeature, featureResult] = useLazyQuery(GET_FEATURE)
  const [queryLogin, loginResult] = useLazyQuery(QUERY_LOGIN)

  const [login, setLogin] = React.useState(false)

  if (featureResult) {
    if (featureResult.loading) console.log("loading feature")
    if (featureResult.error) console.log(featureResult.error)
  }
  if (loginResult) {
    if (loginResult.loading) console.log("loading login")
    if (loginResult.error) console.log(loginResult.error)
  }

  React.useEffect(() => {
    if (featureResult && featureResult.data)
      setFeatureName(featureResult.data.hello)
    if (loginResult && loginResult.data && loginResult.data.auth)
      setLogin(true)
  }, [featureResult.data, loginResult.data, featureResult, loginResult])

  const features = [
    "工地管理",
    "排程管理",
    "人才管理",
    "工安表單",
    "進度報表",
    "照片管理",
    "總覽"
  ]

  return (
    <div className="App">
      {
        login ?
          (
            <HStack align="top">
              <Sidebar features={features} handleClick={getFeature} />
              <MainScreen>{featureName}</MainScreen>
            </HStack>
          ) :
          <Login handleLogin={queryLogin}></Login>
      }
    </div>
  );
}

export default App;