'use-strict';

module.exports = (req, res, next) => {
    res.status(404).json({ err: '404! page not found' });
}