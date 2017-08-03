import React from 'react';
import PropTypes from 'prop-types';
import {gql, graphql} from 'react-apollo';
import {connect} from 'react-redux';
import * as actions from '../../redux/Actions';
import Links from '../../components/Links';

const renderInput = (updateForm, label, key, currentValue) => <label>{label}:
  <input value={currentValue} onChange={({target: {value}}) => updateForm({key, value})}/>
</label>;

class Create extends React.PureComponent {

  static propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    updateForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired
  }

  render() {

    const {firstName, lastName, updateForm, mutate, resetForm} = this.props;
    const input = renderInput.bind(null, updateForm);

    return (
      <div>
        <p>User creation form</p>
        <Links />
        {input('First name', 'firstName', firstName)}
        {input('Last name', 'lastName', lastName)}
        {mutate && <button
          children='Create!'
          onClick={async () => {
            await mutate({variables: {firstName, lastName}});
            resetForm();
            this.props.history.push('/');
          }}
        />}
        <button children='Clear' onClick={resetForm}/>
      </div>
    )
  }
}

const withCreateUser = component => graphql(gql`mutation createUser($firstName: String!, $lastName: String!) {
    
    createUser(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
	
  }`)(component);

const stateToProps = ({forms}) => ({...forms.createUser});

const dispatchToProps = {
  updateForm: params => actions.updateForm({form: 'createUser', ...params}),
  resetForm: actions.resetForm.bind(null, {form: 'createUser'})
};

export default connect(stateToProps, dispatchToProps)(withCreateUser(Create));
