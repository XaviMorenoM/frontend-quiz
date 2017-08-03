import React from 'react';
import PropTypes from 'prop-types';
import {gql, graphql} from 'react-apollo';
import Links from '../../components/Links';

class View extends React.PureComponent {

	static propTypes = {
		data: PropTypes.shape({
			loading: PropTypes.bool.isRequired,
			User: PropTypes.shape({
				firstName: PropTypes.string,
				lastName: PropTypes.string,
				createdAt: PropTypes.string,
				updatedAt: PropTypes.string.isRequired,
			})
		}).isRequired
	}

	render() {

		const {data = {}} = this.props;
		return (
			<div>
				<p>User view</p>
				<Links />
				{
					data.loading ? <h1 children='Loading, please wait...' /> :
						<ul>
							<li>First name: {data.User.firstName}</li>
							<li>Last name: {data.User.lastName}</li>
							<li>Created at: {data.User.createdAt}</li>
							<li>Last update: {data.User.updatedAt}</li>
						</ul>
				}
			</div>
		)
	}
}


export default graphql(gql`query User($id: ID!) {
	User(id: $id) {
    firstName
    lastName
    createdAt
    updatedAt
  }
}`, {options: ({match: {params}}) => ({variables: params})})(View);
