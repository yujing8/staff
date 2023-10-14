import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bgImg from '../images/bg.png'
import alert from "../utils/Toast"
const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState({
        name: "",
        password: ""
    })
    // 输入框值变化事件
    const changeHandler = e => {
        setUser(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value.trim() }
        })
    }
    //登陆
    const handleClick = async () => {
        if (user.name === "" || user.password === "") {
            alert("请输入完整信息");
            return;
        }
        await axios.post('/api/staff/login', user, {
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((res) => {

            //登陆成功跳转后台
            if (res.data.code === 200) {
                navigate('/dashboard', { replace: true })
            } else {
                alert('用户名或密码错误')
            }
        });
    }
    return (
        <>
            <div style={{ backgroundSize: '100% 100%', backgroundImage: `url(${bgImg})`, height: '900px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ boxSizing: 'border-box', width: '500px', height: '300px', backgroundColor: 'rgba(255,100,50,0.3)', margin: '0 auto', textAlign: 'center' }}>
                    <h2>职工管理系统</h2>
                    <div style={{ marginTop: '10px' }}><label style={{ color: 'orange', fontSize: '18px' }}>账号</label><input style={{ width: '200px', height: '30px' }} type="text" name="name" value={user.name} onChange={changeHandler}></input></div>
                    <div style={{ marginTop: '50px' }}><label style={{ color: 'orange', fontSize: '18px' }}>密码</label><input style={{ width: '200px', height: '30px' }} type="password" name="password" value={user.password} onChange={changeHandler}></input></div>
                    <button style={{marginLeft:'35px', border: 'none', color: 'white', background: 'rgb(22,160,93)', marginTop: '50px', width: '200px', height: '30px', fontSize: '16px' }} onClick={handleClick}>登 陆</button>
                </div>
            </div>
        </>

    )
}

export default Login
