import React from "react";
import './Task.less';
import { getTaskList, addTask, removeTask, completeTask } from "@/api";
import { Button, Table, Tag, Popconfirm, Modal, Form, Input, DatePicker, message} from 'antd';
import { flushSync } from 'react-dom';

class Task extends React.Component{

    columns = [
        {title:'ID', dataIndex:'id', align: 'center', width:'8%'},
        {title:'Task', dataIndex:'task', width:'40%'},
        {title:'Status', dataIndex:'state', render:(data)=>{return +data === 1 ? 'Todo' : 'Done'}, width:'10%'},
        {title:'Done time', dataIndex:'time', render:(_,record)=>{let {state, time, complete} = record; if (+state===2) time = complete; return time}, width:'15%'},
        {title:'Change', render:(_, record)=>{
            let {id, state} = record;
            return <>
                <Popconfirm title='Sure to delete?' onConfirm={this.handleRemove.bind(this,id)}><Button type='link'>Delete</Button></Popconfirm>
                {+state !== 2 ? <Popconfirm title='Sure to set to Done?' onConfirm={this.handleUpdate.bind(this,id)}><Button type='link'>Done</Button></Popconfirm>:null}
            </>
            }
        }
    ];

    state = {
        tableData: [],
        tableLoading: false,
        modalVisible: false,
        confirmLoading: false,
        selectedIndex: 0
    }

    // Handle Modal
    submit = async ()=>{
        try {
            await this.formIns.validateFields();
            // message.success('validate success!')
            let {task, time} = this.formIns.getFieldValue();
            this.setState({confirmLoading:true})
            let {code} = await addTask(task,time);
            if (+code !==0){
                message.error('submit error');
            }else{
                this.closeModal();
                this.queryData();
                message.success('submit success');
            }
        } catch (_) {}
        this.setState({confirmLoading:false})
    }

    queryData = async ()=> {
        let {selectedIndex} = this.state;
        try {
            this.setState({tableLoading:true});
            let {code, list} = await getTaskList(selectedIndex);
            console.log(code)
            console.log(list)
            if (+code!==0) list = []
            setTimeout(()=>{this.setState({
                tableData:list
            })}, 2000)
            
        } catch (_) {}
        setTimeout(()=>{this.setState({tableLoading:false})},2000);
    }

    handleRemove = async (id)=> {
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

    handleUpdate = async (id)=> {
        try{
            let {code} = await completeTask(id)
            if (+code !== 0){
                message.error('complete error');
            }else{
                this.queryData();
                message.success('complete success');
            }
        }catch(_) {}
    }

    closeModal = ()=>{
        this.setState({
            modalVisible: false,
            confirmLoading: false
        });
        this.formIns.resetFields();
    }

    changeIndex = (index)=> {
        if (index === this.state.selectedIndex) return;
        // this.setState({
        //     selectedIndex:index
        // }, ()=>{this.queryData()})
        flushSync(()=>{this.setState({
                selectedIndex:index
            })
        })
        this.queryData()
    }


    render(){
        let { tableData, tableLoading, modalVisible, confirmLoading, selectedIndex} = this.state
        return <div className="task-box">
            {/* Header */}
            <div className="header"><h2 className="title">TASK OA System</h2>
            <Button type='primary' onClick={()=>{
                this.setState({
                    modalVisible: true
                })
            }}>Add Task</Button>
            </div>

            {/* Tags */}
            <div className="tag-box">
                {['All', 'Todo', 'Done'].map((item, index)=>{
                    return  <Tag key={index} color={selectedIndex===index ? '#1677ff' : ''} onClick={this.changeIndex.bind(this,index)}>{item}</Tag>})
                }
            </div>

            {/* Table */}
            <Table dataSource={tableData} columns={this.columns} loading={tableLoading} pagination={false} rowKey="id"/>

            {/* Modal */}
            <Modal title='New Todo' open={modalVisible} confirmLoading={confirmLoading} onCancel={this.closeModal} onOk={this.submit} maskClosable={false}>
                <Form ref={x => this.formIns=x} layout="vertical" initialValues={{
                    task:'',
                    time:''
                }}>
                    <Form.Item label="Task Name" name="task" validateTrigger="onBlur" rules={[{required:true,message:'Need input'},{min:6}]}>
                        <Input.TextArea rows={4}></Input.TextArea>
                    </Form.Item>

                    <Form.Item label='Goal' name='time' validateTrigger="onBlur" rules={[]}>
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    }

    componentDidMount() {
        this.queryData();
    }
}

export default Task;