import { Home } from './Home';
import React, { useContext } from 'react';
import { View } from 'react-native';
import {
  createAppContainer,
  CreateNavigatorConfig,
  NavigationRoute,
  NavigationStackRouterConfig
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp
} from 'react-navigation-stack';
function stackNavigatorOptions(
  initialRouteName: string
): CreateNavigatorConfig<
  NavigationStackConfig,
  NavigationStackRouterConfig,
  NavigationStackOptions,
  NavigationStackProp<NavigationRoute, any>
> {
  return {
    cardStyle: {
      // backgroundColor: theme.backgroundColor
    },
    headerMode: 'none',
    initialRouteName,
    defaultNavigationOptions: {
      // FIXME the `headerVisible` field has been moved away from this config
      // @ts-ignore
      headerVisible: false
    }
  };
}

const RootStack = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: MainStack
      },
      ShareModal: {
        screen: ShareScreen
      }
    },
    {
      mode: 'modal',
      headerMode: 'none',
      transitionConfig: () => fadeIn()
    }
  )
);
// function renderScreen(api?: Api, error?: string) {
function renderScreen() {
  // if (error) {
  //   return <ErrorStack />;
  // }
  //
  // if (!api) {
  //   return <Loading />;
  // }

  return <RootStack />;
}

export function Screens() {
  // const { api } = useContext(ApiContext);
  // const { error } = useContext(ErrorContext);

  const stack = renderScreen();

  return <View >{stack}</View>;
}
