
type Props = {
	/**
	 * Text to show. You can pass a Text component for custom style.
	 */
	text: string | React.ReactChild
	/**
	 * Custom text for "read more" button. You can pass a Text component for custom style.
	 */
	readMoreText?: string | React.ReactChild
	/**
	 * Custom text for "show less" button. You can pass a Text component for custom style.
	 */
	showLessText?: string | React.ReactChild
	/**
	 * Line height for the rendered text
	 * @default 20
	 */
	lineHeight?: number
	/**
	 * Max number of lines to render when collapsed
	 * @default 3
	 **/
	numberOfLines?: number
}

export default class RNSimpleReadMore extends React.PureComponent<Props> {

}