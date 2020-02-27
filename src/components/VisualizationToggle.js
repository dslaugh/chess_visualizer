import React from 'react';

export default class VisualizationToggle extends React.Component {
	render() {
		return (
			<div className="show-visualizations-container">
				<div>
					<div className="visualizations-header">Visualizations</div>
					<input
						type="checkbox"
						name="show_white_visual"
						id="show_white_visual"
						checked={ this.props.showWhiteVisualizations }
						onChange={ () => this.props.onChange('white') }
					/>
					<label htmlFor="show_white_visual" >Show White</label>
				</div>
				<div>
					<input
						type="checkbox"
						name="show_black_visual"
						id="show_black_visual"
						checked={ this.props.showBlackVisualizations }
						onChange={ () => this.props.onChange('black') }
					/>
					<label htmlFor="show_black_visual">Show Black</label>
				</div>
			</div>
		)
	}
}
