import { BellFilled } from '@ant-design/icons';
import { Dropdown } from 'antd';

export default function NofiticationStudent() {
        const nofiItems = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];
    return (
        <>
            <Dropdown menu={{ items: nofiItems }} placement="bottomRight">
                <BellFilled className='admin__icon-nofitication' />
            </Dropdown>
        </>
    )
}