import React from 'react'
import {
  StyleRoot,
} from 'radium'
import {
  ConnectedRouter,
} from 'react-router-redux'
import {
  Route,
  Switch,
} from 'react-router-dom'
import {
  ApolloProvider,
} from 'react-apollo'
import Store, {
  browserHistory,
  client,
} from './redux/Store'

import App from './App'
import Home from './views/Home'
import About from './views/About'
import View from './views/View';
import Create from './views/Create';

// eslint-disable-next-line
require('file-loader?name=sitemap.xml!../sitemap.xml')

browserHistory.listen((data) => {
  /* this scrolls the view to the top of the page on route changes */
  window.scrollTo(0, 0)
})

const Root = () => (
  <ApolloProvider store={Store} client={client}>
    <StyleRoot>
      <ConnectedRouter history={browserHistory}>
        <App>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/view/:id" component={View} />
            <Route exact path="/create" component={Create} />
          </Switch>
        </App>
      </ConnectedRouter>
    </StyleRoot>
  </ApolloProvider>
)

export default Root
