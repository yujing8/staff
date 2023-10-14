const prisma = require('./client');
const express = require('express');
const router = express.Router();
router.use(express.json());
//查询职位信息
router.get('/position/query/:name', async (req, res) => {
    try {
       const positions= await prisma.position.findMany({
         where: {
            name: {
              contains: req.params.name
            }
          }
        });
        res.send({ code: 200, data:positions  });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//删除职位信息
router.get('/position/delete/:id', async (req, res) => {
    try {
        await prisma.position.delete({
            where: {
                id: +req.params.id
            }
        });
        res.send({ code: 200, data: "删除成功" });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//修改职位信息
router.post('/position/update', async (req, res) => {

    try {
        const position = await prisma.position.update({
            where: {
                id:req.body.id
            },
            data: req.body
        })
        res.send({ code: 200, data: position });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//新增职位信息
router.post('/position/add', async (req, res) => {
    try {
        const position = await prisma.position.create({
            data: req.body
        })
        res.send({ code: 200, data: position });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});
//获取所有职位信息
router.get('/position/list', async (req, res) => {

    try {
        const positions = await prisma.position.findMany();
        res.send({ code: 200, data: positions });
    } catch (error) {
        res.send({ code: 400, data: error })
    }
});

//获取职位名称
router.get('/position/name', async(req, res) => {
    try {
     const positions = await prisma.position.findMany({
         select:{
             name:true
         }
     })
     res.send({ code: 200, data: positions })
    } catch (error) {
     res.send({ code: 404, data: []})
    }
     
 });

module.exports = router;