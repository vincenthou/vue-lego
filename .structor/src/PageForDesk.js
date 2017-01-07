import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { forOwn, isObject, isString, extend, difference, keys, isEqual } from 'lodash';
import {getPagePathName} from './constants.js';
import components from '../app/components.js';
import pageDefaultModel from './model.js';

import MouseOverOverlay from './MouseOverOverlay.js';
import SelectedOverlay from './SelectedOverlay.js';
import HighlightedOverlay from './HighlightedOverlay.js';
import ClipboardOverlay from './ClipboardOverlay.js';

function wrapComponent(WrappedComponent, props) {
    const { onMouseDown, initialState, key, type } = props;
    const myName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var klass = React.createClass({
        subscribeToInitialState(){
            if(initialState){
                initialState.elements[key] = {
                    getDOMNode: () => {
                        this.initDOMNode();
                        return this.$DOMNode[0];
                    }
                }
            }
        },
        initDOMNode(){
            if(!this.$DOMNode){
                this.$DOMNode = $(ReactDOM.findDOMNode(this));
                this.$DOMNode
                    .on('mousedown', this.handleMouseDown)
                    .on('mouseover', this.handleMouseOver)
                    .on('mouseout', this.handleMouseOut)
                    .on('click', this.handleNoop)
                    .on('doubleclick', this.handleNoop)
                    .on('mouseup', this.handleNoop);
            }
        },
        componentWillMount(){
            this.subscribeToInitialState();
        },
        componentDidMount(){
            this.initDOMNode();
        },
        componentWillUnmount(){
            if(this.$DOMNode){
                this.$DOMNode
                    .off('mousedown')
                    .off('mouseover')
                    .off('mouseout')
                    .off('click')
                    .off('doubleclick')
                    .off('mouseup');
            }
            this.$DOMNode = undefined;
        },
        componentWillReceiveProps(nextProps){
            this.subscribeToInitialState();
        },
        handleMouseDown(e){
            if(!e.shiftKey){
                e.stopPropagation();
                e.preventDefault();
                if(onMouseDown){
                    onMouseDown(key, e.metaKey || e.ctrlKey);
                }
            }
        },
        handleMouseOver(e){
            if(initialState && initialState.onMouseOver){
                this.initDOMNode();
                initialState.onMouseOver({ targetDOMNode: this.$DOMNode[0], type, key});
            }
        },
        handleMouseOut(e){
            if(initialState && initialState.onMouseOut){
                this.initDOMNode();
                initialState.onMouseOut({ targetDOMNode: this.$DOMNode[0], remove: true});
            }
        },
        handleNoop(e){
            if(!e.shiftKey) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
        render: function(){
            return <WrappedComponent {...this.props} />;
        }
    });
    klass.displayName = myName;
    return klass;
}

function wrapPreviewComponent(WrappedComponent) {
    const myName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var klass = React.createClass({
        initDOMNode(){
            if(!this.$DOMNode){
                this.$DOMNode = $(ReactDOM.findDOMNode(this));
                this.$DOMNode
                    .on('keydown', this.handleNoop);
            }
        },
        componentDidMount(){
            this.initDOMNode();
        },
        componentWillUnmount(){
            if(this.$DOMNode){
                this.$DOMNode
                    .off('keydown');
            }
            this.$DOMNode = undefined;
        },
        handleNoop(e){
            e.stopPropagation();
            e.preventDefault();
        },
        render: function(){
            return <WrappedComponent {...this.props} />;
        }
    });
    klass.displayName = myName;
    return klass;
}

class PageForDesk extends Component {

    constructor(props, content) {
        super(props, content);

        this.state = {
            isEditModeOn: true,
            updateCounter: 0
        };
        this.elementTree = [];
        this.initialState = { elements: {} };

        this.updatePageModel = this.updatePageModel.bind(this);
        this.bindGetPagePath = this.bindGetPagePath.bind(this);
        this.bindGetPageModel = this.bindGetPageModel.bind(this);
        this.bindGetMarked = this.bindGetMarked.bind(this);
        this.bindOnComponentMouseDown = this.bindOnComponentMouseDown.bind(this);
        this.getModelByPathname = this.getModelByPathname.bind(this);
        this.updateMarks = this.updateMarks.bind(this);
        this.createElements = this.createElements.bind(this);
        this.createElement = this.createElement.bind(this);
        this.findComponent = this.findComponent.bind(this);
    }

    bindGetPagePath(func){
        this.getPagePath = func;
    }

    bindGetPageModel(func){
        this.getPageModel = func;
    }

    bindGetMarked(func){
        this.getMarked = func;
    }

    bindGetMode(func){
        this.getMode = func;
    }

    bindOnComponentMouseDown(func){
        this.onComponentMouseDown = func;
    }

    bindOnPathnameChanged(func){
        this.onPathnameChanged = func;
    }

    bindToState(signature, func){
        this.initialState[signature] = func;
    }

    componentDidMount(){
        if(window.onPageDidMount){
            window.onPageDidMount(this);
            if(this.updatePageModel){
                const pathname = getPagePathName(this.props.location.pathname);
                const nextPagePath = this.getPagePath(pathname);
                this.updatePageModel({
                    pathname: nextPagePath
                });
                if(this.onPathnameChanged){
                    this.onPathnameChanged(nextPagePath);
                }
            }
        }
    }

    componentWillUnmount(){
        this.initialState = undefined;
        this.elementTree = undefined;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname !== this.props.location.pathname
            || isEqual(nextProps.location.query, this.props.location.query) ){
            const pathname = getPagePathName(nextProps.location.pathname);
            const nextPagePath = this.getPagePath(pathname);
            this.updatePageModel({
                pathname: nextPagePath
            });
            if(this.onPathnameChanged){
                this.onPathnameChanged(nextPagePath);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.state.updateCounter !== nextProps.updateCounter);
    }

    updatePageModel(options){
        let {pathname} = options;
        let pageModel = this.getModelByPathname(pathname);
        const isEditModeOn = this.getMode();
        this.elementTree = this.createElements(pageModel, this.initialState, {
            isEditModeOn: isEditModeOn
        });
        this.setState({
            pathname: pathname,
            isEditModeOn: isEditModeOn,
            updateCounter: this.state.updateCounter + 1
        });
    }

    updateMarks(options){
        let {pathname} = options;
        this.setState({
            pathname: pathname,
            updateCounter: this.state.updateCounter + 1
        });
    }

    getModelByPathname(pathname){
        let pageModel = this.getPageModel(pathname);
        if(!pageModel){
            pageModel = pageDefaultModel;
            pageModel.children[0].children[0].modelNode.text =
                'Route was not found: ' + pathname + '. Try to select another route.';
        }
        return pageModel;
    }

    findComponent(index, componentName, level){
        let result = null;
        if(index && isObject(index) && level <= 1){
            level++;
            forOwn(index, (value, key) => {
                if(!result){
                    if(key === componentName){
                        result = value;
                    } else if(value && isObject(value)){
                        result = this.findComponent(value, componentName, level);
                    }
                }
            });
        }
        return result;
    }

    createElement(node, initialState, options){

        let type = 'div';
        let modelNode = node.modelNode;
        if(modelNode.type){
            type = this.findComponent(components, modelNode.type, 0);
            if(!type){
                type = modelNode.type;
            }
        }
        let props = extend({}, {
            key: node.key
        }, modelNode.props);

        if(node.props){
            forOwn(node.props, (prop, propName) => {
                props[propName] = this.createElement(prop, initialState, options);
            });
        }

        let nestedElements = null;

        if(node.children && node.children.length > 0){
            let children = [];
            node.children.forEach(node => {
                children.push(this.createElement(node, initialState, options));
            });
            nestedElements = children;
        } else if(modelNode.text) {
            nestedElements = [modelNode.text];
        }

        let result = null;
        try{
            if(options.isEditModeOn){
                const wrapperProps = {
                    onMouseDown: this.onComponentMouseDown,
                    key: node.key,
                    type: modelNode.type,
                    initialState: initialState
                };
                result = React.createElement(wrapComponent(type, wrapperProps), props, nestedElements);
            } else {
                result = React.createElement(type, props, nestedElements);
            }
            if(result.type.prototype){
                if(result.type.prototype.render){
                    result.type.prototype.render = ((fn) => {
                        return function render(){
                            try {
                                return fn.apply(this, arguments);
                            } catch (err) {
                                console.error(err);
                                return React.createElement('div', {
                                    style: {
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#c62828',
                                        color: 'white',
                                        padding: '3px',
                                        display: 'table'
                                    }
                                }, React.createElement('span', {
                                    style: {
                                        display: 'table-cell',
                                        verticalAlign: 'middle'
                                    }
                                }, '\'' + modelNode.type + '\' ' + err.toString()));
                            }
                        }
                    })(result.type.prototype.render);
                }
            }

        } catch(e){
            console.error('Element type: ' + modelNode.type + ' is not valid React Element. Please check your components.js file. ' + e);
        }
        return result;
    }

    createElements(model, initialState, options){
        initialState.elements = {};
        let elements = [];
        if(model && model.children && model.children.length > 0){
            model.children.forEach(child => {
                elements.push(this.createElement(child, initialState, options));
            });
        }
        return elements;
    }

    createPreviewElement(node){
        if(node && node.modelNode){
            let type = 'div';
            let modelNode = node.modelNode;
            if(modelNode.type){
                type = this.findComponent(components, modelNode.type, 0);
                if(!type){
                    type = modelNode.type;
                } else if(!isObject(type)){
                    console.error('Element type: ' + modelNode.type + ' is not object. Please check your components.js file');
                    type = 'div';
                }
            }
            let props = Object.assign({}, {
                key: node.key,
                params: this.props.params || {},
                location: this.props.location || {}
            }, modelNode.props);
            if(node.props){
                forOwn(node.props, (prop, propName) => {
                    props[propName] = this.createPreviewElement(prop);
                });
            }
            let nestedElements = null;
            if(node.children && node.children.length > 0){
                let children = [];
                node.children.forEach(node => {
                    children.push(this.createPreviewElement(node));
                });
                nestedElements = children;
            } else if(modelNode.text) {
                nestedElements = [modelNode.text];
            }
            return React.createElement(wrapPreviewComponent(type), props, nestedElements);
        } else {
            return null;
        }
    }

    render(){
        let boundaryOverlays = [];
        let selectedKeys = undefined;
        if(this.state.isEditModeOn && this.state.pathname){
            const {selected, highlighted, forCutting, forCopying} = this.getMarked(this.state.pathname);
            if(selected && selected.length > 0){
                selectedKeys = selected;
                selected.forEach(key => {
                    boundaryOverlays.push(
                        <SelectedOverlay key={'selected' + key}
                                         initialState={this.initialState}
                                         selectedKey={key} />
                    );
                });
            }
            if(forCutting && forCutting.length > 0){
                forCutting.forEach(key => {
                    boundaryOverlays.push(
                        <ClipboardOverlay key={'forCutting' + key}
                                          initialState={this.initialState}
                                          bSize="2px"
                                          bStyle="dashed #f0ad4e"
                                          selectedKey={key} />
                    );
                });
            }
            if(forCopying && forCopying.length > 0){
                forCopying.forEach(key => {
                    boundaryOverlays.push(
                        <ClipboardOverlay key={'forCopying' + key}
                                          initialState={this.initialState}
                                          bSize="2px"
                                          bStyle="dashed #5cb85c"
                                          selectedKey={key} />
                    );
                });
            }
            if(highlighted && highlighted.length > 0){
                highlighted.forEach(key => {
                    boundaryOverlays.push(
                        <HighlightedOverlay key={'highlighted' + key}
                                            initialState={this.initialState}
                                            selectedKey={key} />
                    );
                });
            }
        }
        return (
            <div id="pageContainer" style={{padding: '0.1px'}}>
                {this.elementTree}
                {boundaryOverlays}
                {this.state.isEditModeOn ?
                    <MouseOverOverlay key="mouseOverBoundary"
                                      ref="mouseOverBoundary"
                                      initialState={this.initialState}
                                      selectedKeys={selectedKeys}
                                      bSize="1px"/> : null
                }
            </div>
        );
    }

}

export default PageForDesk;

