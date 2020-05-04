import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/* eslint-disable no-caller */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'; // eslint-disable-next-line import/no-extraneous-dependencies

import classes from 'classnames';
// import './style/index.less'
var hiddenCount = 0;

var Modal = function Modal(props) {
  var afterClose = props.afterClose,
      bodyStyle = props.bodyStyle,
      _props$cancelText = props.cancelText,
      cancelText = _props$cancelText === void 0 ? '取消' : _props$cancelText,
      centered = props.centered,
      _props$closable = props.closable,
      closable = _props$closable === void 0 ? true : _props$closable,
      closeIcon = props.closeIcon,
      destroyOnClose = props.destroyOnClose,
      footer = props.footer,
      keyboard = props.keyboard,
      _props$mask = props.mask,
      mask = _props$mask === void 0 ? true : _props$mask,
      _props$maskclosable = props.maskclosable,
      maskclosable = _props$maskclosable === void 0 ? true : _props$maskclosable,
      maskStyle = props.maskStyle,
      _props$okText = props.okText,
      okText = _props$okText === void 0 ? '确认' : _props$okText,
      title = props.title,
      _props$visible = props.visible,
      visible = _props$visible === void 0 ? false : _props$visible,
      _props$width = props.width,
      width = _props$width === void 0 ? '520px' : _props$width,
      onCancel = props.onCancel,
      onOk = props.onOk,
      children = props.children;

  var _useState = useState(!visible),
      _useState2 = _slicedToArray(_useState, 2),
      isHidden = _useState2[0],
      setHidden = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      destroyChild = _useState4[0],
      setDestroyChild = _useState4[1];

  React.useEffect(function () {
    setHidden(!visible);
  }, [visible]);

  var hiddenModal = function hiddenModal(cb) {
    setHidden(function () {
      cb && cb();
      return true;
    });

    if (destroyOnClose) {
      setDestroyChild(true);
    }

    document.body.style.overflow = 'auto';
  };

  var handleClose = function handleClose() {
    hiddenModal(onCancel);
  };

  var handleOk = function handleOk() {
    hiddenModal(onOk);
  };

  var closeModal = function closeModal(event) {
    // eslint-disable-next-line no-restricted-properties
    var e = event || window.event || arguments.callee.caller.arguments[0];

    if (e && e.keyCode === 27) {
      handleClose();
    }
  };

  var closeMask = function closeMask() {
    return maskclosable && handleClose();
  };

  useEffect(function () {
    if (isHidden && hiddenCount) {
      hiddenCount = 0;
      afterClose && afterClose();
    }

    hiddenCount = 1;
  }, [isHidden]);
  useEffect(function () {
    if (!isHidden) {
      document.body.style.overflow = 'hidden';
    }
  }, [isHidden]);
  useEffect(function () {
    if (visible) {
      if (destroyOnClose) {
        setDestroyChild(true);
      }
    }
  }, [visible, destroyOnClose]);
  useEffect(function () {
    keyboard && document.addEventListener('keydown', closeModal, false);
    return function () {
      keyboard && document.removeEventListener('keydown', closeModal, false);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "xModalWrap",
    style: {
      display: isHidden ? 'none' : 'block'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "xModalContent".concat(centered ? ' ' : ' xCentered'),
    style: {
      width: width
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classes("xModalHeader")
  }, /*#__PURE__*/React.createElement("div", {
    className: classes("xModalTitle")
  }, title)), closable && /*#__PURE__*/React.createElement("span", {
    className: classes("xModalCloseBtn"),
    onClick: handleClose
  }, closeIcon || 'x'), /*#__PURE__*/React.createElement("div", {
    className: classes("xModalBody"),
    style: bodyStyle
  }, destroyChild ? null : children), footer === null ? null : /*#__PURE__*/React.createElement("div", {
    className: classes("xModalFooter")
  }, footer ? footer : /*#__PURE__*/React.createElement("div", {
    className: classes("xFooterBtn")
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: classes("xFooterBtnCancel"),
    onClick: handleClose
  }, cancelText), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: classes("xFooterBtnOk"),
    onClick: handleOk
  }, okText)))), mask && /*#__PURE__*/React.createElement("div", {
    className: classes("xModalMask"),
    style: maskStyle,
    onClick: closeMask
  }));
};

Modal.propTypes = {
  afterClose: PropTypes.func,
  bodyStyle: PropTypes.object,
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  centered: PropTypes.bool,
  closable: PropTypes.bool,
  closeIcon: PropTypes.element,
  destroyOnClose: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  keyboard: PropTypes.bool,
  mask: PropTypes.bool,
  maskclosable: PropTypes.bool,
  maskStyle: PropTypes.object,
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  visible: PropTypes.bool,
  width: PropTypes.string,
  onCancel: PropTypes.func,
  onOk: PropTypes.func
};
export default Modal;