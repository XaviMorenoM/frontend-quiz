import React from 'react';
import {
	Link as _Link
} from 'react-router-dom';

export const Link = (props) => <_Link style={{marginRight: 5}} {...props} />;

export default () => <div>
	<Link to="/" children='List of users'/>
	<Link to="/about" children='Link to about'/>
	<Link to="/create" children='Create user'/>
</div>;