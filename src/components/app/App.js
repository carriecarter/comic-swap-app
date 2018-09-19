import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from './PrivateRoute';
import Auth from '../auth/auth';
import styles from './App.css';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth } from '../auth/reducers';

import Header from './Header';
import ComicsList from '../comics/ComicsList';
import Footer from './Footer';

class App extends Component {

  static propTypes = {
    tryLoadUser: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount(){
    this.props.tryLoadUser();
  }

  render() {
    const { checkedAuth } = this.props;

    return (
      <Router>
        <Fragment>
          <div className={styles.app}>
            <header>
              <h1>Comic Swap</h1>
              <Header/>
            </header>
            {checkedAuth &&
            <main>
              <Switch>
                <PrivateRoute exact path="/" component={ComicsList}/>
                <Route path="/auth" component={Auth}/>
                <Redirect to="/"/>
              </Switch>
            </main>
            }

            <footer>
              <Footer/>
            </footer>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { tryLoadUser }
)(App);