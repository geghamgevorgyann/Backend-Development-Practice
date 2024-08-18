import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
    secret: 'nsandxsndkjsamnkjncmesankdmw,nscakqwdmnskjandckjewmsancwemnsckwmensdckmewsancqwndklxnejcwsm,nd',
    cookie: { maxAge: 60000 }}))
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    if(req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.send(`Views: ${req.session.views}`);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});