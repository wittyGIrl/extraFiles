'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _editor = require('./common/editor');

var _editor2 = _interopRequireDefault(_editor);

var _utils = require('./utils');

var _title = require('./common/title');

var _title2 = _interopRequireDefault(_title);

var _button = require('./common/button');

var _button2 = _interopRequireDefault(_button);

var _row = require('./common/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('./common/col');

var _col2 = _interopRequireDefault(_col);

var _dHead = require('./dHead');

var _dHead2 = _interopRequireDefault(_dHead);

var _dH = require('./dH');

var _dH2 = _interopRequireDefault(_dH);

var _dBody = require('./dBody');

var _dBody2 = _interopRequireDefault(_dBody);

var _dR = require('./dR');

var _dR2 = _interopRequireDefault(_dR);

var _dD = require('./dD');

var _dD2 = _interopRequireDefault(_dD);

var _toolbar = require('./toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _pagination = require('./pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("../less/index.less");

var Datagrid = function (_Component) {
	_inherits(Datagrid, _Component);

	function Datagrid(props, context) {
		_classCallCheck(this, Datagrid);

		var _this = _possibleConstructorReturn(this, (Datagrid.__proto__ || Object.getPrototypeOf(Datagrid)).call(this, props, context));

		_initialiseProps.call(_this);

		var data = props.data,
		    pageSize = props.pageSize,
		    pageIndex = props.pageIndex;

		_this.state = {
			data: data,
			selected: [],
			editing: null,

			pageSize: pageSize,
			pageIndex: pageIndex,

			width: 0, //container width
			height: 0, //container height
			top: 0 };
		return _this;
	}

	_createClass(Datagrid, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.props.listenWindowResize) {
				(0, _utils.$)(window).bind('resize', this._resize);
			}
			this._resize();
			this.reload();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.props.listenWindowResize) {
				(0, _utils.$)(window).unbind('resize', this._resize);
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var pageIndex = nextProps.pageIndex,
			    pageSize = nextProps.pageSize,
			    columns = nextProps.columns,
			    data = nextProps.data,
			    height = nextProps.height;

			var state = { data: data };
			if (this.state.pageIndex !== pageIndex) {
				state.pageIndex = pageIndex;
			}
			if (this.state.pageSize !== pageSize) {
				state.pageSize = pageSize;
			}
			if (height) {
				state.height = height;
			}
			if (nextProps.fit === false) {
				state.height = null;
			}
			if (nextProps.resizeNow) {
				this._resize();
			}

			if (state) {
				this.setState(state);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    title = _props.title,
			    rowNumber = _props.rowNumber,
			    fit = _props.fit,
			    toolbar = _props.toolbar,
			    children = _props.children,
			    idField = _props.idField,
			    style = _props.style;
			var _state = this.state,
			    top = _state.top,
			    width = _state.width,
			    height = _state.height;

			var componentClass = (0, _classnames2.default)('x-datagrid-body', className);
			var titleElem = null;
			if (title) {
				titleElem = _react2.default.createElement(_title2.default, { className: 'x-datagrid-title', text: title });
			}
			// when 0 then null
			style = Object.assign({}, style, { width: width ? width : null, height: height ? height : null });
			return _react2.default.createElement(
				'div',
				{ className: (0, _classnames2.default)('x-datagrid-container', { fit: fit }), style: style,
					onClick: this.handleClickBody
				},
				titleElem,
				this._renderToolbar(),
				this._renderHeader(),
				_react2.default.createElement(
					'div',
					{ className: (0, _classnames2.default)('x-datagrid-body-container', { fit: fit }), style: { top: top } },
					this._renderBody()
				),
				this._renderPagination(),
				this._renderDialog()
			);
		}
	}, {
		key: '_renderHeader',
		value: function _renderHeader() {
			var _props2 = this.props,
			    columns = _props2.columns,
			    rowNumber = _props2.rowNumber,
			    rowNumberWidth = _props2.rowNumberWidth,
			    fitColumns = _props2.fitColumns;


			var columnElems = [];
			if (rowNumber === true) {
				columnElems.push(_react2.default.createElement(_dH2.default, { key: 'rowNumber', width: rowNumberWidth }));
			}

			if (fitColumns) {
				this._computeWidth();
			}
			var columnWidth = this._columnWidth;

			if (columns && columns.length !== 0) {
				columns.forEach(function (col, i) {
					if (!col) return;
					columnElems.push(_react2.default.createElement(_dH2.default, _extends({}, col, { key: i, width: fitColumns ? columnWidth[col.field] : col.width,
						style: i === columns.length - 1 ? { borderWidth: '0 0 1px 0' } : null })));
				});
			}
			return _react2.default.createElement(
				_dHead2.default,
				null,
				columnElems
			);
		}
	}, {
		key: '_renderBody',
		value: function _renderBody() {
			var striped = this.props.striped;
			var _state2 = this.state,
			    selected = _state2.selected,
			    data = _state2.data;

			var me = this;
			var rows = [];
			if (data.total) {
				data.rows.forEach(function (row, i) {
					rows.push(_react2.default.createElement(
						_dR2.default,
						{ key: i,
							className: striped ? i & 1 === 1 ? 'odd-striped' : 'even-striped' : i & 1 === 1 ? 'odd' : 'even',
							selected: !!~selected.indexOf(row),
							data: row,
							onClick: me._handleClickRow },
						me._renderRow(row, i)
					));
				});
			}
			return _react2.default.createElement(
				_dBody2.default,
				null,
				rows
			);
		}
	}, {
		key: '_renderRow',
		value: function _renderRow(row, index) {
			var _props3 = this.props,
			    columns = _props3.columns,
			    rowNumber = _props3.rowNumber,
			    rowNumberWidth = _props3.rowNumberWidth,
			    fitColumns = _props3.fitColumns,
			    striped = _props3.striped,
			    idField = _props3.idField,
			    inlineEdit = _props3.inlineEdit;
			var _state3 = this.state,
			    pageIndex = _state3.pageIndex,
			    pageSize = _state3.pageSize,
			    editing = _state3.editing;

			var editingFlag = inlineEdit && editing && editing[idField] === row[idField];
			if (editingFlag) {
				row = editing;
			}
			var rows = [];
			if (rowNumber === true) {
				rows.push(_react2.default.createElement(_dD2.default, { key: 'rowNumber', className: 'row-number', width: rowNumberWidth,
					value: index + 1 + pageSize * (pageIndex - 1),
					striped: striped }));
			}

			var columnWidth = this._columnWidth;
			columns.forEach(function (col, i) {
				rows.push(_react2.default.createElement(_dD2.default, { key: i, hidden: col.hidden,
					style: i === columns.length - 1 ? { borderWidth: '0 0 1px 0' } : {},
					width: fitColumns ? columnWidth[col.field] : col.width,
					row: row, field: col.field, value: row[col.field],
					striped: striped,
					editing: editingFlag,
					editor: col.editor,
					formatter: col.formatter }));
			});
			return rows;
		}
	}, {
		key: '_renderPagination',
		value: function _renderPagination() {
			var _props4 = this.props,
			    pagination = _props4.pagination,
			    fit = _props4.fit,
			    paginationOptions = _props4.paginationOptions,
			    paginationLabel = _props4.paginationLabel,
			    readOnly = _props4.readOnly;

			if (pagination !== false) {
				var _state4 = this.state,
				    data = _state4.data,
				    pageIndex = _state4.pageIndex,
				    pageSize = _state4.pageSize;

				return _react2.default.createElement(_pagination2.default, { className: fit ? 'fit' : null, total: data.total, index: pageIndex, size: pageSize,
					label: paginationLabel,
					readOnly: readOnly,
					options: paginationOptions,
					onChangeSize: this._handleChangeSize,
					onChangeIndex: this._handeChangeIndex,
					onReload: this.reload });
			}
		}
	}, {
		key: '_renderToolbar',
		value: function _renderToolbar() {
			var _props5 = this.props,
			    toolbar = _props5.toolbar,
			    toolbarBtn = _props5.toolbarBtn;

			if (toolbar === false) return null;
			toolbarBtn = toolbarBtn || [];
			return _react2.default.createElement(
				_toolbar2.default,
				null,
				toolbarBtn.map(this._renderToolbarBtn)
			);
		}
	}, {
		key: '_renderDialog',
		value: function _renderDialog() {
			var editing = this.state.editing;
			var _props6 = this.props,
			    inlineEdit = _props6.inlineEdit,
			    columns = _props6.columns;

			if (inlineEdit) return null;
			if (!editing) return null;

			var children = [];
			var props;
			columns.forEach(function (col, i) {
				if (!col || col.hidden) return;
				if (col.editor) {
					props = typeof col.editor === 'string' ? { type: col.editor } : col.editor;
				}
				children.push(_react2.default.createElement(
					_col2.default,
					{ key: i },
					_react2.default.createElement(_editor2.default, _extends({}, props, { key: i, name: col.field, label: col.label, value: editing[col.field],
						owner: editing, target: col.field,
						autofocus: children.length === 0
					}))
				));
			});
			return _react2.default.createElement(
				_dialog2.default,
				{ title: '', modal: true,
					onOk: this._handleDialogOk,
					onClose: this._handleDialogClose },
				_react2.default.createElement(
					_row2.default,
					null,
					children
				)
			);
		}
	}, {
		key: '_computeWidth',
		value: function _computeWidth() {
			if (this.props.recomputeWidthEverytime !== true && this._recomputeFlag !== true && this._width === this.state.width) {
				this._recomputeFlag = false;
				return;
			}
			var width = this.state.width;
			var _props7 = this.props,
			    rowNumber = _props7.rowNumber,
			    rowNumberWidth = _props7.rowNumberWidth;
			// if(width === 0) return;

			var total = 0,
			    obj = {},
			    num,
			    fieldArr = [],
			    widthArr = [];
			var me = this;
			this.props.columns.forEach(function (col) {
				if (col.hidden === true) return;
				num = me._getNumber(col.width);
				total += num;
				fieldArr.push(col.field);
				widthArr.push(num);
			});

			var realWidth = rowNumber ? width - rowNumberWidth : width;
			var result = {},
			    other = 0,
			    currentWidth,
			    field;
			for (var i = 0, l = fieldArr.length; i < l; i++) {
				field = fieldArr[i];
				if (i === l - 1) {
					result[field] = realWidth - other - l - 1;
				} else {
					currentWidth = Math.floor(widthArr[i] * realWidth / total) - 1;
					result[field] = currentWidth;
					other += currentWidth;
				}
			}

			this._width = width;
			this._columnWidth = result;
		}
	}, {
		key: '_getNumber',
		value: function _getNumber(str) {
			if (typeof str === 'number') return str;
			var index = str.indexOf('px');
			var num = str - 0;
			if (~index) {
				num = str.substring(0, index) - 0;
			}
			if (isNaN(num)) {
				throw new Error('width must be a number instead of {str}');
			}
			return num;
		}
	}, {
		key: '_findEditingRow',
		value: function _findEditingRow() {
			var idField = this.props.idField;
			var _state5 = this.state,
			    data = _state5.data,
			    editing = _state5.editing;

			var row;
			for (var i = 0, l = data.rows.length; i < l; i++) {
				row = data.rows[i];
				if (row[idField] === editing[idField]) {
					return row;
				}
			}
		}
	}]);

	return Datagrid;
}(_react.Component);

