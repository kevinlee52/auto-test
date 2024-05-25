import React, {useState, useEffect, useRef} from "react";
import './Task.less';
import { getTaskList, addTask, removeTask, completeTask } from "@/api";
import { Button, Table, Tag, Popconfirm, Modal, Form, Input, DatePicker, message} from 'antd';
import { flushSync } from 'react-dom';

const Task = function(){

    let [modalVisible, setModalVisible] = useState(false)
    let [tableData, setTableData] = useState([])
    let [tableLoading, setTableLoading] = useState(false)
    let [confirmLoading, setConfirmLoading] = useState(false)
    let [selectedIndex, setSelectedIndex] = useState(0)
    let formIns = useRef(null);

    const columns = [
        {title:'ID', dataIndex:'id', align: 'center', width:'8%'},
        {title:'Task', dataIndex:'task', width:'40%'},
        {title:'Status', dataIndex:'state', render:(data)=>{return +data === 1 ? 'Todo' : 'Done'}, width:'10%'},
        {title:'Done time', dataIndex:'time', render:(_,record)=>{let {state, time, complete} = record; if (+state===2) time = complete; return time}, width:'15%'},
        {title:'Change', render:(_, record)=>{
            let {id, state} = record;
            return <>
                <Popconfirm title='Sure to delete?' onConfirm={handleRemove.bind(this,id)}><Button type='link'>Delete</Button></Popconfirm>
                {+state !== 2 ? <Popconfirm title='Sure to set to Done?' onConfirm={handleUpdate.bind(this,id)}><Button type='link'>Done</Button></Popconfirm>:null}
            </>
            }
        }
    ]

    // Handle Modal
    const submit = async ()=>{
        try {
            await formIns.current.validateFields();
            // message.success('validate success!')
            let {task, time} = formIns.current.getFieldValue();
            setConfirmLoading(true);
            let {code} = await addTask(task,time);
            if (+code !==0){
                message.error('submit error');
            }else{
                closeModal();
                queryData();
                message.success('submit success');
            }
        } catch (_) {}
        setConfirmLoading(false);
    }

    const queryData = async ()=> {
        try {
            setTableLoading(true);
            let {code, list} = await getTaskList(selectedIndex);
            if (+code!==0) list = []
            setTableData(list)
        } catch (_) {}
        setTableLoading(false);
    }

    const handleRemove = async (id)=> {
        try{
            let {code} = await removeTask(id)
            if (+code !== 0){
                message.error('remove error');
            }else{
                this.queryData();
                message.success('remove success');
            }
        }catch(_) {}
    }

    const handleUpdate = async (id)=> {
        try{
            let {code} = await completeTask(id)
            if (+code !== 0){
                message.error('complete error');
            }else{
                queryData();
                message.success('complete success');
            }
        }catch(_) {}
    }

    const closeModal = ()=>{
        setModalVisible(false);
        setConfirmLoading(false);
        formIns.current.resetFields();
    }

    const changeIndex = (index)=> {
        if (index === selectedIndex) return;
        // this.setState({
        //     selectedIndex:index
        // }, ()=>{this.queryData()})
        flushSync(()=>{setSelectedIndex(index)})
        queryData()
    }

    useEffect(()=>{
        queryData();
    }, [selectedIndex])
   
    // let complexCalculationResult = useMemo(calculationCallback, [dependencies])
    
    return <div className="task-box">
        {/* Header */}
        <div className="header"><h2 className="title">TASK OA System</h2>
        <Button type='primary' onClick={()=>{
            setModalVisible(true)
        }}>Add Task</Button>
        </div>

        {/* Tags */}
        <div className="tag-box">
            {['All', 'Todo', 'Done'].map((item, index)=>{
                // return  <Tag key={index} color={selectedIndex===index ? '#1677ff' : ''} onClick={changeIndex.bind(this,index)}>{item}</Tag>})
                return  <Tag key={index} color={selectedIndex===index ? '#1677ff' : ''} onClick={()=>{changeIndex(index)}}>{item}</Tag>})
            }
        </div>

        {/* Table */}
        <Table dataSource={tableData} columns={columns} loading={tableLoading} pagination={false} rowKey="id"/>

        {/* Modal */}
        <Modal title='New Todo' open={modalVisible} confirmLoading={confirmLoading} onCancel={closeModal} onOk={submit} maskClosable={false}>
            <Form ref={formIns} validateTrigger="onBlur" layout="vertical" initialValues={{
                task:'',
                time:''
            }}>
                <Form.Item label="Task Name" name="task" rules={[{required:true,message:'Need input'},{min:6}]}>
                    <Input.TextArea rows={4}></Input.TextArea>
                </Form.Item>

                <Form.Item label='Goal' name='time' rules={[]}>
                    <DatePicker showTime />
                </Form.Item>
            </Form>
        </Modal>
    </div>
    
}

export default Task;