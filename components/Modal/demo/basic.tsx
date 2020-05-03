import React from 'react';
import { useToggle } from 'react-use';
import  Modal from '..';
import '../style';

export default () =>  {
    const [toggleValue, toggle] = useToggle(false)
    return (
        <div>
            <Modal title="Modal title" visible={toggleValue} onCancel={() => toggle(false)}>
                <p>我是弹窗内容</p>
                <p>我是弹窗内容</p>
                <p>我是弹窗内容</p>
                <p>我是弹窗内容</p>
            </Modal>
            <button onClick={() => toggle(true)}>Show Modal</button>
        </div>
    )
}
