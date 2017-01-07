import React, {Component, PropTypes} from 'react';

const borderRadius = '2px';
const nullPx = '0px';
const px = 'px';
const position = 'absolute';
const borderStyle = 'solid #35b3ee';
const borderSize = '1px';

function isVisible(element) {
	let invisibleParent = false;
	if ($(element).css("display") === "none") {
		invisibleParent = true;
	} else {
		$(element).parents().each(function (i, el) {
			if ($(el).css("display") === "none") {
				invisibleParent = true;
				return false;
			}
			return true;
		});
	}
	return !invisibleParent;
}

class SelectedOverlay extends Component {

	constructor(props) {
		super(props);
		this.isSubscribed = false;
		this.state = {
			newPos: null,
			border: '' + (props.bSize ? props.bSize : borderSize) + ' ' + (props.bStyle ? props.bStyle : borderStyle),
			contextMenuType: null,
			contextMenuItem: null,
			isOverlay: false,
		};
		this.startRefreshTimer = this.startRefreshTimer.bind(this);
		this.refreshPosition = this.refreshPosition.bind(this);
		this.subscribeToInitialState = this.subscribeToInitialState.bind(this);
		this.setSelectedPosition = this.setSelectedPosition.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.handleMouseEnterLine = this.handleMouseEnterLine.bind(this);
		this.handleMouseLeaveLine = this.handleMouseLeaveLine.bind(this);
	}

	componentDidMount() {
		this.bodyWidth = document.body.clientWidth;
		this.bodyHeight = document.body.clientHeight;
		this.subscribeToInitialState();
	}

	componentWillUnmount() {
		if (this.refreshTimerId) {
			clearTimeout((this.refreshTimerId));
			this.refreshTimerId = undefined;
		}
		this.$DOMNode = undefined;
	}

	componentDidUpdate() {
		this.subscribeToInitialState();
	}

	componentWillReceiveProps(nextProps) {
		this.isSubscribed = false;
	}

	subscribeToInitialState() {
		if (!this.isSubscribed) {
			const {selectedKey, initialState} = this.props;
			if (selectedKey && initialState) {
				const element = initialState.elements[selectedKey];
				if (element) {
					const targetDOMNode = element.getDOMNode();
					this.isSubscribed = true;
					this.setSelectedPosition({targetDOMNode});
				} else {
					this.resetTimer();
					this.setState({newPos: null});
				}
			}
			this.isSubscribed = true;
		}
	}

	startRefreshTimer() {
		this.refreshTimerId = setTimeout(() => {
			this.refreshPosition();
		}, 500);
	}

	refreshPosition() {
		const $DOMNode = this.$DOMNode;
		if ($DOMNode) {
			const {newPos: oldPos} = this.state;
			if (isVisible($DOMNode)) {
				let pos = $DOMNode.offset();
				let newPos = {
					top: pos.top,
					left: pos.left,
					width: $DOMNode.outerWidth(),
					height: $DOMNode.outerHeight()
				};
				if (!oldPos ||
					newPos.top !== oldPos.top ||
					newPos.left !== oldPos.left ||
					newPos.width !== oldPos.width ||
					newPos.height !== oldPos.height) {
					this.setState({newPos});
				}
			} else {
				if (oldPos) {
					this.setState({newPos: null});
				}
			}
		}
		this.startRefreshTimer();
	}

	resetTimer() {
		if (this.refreshTimerId) {
			clearTimeout((this.refreshTimerId));
			this.refreshTimerId = undefined;
		}
		this.$DOMNode = undefined;
	}

	setSelectedPosition(options) {
		let targetDOMNode = options.targetDOMNode;
		this.resetTimer();
		if (targetDOMNode) {
			this.$DOMNode = $(targetDOMNode);
			this.refreshPosition();
		} else {
			console.error('')
		}
	}

	handleButtonClick = (selectedKey, func) => (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (func) {
			func(selectedKey, e.metaKey || e.ctrlKey)
		}
	};

	handleMouseEnterLine(e) {
		e.preventDefault();
		e.stopPropagation();
		if(!this.state.isOverlay){
			this.setState({isOverlay: true});
		}
	}

	handleMouseLeaveLine(e) {
		e.preventDefault();
		e.stopPropagation();
		if(this.state.isOverlay){
			this.setState({isOverlay: false});
		}
	}

