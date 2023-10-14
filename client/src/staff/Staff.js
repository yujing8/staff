import React from 'react';
import axios from 'axios';
import EditAlert from './EditAlert';
import styled from 'styled-components';
const ContentDiv=styled.div`
.search{
  padding-top:10px;
}
.addBtn{
  margin-left:5px;
  width: 50px;
  height: 30px;
}

.searchInput{
   width:200px;
   height: 25px;
}

.searchBtn{
  margin-left:5px;
  width: 50px;
  height: 30px;
  cursor: pointer;
}

  .table{
   width: 1190px;
   margin-top:5px;
   
}
.table td{
   border:1px solid #ccc;
   height: 50px;
   text-align: center;
   vertical-align:middle;
   font-size: 14px;
}

.table td .updateBtn{
   color:white;
   background-color:green;
   font-size: 14px;
   width: 50px;
   height: 30px;
   margin-right: 10px;
}
.updateBtn{
   color:white;
   background-color:green;
   font-size: 14px;
   width: 50px;
   height: 30px;
   margin-right: 10px;
   border:none;
   margin-left:10px;
   cursor: pointer;
}
.table td .deleteBtn{
   color:white;
   background-color:#f40;
   font-size: 14px;
   width: 50px;
   height: 30px;
   margin-right: 10px;
   border:none;
   cursor: pointer;
}


.myModal {
   display: none;
   position: fixed;
   z-index: 1;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background: rgba(0, 0, 0, 0.5);
}

.myModal .modal {
   width: 500px;
   height: 300px;
   position: relative;
   top: 50%;
   left: 50%;
   margin-top: -150px;
   margin-left: -250px;
   animation: animate 1s;
}

.modal .modal_header {
   height: 50px;
   background: white;
   color: #000;
   line-height: 50px;
   border-bottom: 2px solid skyblue;
}

.modal .modal_header p {
   display: inline-block;
   margin: 0;
   position: absolute;
   left: 20px;
}

.modal .modal_header .close {
   position: absolute;
   right: 20px;
   font-size: 20px;
   cursor: pointer;
}

.modal .modal_content {
   background: white;
   text-align: center;
   height: 300px;
}



.modal .modal_footer {
   position: relative;
   height: 50px;
   background: white;
   margin-top: 20px;
}

.modal_content div {
   padding-top: 10px;
}

.modal_content label {
   font-size: 14px;
}


.modal_content .cancel {
   padding: 0 24px;
   border: 1px solid #1E9FFF;
   font-size: 14px;
   color: #1E9FFF;
   line-height: 26px;
   border-radius: 4px;
   cursor: pointer;
   background-color: #ffffff;
}

.modal_content .confirm {
   margin-left: 15px;
   padding: 0 24px;
   border: 1px solid #C43C35;
   font-size: 14px;
   color: #fff;
   line-height: 26px;
   border-radius: 4px;
   cursor: pointer;
   background-color: #C43C35;
}

.modal_content input {
   width: 300px;
   padding: 5px;
   font-size: 16px;
   border: none;
   border-bottom: 2px solid #ccc;
   outline: none;
   background: transparent;
   margin-left: 5px;
}
.modal_content .isDefaultAddr{
   content:'';  
   width: 18px;  
   height: 18px;  
   vertical-align:middle;
}

/*添加动画*/
@keyframes animate {
   from {
       top: 0;
       opacity: 0
   }

   to {
       top: 50%;
       opacity: 1
   }
}
  
`
const Staff = () => {
  const [searchVal,setSearchVal]=React.useState("");
  const [httpData,setHttpData]=React.useState([]);
  const getHttpData = async () => {
    const res=await axios.get(`/api/staff/list`);
    setHttpData(res.data.data);
}
React.useEffect(() => {
  getHttpData()
}, []);

//监听搜索框变化
const changeHandler=(e)=>{
   setSearchVal(e.target.value.trim());
}

//查询职工信息
const searchHandler=async()=>{
  
  if(searchVal===""){
    getHttpData();
  }else{
    await axios.get(`/api/staff/query/${searchVal}`).then((res) => {
      if (res.data.code === 200) {
         setHttpData(res.data.data);
      }
    });
  }
 
 
}
//删除职工信息
const removeHandler=async(e)=>{
  await axios.get(`/api/staff/delete/${e.target.id}`).then((res) => {
  if (res.data.code === 200) {
     alert('删除成功')
     getHttpData();
  }

});
   
}

  return (
    <ContentDiv >
      <div className='search'>
        <EditAlert id={null} refData={getHttpData} className="addBtn"/>
        <input type="text" value={searchVal} onChange={changeHandler} className='searchInput' placeholder='请输入职工姓名'/>
        <button onClick={searchHandler} className='searchBtn'>查询</button>
      </div>
     <table className='table' style={{ border: "2px solid #ccc",width:"1190px" }}>
     <thead style={{ border: "1px solid #ccc", backgroundColor: "skyblue" }}>
            <tr style={{ color: "#fff" }}  >
              <td><input type="checkbox" /></td>
              <td>姓名</td>
              <td>密码</td>
              <td>部门</td>
              <td>职位</td>
              <td>薪水(元)</td>
              <td>考勤(天)</td>
              <td>操作</td>
            </tr>
          </thead>  

          <tbody id="tbody">

            {
              httpData.map((item) => {
                return(
                  <tr key={item.id} className="active">
                  <td><input type="checkbox"/></td>
                    <td>{item.name}</td>
                    <td>{item.password}</td>
                    <td>{item.department}</td>
                    <td>{item.position}</td>
                    <td>{item.salary}</td>
                    <td>{item.attendance}</td>
                    <td>
                    <EditAlert id={item.id} refData={getHttpData} data={item}/>
                      <button onClick={removeHandler} id={item.id} className='deleteBtn' >删除</button>
                    </td>
                  </tr>
                

                );
                 
              })
            }
          
          </tbody> 

     </table>
    </ContentDiv>
  )
}

export default Staff
