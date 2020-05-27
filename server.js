const express = require("express");
const nunjucks = require("nunjucks");

const videos = require("./data");

const server = express();

server.set("view engine", "njk");
server.use(express.static("public"))

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (request, response) {
    const user_data = {
        avatar_url: "https://avatars0.githubusercontent.com/u/56899860?s=400&u=0b6f31013827c098b3f0d9d5ba20536929d71e71&v=4",
        name: "Yuri Rennan",
        role: "Estudante na FAFIC",
        description: 'Estudante na <a href="https://fescfafic.edu.br/" target="_blank">FAFIC</a> aprendendo javascript para se tornar fullstack',
        links: [
            { name: "Github", url: "https://github.com/yurirennan/" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/yuri-campos/" }
        ]
    }

    return response.render("sobre", { user_data });
})

server.get("/portifolio", function (request, response) {
    return response.render("portifolio", { items: videos });
})

server.get("/video", function (request, response) {
    const id = request.query.id;

    const video = videos.find(function (video) {
        if (video.id == id) {
            return true
        }
    })

    if (!video) {
        return response.status(404).send("Video not Found!")
    }


    return response.render("video", { item: video })

})

server.listen(5000, function () {
    console.log("Server is running");
})
