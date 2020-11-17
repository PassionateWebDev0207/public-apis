import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import AppHeader from './components/PageHeader';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import PageThree from './components/PageThree';
import PageNotFound from './components/PageNotFound';

const App = () => {
  return (
    <AppContainer>
      <Router>
        <AppHeader />
        <AppBody>
          <Switch>
            <Route exact path="/" component={PageOne} />
            <Route path="/page-two" component={PageTwo} />
            <Route path="/page-three" component={PageThree} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </AppBody>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 60px calc(100vh - 60px);
  width: 100%;
  height: 100vh;
`;

const AppBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export default App;
