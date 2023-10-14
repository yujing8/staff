const prisma = require('./client');
const express = require('express');
const router = express.Router();
router.use(express.json());
//查询职工信息
router.get('/staff/query/:name', async (req, res) => {
    try {
       const staffs= await prisma.staff.findMany({
         where: {
            name: {
              contains: req.params.name
            }
          }
        });
        res.send({ code: 200, data:staffs  });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//删除职工信息
router.get('/staff/delete/:id', async (req, res) => {
    try {
        await prisma.staff.delete({
            where: {
                id: +req.params.id
            }
        });
        res.send({ code: 200, data: "删除成功" });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//修改职工信息
router.post('/staff/update', async (req, res) => {

    try {
        const staff = await prisma.staff.update({
            where: {
                id:req.body.id
            },
            data: req.body
        })
        res.send({ code: 200, data: staff });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//新增职工信息
router.post('/staff/add', async (req, res) => {
    try {
        const staff = await prisma.staff.create({
            data: req.body
        })
        res.send({ code: 200, data: staff });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});
//获取所有职工信息
router.get('/staff/list', async (req, res) => {

    try {
        const staffs = await prisma.staff.findMany();
        res.send({ code: 200, data: staffs });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});
//判断是否为系统管理员
router.post("/staff/login", async (req, res) => {
    try {
        const { name, password } = req.body
        const staff = await prisma.staff.findFirst({
            where: {
                name: name,
                password: password,
                position:'系统管理员'
            }
        });
        if(staff !==null){
            res.send({ code: 200, data: staff })
        }else{
            res.send({ code: 404, data: {msg:'用户名不存在或密码错误'} })
        }
    } catch (error) {
         res.send({ code: 404, data: error })
    }
})
module.exports = router;