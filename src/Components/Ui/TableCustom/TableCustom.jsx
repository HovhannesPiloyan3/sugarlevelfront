import React from 'react';
import {Table, Tag} from 'antd';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        className:"dark:bg-black dark:text-white",
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'KK',
        dataIndex: 'kk',
        className:"dark:bg-black dark:text-white",
        key: 'kk',
        sorter: (a, b) => a.kk - b.kk,
    },
    {
        title: 'ГИ',
        dataIndex: 'gi',
        className:"dark:bg-black dark:text-white",
        key: 'gi',
        sorter: (a, b) => a.gi - b.gi,
    },
    {
        title: 'Теги',
        key: 'tags',
        className:"dark:bg-black dark:text-white",
        dataIndex: 'tags',
        render: (_, {tags}) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'Без тега') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },

];


const TableCustom = ({dataSource}) => {

    console.log(dataSource);

    return (
        <Table columns={columns}  dataSource={dataSource}/>
    );
}
export default TableCustom;
