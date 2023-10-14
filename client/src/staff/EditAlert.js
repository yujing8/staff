import React from 'react'
import axios from 'axios'

const EditAlert = (props) => {
    const myModal=React.useRef("none");
   const [data,setData]=React.useState({
    name:"",
    password:"",
    department:"",
    position:"",
    salary:"",
    attendance:""
   });

   const [httpData,setHttpData]=React.useState({
    department:[],
    position:[]
   });

   //输入框改变事件
   const changeHandler=(e)=>{
     setData(prevValues=>{
        return { ...prevValues,[e.target.name]: e.target.value.trim()}
     })
   }
    //打开弹窗
    const updateHandler=async(e)=>{
    const department=await axios.get(`/api/department/name`);
    const position=await axios.get(`/api/position/name`);
    setHttpData(prevValues=>{
      return { ...prevValues,["department"]: department.data.data}
   })
   setHttpData(prevValues=>{
    return { ...prevValues,["position"]: position.data.data}
 })
    setData(prevValues=>{
      return { ...prevValues,["department"]: department.data.data[0].name,["position"]: position.data.data[0].name}
   })
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
    await axios.post('/api/staff/update', data, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((res) => {
      if(res.data.code===200){
        alert('操作成功')
      }
     
    })  
   }else{ //新增

    await axios.post('/api/staff/add', data, {
      headers: {
        "Content-Type": 'application/json'
      }
    }).then((res) => {
     
      if(res.data.code===200){
        alert('操作成功')
     
      }
     
    })  

   }
   setData({
    name:"",
    password:"",
    department:"",
    position:"",
    salary:"",
    attendance:""
   });
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
                <div><label>姓名</label><input name="name" type="text" value={data.name} onChange={changeHandler}/></div>
                <div><label>密码</label><input name="password" type="text" value={data.password} onChange={changeHandler} /></div>
                <div><label>部门</label>
               
                <select style={{width:"100px",height:"25px"}} name="department" onChange={changeHandler} value={data.department}>{
                         httpData.department.map((item)=>{
                        return(
                    <option key={item.name} value={item.name}>{item.name}</option>
                      );
                   })
                }
                 </select>
                </div>
                <div><label>职位</label>
                <select style={{width:"100px",height:"25px"}} name="position" onChange={changeHandler} value={data.position}>{
                         httpData.position.map((item)=>{
                        return(
                    <option key={item.name} value={item.name}>{item.name}</option>
                      );
                   })
                }
                 </select>
                </div>
                <div><label>薪水(元)</label><input name="salary" type="text" value={data.salary} onChange={changeHandler} /></div>
                <div><label>考勤(天)</label><input name="attendance" type="text" value={data.attendance} onChange={changeHandler}  /></div>
             
             
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