	render() {
		const {newPos, border, isOverlay} = this.state;
		const {selectedKey, initialState: {onLoadOptions, isMultipleSelection}} = this.props;
		const {initialState: {onCopy, onCut, onDelete, onBefore, onFirst, onLast, onAfter, onReplace, isClipboardEmpty}} = this.props;
		const isMultiple = isMultipleSelection();
		// const isEmpty = isClipboardEmpty();
		let content;
		if (newPos) {
			const endPoint = {
				top: newPos.top + px,
				left: newPos.left + px,
				width: '1px',
				height: '1px',
				position: position,
				zIndex: 1035
			};
			const topLine = {
				top: nullPx,
				left: nullPx,
				width: (newPos.width - 1) + 'px',
				height: nullPx,
				position: position,
				borderTopLeftRadius: borderRadius,
				borderTopRightRadius: borderRadius,
				borderTop: border,
				opacity: 0.5,
			};
			const leftLine = {
				top: nullPx,
				left: nullPx,
				width: nullPx,
				height: (newPos.height - 1) + px,
				position: position,
				borderTopLeftRadius: borderRadius,
				borderBottomLeftRadius: borderRadius,
				borderLeft: border,
				opacity: 0.5,
			};
			const bottomLine = {
				bottom: '-' + (newPos.height - 1) + px,
				left: nullPx,
				width: (newPos.width - 1) + px,
				height: nullPx,
				position: position,
				borderBottomLeftRadius: borderRadius,
				borderBottomRightRadius: borderRadius,
				borderBottom: border,
				opacity: 0.5,
			};
			const rightLine = {
				right: '-' + (newPos.width - 1) + px,
				top: nullPx,
				width: nullPx,
				height: newPos.height + px,
				position: position,
				borderTopRightRadius: borderRadius,
				borderBottomRightRadius: borderRadius,
				borderRight: border,
				opacity: 0.5,
			};
			let buttonLine;

			if (!isMultiple) {
				buttonLine = {
					display: 'flex',
					flexDirection: 'row',
					position: position
				};
				if ((newPos.left + 400) < this.bodyWidth) {
					buttonLine.left = nullPx;
				} else {
					buttonLine.right = '-' + (newPos.width - 1) + px;
					buttonLine.minWidth = newPos.width + px;
				}
				if (newPos.height < 50) {
					if (newPos.top < 50) {
						buttonLine.bottom = 'calc(-' + (newPos.height - 1) + px + ' - 23px)';
					} else {
						buttonLine.top = '-23px';
					}
				} else {
					buttonLine.top = '0px';
				}
			}

			let overlay;
			if(isOverlay) {
				overlay = {
					top: nullPx,
					left: nullPx,
					width: newPos.width + px,
					height: newPos.height + px,
					opacity: 0.2,
					backgroundColor: '#35b3ee',
				};
			}

			content = (
				<div style={endPoint}>
					{isOverlay && <div style={overlay} />}
					<div style={topLine} />
					<div style={leftLine} />
					<div style={bottomLine} />
					<div style={rightLine} />
					{!isMultiple ?
						<div
							style={buttonLine}
							onMouseOver={this.handleMouseEnterLine}
							onMouseOut={this.handleMouseLeaveLine}
						>
							<div className="selected-overlay-button umy-icon-append-before"
								 title="Append before selected"
								 onClick={this.handleButtonClick(selectedKey, onBefore)}/>
							<div className="selected-overlay-button umy-icon-insert-first"
								 title="Insert into selected as first child"
								 onClick={this.handleButtonClick(selectedKey, onFirst)}
								 style={{borderRight: '1px solid #FFFFFF'}}/>
							<div className="selected-overlay-button umy-icon-edit selected-overlay-button-success"
								 onClick={this.handleButtonClick(selectedKey, onLoadOptions)}
								 title="Edit component properties"
								 style={{borderRight: '1px solid #FFFFFF'}}/>
							<div className="selected-overlay-button umy-icon-copy"
								 title="Copy selected into clipboard"
								 onClick={this.handleButtonClick(selectedKey, onCopy)}/>
							<div className="selected-overlay-button umy-icon-cut"
								 title="Cut selected into clipboard"
								 onClick={this.handleButtonClick(selectedKey, onCut)}/>
							<div className="selected-overlay-button umy-icon-replace"
								 title="Replace selected"
								 onClick={this.handleButtonClick(selectedKey, onReplace)}/>
							<div className="selected-overlay-button umy-icon-delete selected-overlay-button-warning"
								 title="Remove component from the page"
								 onClick={this.handleButtonClick(selectedKey, onDelete)}
								 style={{borderLeft: '1px solid #FFFFFF'}}/>
							<div className="selected-overlay-button umy-icon-insert-last"
								 title="Insert into selected as last child"
								 onClick={this.handleButtonClick(selectedKey, onLast)}
								 style={{borderLeft: '1px solid #FFFFFF'}}/>
							<div className="selected-overlay-button umy-icon-append-after"
								 title="Append after selected"
								 onClick={this.handleButtonClick(selectedKey, onAfter)}/>
						</div> : null
					}
				</div>
			);
		} else {
			const style = {
				display: 'none'
			};
			content = (<span style={style}/>);
		}
		return content;
	}

}

export default SelectedOverlay;
