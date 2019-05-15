const Box = require("../models/Box");
const File = require("../models/File");

class FileController{
    async store(req, res){
        // criar arquivo
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        })
        box.files.push(file)

        req.io.sockets.in(box._id).emit("file",file);
        
        await box.save();
        return res.json(file)

    }
}

module.exports = new FileController();