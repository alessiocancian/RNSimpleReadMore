import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

/**
 * @param text: could be string or component (for nested Text)
 * @param readMoreText: custom read more component
 * @param showLessText: custom show less component
 * @param lineHeight: line height, used to calculate lines presented
 * @param numberOfLines: max allowed lines
 */

const defaultLineHeight = 20
const defaultNumberOfLines = 3
export default class RNSimpleReadMore extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			expanded: false,
			calculated: false,
			truncated: false,
			lineHeight: props.lineHeight || defaultLineHeight,
			numberOfLines: props.numberOfLines || defaultNumberOfLines
		}
	}

	updateView(height) {
		//magic is here
		let isTruncated = (Math.floor(height / this.state.lineHeight) > this.state.numberOfLines)
		this.setState({
			calculated: true,
			truncated: isTruncated
		})
	}

	tryMeasure(height) {
		if(!this.state.calculated) {
			this.updateView(height)
		}
	}

	onLayout(e) {
		let { width, height } = e.nativeEvent.layout
		if(width != 0) {
			this.tryMeasure(height)
		}
	}

	render() {
		let { calculated, truncated, expanded, counter } = this.state
		var lines = this.state.numberOfLines
		if(!calculated) {
			lines = this.state.numberOfLines + 1
		} else if(truncated && expanded) {
			lines = 0
		}
		let buttonTextStyle = {
			color: "#1c7fce",
			marginTop: 2,
			fontWeight: 'bold'
		}
		return (
			<View style={{alignSelf: 'stretch'}}>
				<Text style={{lineHeight: this.state.lineHeight}}
					numberOfLines={lines}
					ref={ref => {
						this.textRef = ref
					}}
					onLayout={this.onLayout.bind(this)}
					>
					{this.props.text}
				</Text>
				<View style={(truncated && !expanded) ? {} : {display: 'none'}}>
					<TouchableOpacity onPress={() => {this.setState({expanded: true})}}>
		        <Text style={buttonTextStyle}>{this.props.readMoreText || "Read more"}</Text>
		      </TouchableOpacity>
				</View>
				<View style={(truncated && expanded) ? {} : {display: 'none'}}>
					<TouchableOpacity onPress={() => {this.setState({expanded: false})}}>
		        <Text style={buttonTextStyle}>{this.props.showLessText || "Show less"}</Text>
		      </TouchableOpacity>
				</View>
			</View>
		)
	}
}
