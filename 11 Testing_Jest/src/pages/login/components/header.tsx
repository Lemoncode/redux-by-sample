import * as React from "react";
const styles = require('./header.css');

export const Header = () => {
	return (
		<div className={`panel-heading ${styles.header}`}>
			<h3 className="panel-title">Please sign in</h3>
		</div>
	);
}
