const { createServer } = require('node:http');
const { existsSync, mkdirSync, rename, createReadStream } = require('node:fs');
const { join, extname } = require('node:path');
const { formidable } = require('formidable');

const PORT = 3000;
const uploadDir = join('uploads');

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
}

const server = createServer(async (req, res) => {
    if (req.method === 'POST' && req.url.startsWith('/upload')) {
        const form = formidable({
            uploadDir: uploadDir,
            keepExtensions: true,
            maxFileSize: 200 * 1024 * 1024,
        });
        form.parse(req, (err, _, files) => {
            if (err) {
                res.writeHead(500, { "content-type": "application/json" });
                return res.end(JSON.stringify({
                    statusCode: 500,
                    error: {
                        message: err.message | 'Error on uploading file'
                    }
                }));
            }
            const file = files.file?.[0];
            const fileName = `${Date.now()}_${file.originalFilename}`;
            const newFilePath = join(uploadDir, fileName);
            rename(file.filepath, newFilePath, (err) => {
                if (err) {
                    res.writeHead(500, { "content-type": "application/json" });
                    return res.end(JSON.stringify({
                        statusCode: 500,
                        error: {
                            message: err.message | 'Error on renaming file'
                        }
                    }));
                }
                res.writeHead(201, { "content-type": "application/json" });
                return res.end(JSON.stringify({
                    statusCode: 201,
                    message: 'success',
                    data: fileName
                }));
            });
        });
    }

    else if (req.method === 'GET' && req.url.startsWith('/file/')) {
        const fileName = decodeURIComponent(req.url.replace('/file/', ''));
        const filePath = join(uploadDir, fileName);
        if (!existsSync(filePath)) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({
                statusCode: 404,
                error: {
                    message: 'File not found'
                }
            }));
        }
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.pdf': 'application/pdf',
            '.txt': 'text/plain',
            '.zip': 'application/zip',
            '.mp4': 'video/mp4',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.json': 'application/json',
            '.mp3': 'audio/mp3'
        };
        const ext = extname(fileName).toLowerCase();
        const contentType = mimeTypes[ext] || 'application/octect-stream';
        res.writeHead(200, { "content-type": contentType });
        const strem = createReadStream(filePath);
        strem.pipe(res);
    }

    else {
        res.writeHead(404, { "content-type": "application/json" });
        return res.end(JSON.stringify({
            statusCode: 404,
            error: {
                message: 'Page not found'
            }
        }));
    }
});

server.listen(PORT, () => console.log('Server running on port', PORT));