Datagrid.propTypes = {
	className: _react2.default.PropTypes.string
};
Datagrid.defaultProps = {
	data: {
		rows: [],
		total: 0
	},
	columns: [],
	url: null,
	method: 'get',

	pageIndex: 1,
	pageSize: 10,

	idField: 'id',
	multiSelect: false,
	title: 'datagrid',
	toolbar: null,
	toolbarBtn: [{ type: 'add', text: 'Add' }, { type: 'edit', text: 'Edit' }, { type: 'remove', text: 'Remove' }],
	inlineEdit: false, // 行内编辑
	rowNumber: true,
	rowNumberWidth: 20,
	fit: true, //自动适应父容器的宽高
	fitColumns: true, //自动按比例缩放col的宽
	striped: true,

	pagination: false,
	paginationOptions: [10, 20, 30, 40, 50],
	paginationLabel: 'Displaying {start} to {end} of {total} items',

	readOnly: false,
	resizeNow: true,
	listenWindowResize: true, // 是否监听Window的resize事件
	recomputeWidthEverytime: false
};

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this._renderToolbarBtn = function (btn) {
		if (!btn) return;
		var readOnly = _this2.props.readOnly;
		var selected = _this2.state.selected;

		switch (btn.type) {
			case 'add':
				return _react2.default.createElement(_button2.default, { key: btn.type, label: btn.text, disabled: readOnly, onClick: _this2._handleAdd });
			case 'edit':
				return _react2.default.createElement(_button2.default, _defineProperty({ key: btn.type, label: btn.text, disabled: readOnly, onClick: _this2._handleStartEdit }, 'disabled', selected.length === 0));
			case 'remove':
				return _react2.default.createElement(_button2.default, _defineProperty({ key: btn.type, label: btn.text, disabled: readOnly, onClick: _this2._handleRemove }, 'disabled', selected.length === 0));
			default:
				return;
		}
	};

	this.load = function (data) {
		_this2.setState({ data: data, pageIndex: 1 });
	};

	this.reload = function () {
		if (!_this2.props.url) return;
		var me = _this2;
		_this2._ajax().then(function (data) {
			me.setState({ data: data });
		});
	};

	this._ajax = function (rows, page) {
		var _props8 = _this2.props,
		    url = _props8.url,
		    method = _props8.method;
		var _state6 = _this2.state,
		    pageIndex = _state6.pageIndex,
		    pageSize = _state6.pageSize;

		rows = rows || pageSize;
		page = page || pageIndex;
		return new _promise2.default(function (resolve, reject) {
			_utils.$.ajax(url, {
				method: method,
				data: { rows: rows, page: page },
				success: function success(data, status) {
					resolve(data, status);
					if (this.props.onLoadSuccess) {
						this.props.onLoadSuccess(err, message);
					}
				},
				error: function error(options, err, message) {
					reject(err, message);
					if (this.props.onLoadError) {
						this.props.onLoadError(err, message);
					}
				}
			});
		});
	};

	this._handleClickRow = function (row) {
		var _props9 = _this2.props,
		    idField = _props9.idField,
		    multiSelect = _props9.multiSelect;
		var _state7 = _this2.state,
		    selected = _state7.selected,
		    editing = _state7.editing;

		if (multiSelect === true) {
			var index = selected.indexOf(row);
			if (!~index) {
				selected.push(row);
			} else {
				selected.splice(row, 1);
			}
		} else {
			selected.length = 1;
			selected[0] = row;
		}
		if (editing && editing[idField] !== row[idField]) {
			_this2._handleEndEdit();
		}

		_this2.setState({ selected: selected });
	};

	this._handleChangeSize = function (pageSize) {
		if (!_this2.props.url) {
			_this2.setState({ pageSize: pageSize });
			return;
		}
		var _state8 = _this2.state,
		    pageIndex = _state8.pageIndex,
		    data = _state8.data;

		var me = _this2;
		var pageTotal = Math.ceil(data.total / pageSize);
		pageTotal = pageTotal === 0 ? 1 : pageTotal;
		pageIndex = pageIndex > pageTotal ? pageTotal : pageIndex;
		_this2._ajax(pageSize, pageIndex).then(function (data) {
			var selected = me.state.selected;

			selected.length = 0;
			me.setState({
				pageSize: pageSize,
				pageIndex: pageIndex,
				data: data,
				selected: selected
			});
		});
	};

	this._handeChangeIndex = function (pageIndex) {
		var selected = me.state.selected;

		selected.length = 0;

		if (!_this2.props.url) {

			_this2.setState({
				pageIndex: pageIndex,
				selected: selected
			});
			return;
		}
		var me = _this2;
		_this2._ajax(null, pageIndex).then(function (data) {
			me.setState({
				pageIndex: pageIndex,
				data: data,
				selected: selected
			});
		});
	};

	this.handleClickBody = function () {
		if (_this2.props.inlineEdit && _this2.state.editing !== null) {
			_this2._handleEndEdit();
		}
	};

	this._resize = function () {
		var state = {};
		var container = (0, _utils.$)(_reactDom2.default.findDOMNode(_this2));
		if (_this2.props.fitColumns) {
			var width = container.parent().width() - (container.outerWidth() - container.width());
			if (width !== _this2.state.width) {
				state.width = width;
			}
		}
		if (_this2.props.fit) {
			var height = container.parent().height() - (container.outerHeight() - container.height());

			var title = (0, _utils.$)('.x-datagrid-title', container);
			var toolbar = (0, _utils.$)('.x-datagrid-toolbar', container);
			var header = (0, _utils.$)('.x-datagrid-header', container);
			var pagination = (0, _utils.$)('.x-datagrid-pagination', container);
			// var table = $('.x-datagrid-body', container);
			// var body = $('.x-datagrid-body-container-fit', container);
			//修正body 的top值。
			var top = 0;
			[title, toolbar, header].forEach(function (target) {
				top += target.outerHeight();
			});
			if (top !== _this2.state.top) {
				state.top = top;
			}
			var minHeight = top + pagination.outerHeight() + 100; // 100 body minheight
			if (height < minHeight) {
				height = minHeight;
			}
			if (height !== _this2.state.height) {
				state.height = height;
			}
		}

		_this2.setState(state);
	};

	this._handleAdd = function (e) {
		var _props10 = _this2.props,
		    inlineEdit = _props10.inlineEdit,
		    idField = _props10.idField,
		    onAdd = _props10.onAdd;

		if (inlineEdit) {
			var data = _this2.state.data;

			var editing = {};
			editing[idField] = (0, _utils.guid)();
			data.rows.push(editing);
			data.total += 1;
			_this2.setState({ editing: editing, data: data });
		} else {
			_this2.setState({ editing: {} });
		}
		if (onAdd) {
			onAdd(_this2);
		}
		e.stopPropagation();
	};

	this._handleStartEdit = function (e) {
		//不能用 Object.assign 浅拷贝
		var editing = (0, _utils.extend)(true, {}, _this2.state.selected[0]);
		_this2.setState({ editing: editing });

		if (_this2.props.onStartEdit) {
			_this2.props.onStartEdit(_this2.props.editing, _this2);
		}
		e.stopPropagation();
	};

	this._handleEndEdit = function () {
		var _props11 = _this2.props,
		    idField = _props11.idField,
		    onEndEdit = _props11.onEndEdit;
		var editing = _this2.state.editing;

		var target = _this2._findEditingRow();
		if (target) {
			//edit
			(0, _utils.extend)(true, target, editing);
			_this2.setState({ editing: null });
		}
		if (onEndEdit) {
			onEndEdit(editing, _this2);
		}
	};

	this._handleRemove = function (e) {
		var _state9 = _this2.state,
		    data = _state9.data,
		    selected = _state9.selected,
		    onRemove = _state9.onRemove;

		var cloned = selected;
		if (selected.length > 0) {
			var rows = data.rows,
			    index;
			selected.forEach(function (row) {
				if (!row) return;
				index = rows.indexOf(row);
				if (~index) {
					rows.splice(index, 1);
				}
			});
			data.rows = rows;
			data.total = rows.length;
			selected.length = 0;
			_this2.setState({ data: data, selected: selected });
		}

		if (cloned.length > 0 && onRemove) {
			onRemove(cloned, _this2);
		}
		e.stopPropagation();
	};

	this._handleDialogOk = function () {
		var idField = _this2.props.idField;
		var _state10 = _this2.state,
		    data = _state10.data,
		    editing = _state10.editing;

		var target = _this2._findEditingRow();
		if (target) {
			//edit
			Object.assign(target, editing);
			_this2.setState({ editing: null });
		} else {
			//add
			data.total += 1;
			editing[idField] = (0, _utils.guid)();
			data.rows.push(editing);
			_this2.setState({ data: data, editing: null });
		}
	};

	this._handleDialogClose = function () {
		_this2.setState({ editing: null });
	};
};

exports.default = Datagrid;