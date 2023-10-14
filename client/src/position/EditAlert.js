import React from 'react'
import axios from 'axios'

const EditAlert = (props) => {
    const myModal=React.useRef("none");
   const [data,setData]=React.useState({
    name:""
   });
   //输入框改变事件
   const changeHandler=(e)=>{
     setData(prevValues=>{
        return { ...prevValues,[e.target.name]: e.target.value.trim()}
     })
   }
    //打开弹窗
    const updateHandler=(e)=>{
        if(props.data!==undefined){
            setData(props.data);
        }
       
        myModal.current.style.display = "block";
  }
  //关闭弹窗
  const closeHandler=()=>{
    myModal.current.style.display = "none";
  }
  //确定
  const confirmHandler=async()=>{
   if(props.id!==null){ //修改
    await axios.post('/api/position/update', data, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((res) => {
      if(res.data.code===200){
        alert('操作成功')
      }
     
    })  
   }else{ //新增

    
    await axios.post('/api/position/add', data, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((res) => {
     
      if(res.data.code===200){
        alert('操作成功')
     
      }
     
    })  

   }

    props.refData();
    closeHandler();
  }
  return (
    <>
 <button onClick={updateHandler} className='updateBtn'>{props.id?'修改':'添加'}</button>
<div ref={myModal}  className='myModal'>
        <div className='modal'>
            <div className='modal_header'>
                <p>{props.id?'修改':'添加'}</p>
                <span onClick={closeHandler} className='close'>×</span>
            </div>
         
            <div className='modal_content'>
                <div><label>职位名称</label><input name="name" type="text" value={data.name} onChange={changeHandler}/></div>
                <div className='modal_footer'>
                    <button  onClick={closeHandler}  className='cancel' >取消</button>
                    <button  onClick={confirmHandler}  className='confirm'>确定</button>
                </div>
            </div>
        </div>
    </div>
    </>
      
  )
}

export default EditAlert
