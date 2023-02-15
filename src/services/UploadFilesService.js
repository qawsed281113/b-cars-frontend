import axios from "axios";
class UploadFilesService {
    upload(carId, images) {
        //let formData = new FormData();

        //formData.append("file", file);

        return axios.post("/upload", images, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
    }
}

export default new UploadFilesService();