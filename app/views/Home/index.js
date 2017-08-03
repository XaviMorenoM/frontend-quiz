import React from 'react';
import PropTypes from 'prop-types';
import {gql, graphql} from 'react-apollo';
import Radium from 'radium';
import Links, {Link} from '../../components/Links';
import styles from './styles';

@Radium
class Home extends React.PureComponent {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      allUsers: PropTypes.array
    }).isRequired
  }

  render() {

    const {data = {}} = this.props;
    return (
      <div>
        <p>Home Component</p>
        <Links />
        {
          data.loading ? <h1 children='Loading, please wait...'/> :
            data.allUsers.map(({id, firstName, lastName}) =>
              <Link to={`view/${id}`} key={`${id}`}>
                <div style={styles.user} key={`user-${id}`}>
                  <div style={styles.userField} children={firstName}/>
                  <div style={styles.userField} children={lastName}/>
                </div>
              </Link>
            )
        }
      </div>
    )
  }
}


export default graphql(gql`query AllUsers {
	allUsers {
    id
    firstName
    lastName
  }
}`)(Home);
