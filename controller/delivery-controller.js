exports.getDelivery = (req, res) => {
    res.render('delivery', {
        style: 'user.css',
        title: 'delivery'
    });
}