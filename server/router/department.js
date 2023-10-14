const prisma = require('./client');
const express = require('express');
const router = express.Router();
router.use(express.json());

//查询部门信息
router.get('/department/query/:name', async (req, res) => {
    try {
       const departments= await prisma.department.findMany({
         where: {
            name: {
              contains: req.params.name
            }
          }
        });
        res.send({ code: 200, data:departments  });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//删除部门信息
router.get('/department/delete/:id', async (req, res) => {
    try {
        await prisma.department.delete({
            where: {
                id: +req.params.id
            }
        });
        res.send({ code: 200, data: "删除成功" });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//修改部门信息
router.post('/department/update', async (req, res) => {

    try {
        const department = await prisma.department.update({
            where: {
                id:req.body.id
            },
            data: req.body
        })
        res.send({ code: 200, data: department });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//新增部门信息
router.post('/department/add', async (req, res) => {
    try {
        const department = await prisma.department.create({
            data: req.body
        })
        res.send({ code: 200, data: department });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});
//获取所有部门信息
router.get('/department/list', async (req, res) => {

    try {
        const departments = await prisma.department.findMany();
        res.send({ code: 200, data: departments });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//获取部门名称
router.get('/department/name', async(req, res) => {
    try {
     const departments = await prisma.department.findMany({
         select:{
             name:true
         }
     })
     res.send({ code: 200, data: departments })
    } catch (error) {
     res.send({ code: 404, data: []})
    }
     
 });

module.exports = router;