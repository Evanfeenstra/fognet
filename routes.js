const routes = (module.exports = require("next-routes")())

routes.add("index", "/").add("articles", "/article/:slug").add("faqs")
