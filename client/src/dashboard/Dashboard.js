import React from 'react'
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
const SideDiv=styled.div`
   a{
    text-decoration:none;
    color:white;
   }
   ul>li{
     margin-top:50px;
   }
`
const Dashboard = () => {
  return (
    <SideDiv>
       <header  style={{background:"lightblue",height:"60px",textAlign:"center"}}>
           <div style={{float:"left",display:"flex"}}><label style={{marginLeft:"10px",marginTop:"20px",fontSize:"24px"}}>职工管理系统</label></div>
           <div><a href="/" style={{float:"right",marginTop:"20px",width:"50px",marginRight:"10px"}}>退出</a></div>
          
       </header>
       <div style={{boxSizing:'border-box'}}>
         <div style={{boxSizing:'border-box',background:"#304156",width:"100px",height:"700px",float:"left",marginRight:"10px"}}>
            <ul style={{listStyle:"none",padding:'0',textAlign:"center"}}>
                <li><a href="/dashboard/staff" >职工管理</a></li>
                <li><a href="/dashboard/department">部门管理</a></li>
                <li><a href="/dashboard/position">职位管理</a></li> 
            </ul>
         </div>
         <Outlet />
       </div>
    </SideDiv>
  )
}

export default Dashboard
