const dbUrl = 'mongodb://user:user@ds123124.mlab.com:23124/easy-rest';
const mongoose = require('mongoose');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = Router();

mongoose.connect(dbUrl, {
    useNewUrlParser: true
});

const Student = mongoose.model('student', {
    id: Number,
    name: String
});

const student1 = new Student({
    id: 1,
    name: 'Student 01'
});
const student2 = new Student({
    id: 2,
    name: 'Student 02 / Novo'
});

router.get("/users", async (ctx) => {
    // student2.save().then(() => console.log('meow'));
    ctx.body = await Student.find({}).exec()
});

router.get("/users/:id", async (ctx) => {
    let params = {
        id: ctx.params.id
    }
    ctx.body = await Student.find().where(params).exec()
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);