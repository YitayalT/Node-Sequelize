exports.getMessages = (req, res) => {
    res.render('message', {
        style: 'user.css'
    });
}