if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb://Mario:mario27@ds129811.mlab.com:29811/vidjot-prod-mq'}
} else {
    module.exports = {mongoURI: 'mongodb://localhost/vidjot-dev'}
}