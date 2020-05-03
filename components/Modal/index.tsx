/* eslint-disable no-caller */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import classes from 'classnames'
import { ModalProps } from './types'
// import './style/index.less'

let hiddenCount:number = 0

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const {
      afterClose,
      bodyStyle,
      cancelText = '取消',
      centered,
      closable = true,
      closeIcon,
      destroyOnClose,
      footer,
      keyboard,
      mask = true,
      maskclosable = true,
      maskStyle,
      okText = '确认',
      title,
      visible = false,
      width = '520px',
      onCancel,
      onOk,
      children
  } = props

  const [isHidden, setHidden] = useState(!visible)
  const [destroyChild, setDestroyChild] = useState(false)

  React.useEffect(() => {
    setHidden(!visible)
  }, [visible])

  const hiddenModal = (cb: (() => void) | undefined) => {
    setHidden(() => {
      cb && cb()
      return true
    })
    if(destroyOnClose) {
      setDestroyChild(true)
    }
    document.body.style.overflow = 'auto'
  }

  const handleClose = () => {
    hiddenModal(onCancel)
  }

  const handleOk = () => {
    hiddenModal(onOk)
  }

  const closeModal = function (event: KeyboardEvent) {
    // eslint-disable-next-line no-restricted-properties
    const e = event || window.event || arguments.callee.caller.arguments[0]
    if (e && e.keyCode === 27) { 
      handleClose()
    }
  }

  const closeMask = () => maskclosable && handleClose()

  useEffect(() => {
    if(isHidden && hiddenCount) {
      hiddenCount = 0
      afterClose && afterClose()
    }
    hiddenCount = 1
  }, [isHidden])

  useEffect(() => {
    if(!isHidden) {
      document.body.style.overflow = 'hidden'
    }
  }, [isHidden])

  useEffect(() => {
    if(visible) {
      if(destroyOnClose) {
        setDestroyChild(true)
      }
    }
  }, [visible, destroyOnClose])

  useEffect(() => {
    keyboard && document.addEventListener('keydown', closeModal, false)
    return () => {
      keyboard && document.removeEventListener('keydown', closeModal, false)
    }
  }, [])

  return <div className='xModalWrap' style={{display: isHidden ? 'none' : 'block'}}>
    <div 
      className={`xModalContent${centered ? ' ' : ' xCentered'}`}
      style={{
        width
      }}
    >
      <div className={classes("xModalHeader")}>
        <div className={classes("xModalTitle")}>
          { title }
        </div>
      </div>
      {
        closable && 
        <span className={classes("xModalCloseBtn")} onClick={handleClose}>
          { closeIcon || 'x' }
        </span>
      }
      <div className={classes("xModalBody")} style={bodyStyle}>
        { destroyChild ? null : children }
      </div>
      {
        footer === null ? null :
          <div className={classes("xModalFooter")}>
            {
              footer ? footer :
                <div className={classes("xFooterBtn")}>
                  <button type="button" className={classes("xFooterBtnCancel")} onClick={handleClose}>{ cancelText }</button>
                  <button type="button" className={classes("xFooterBtnOk")} onClick={handleOk}>{ okText }</button>
                  {/* <Button className="xFooterBtnCancel" onClick={handleClose} type="pure">{ cancelText }</Button>
                  <Button className="xFooterBtnOk" onClick={handleOk}>{ okText }</Button> */}
                </div>
            }
          </div>
      }
    </div>
    {
      mask && <div 
        className={classes("xModalMask")}
        style={maskStyle} 
        onClick={closeMask} />
    }
  </div> 
}

Modal.propTypes = {
    afterClose: PropTypes.func,
    bodyStyle: PropTypes.object,
    cancelText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    centered: PropTypes.bool,
    closable: PropTypes.bool,
    closeIcon: PropTypes.element,
    destroyOnClose: PropTypes.bool,
    footer: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.object
    ]),
    keyboard: PropTypes.bool,
    mask: PropTypes.bool,
    maskclosable: PropTypes.bool,
    maskStyle: PropTypes.object,
    okText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    visible: PropTypes.bool,
    width: PropTypes.string,
    onCancel: PropTypes.func,
    onOk: PropTypes.func
  }

export default Modal