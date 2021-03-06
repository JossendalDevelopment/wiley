function Alert(data) {
    Object.assign(this, Alert.template, data);
}

Object.defineProperty(Alert, 'template', {
    get() {
        return {
            "bbox_height": "",
            "bbox_width": "",
            "bbox_xmin": "",
            "bbox_ymin": "",
            "camera": null,
            "classification_description": null,
            "classified_by": null,
            "id": "",
            "image_filename": "",
            "image_filepath": "",
            "image_height": "",
            "image_width": "",
            "inferenced_classification": "",
            "inferenced_percentage": "",
            "modified_date": null,
            "thumb_filename": "",
            "thumb_filepath": "",
            "thumb_250x250": null,
            "thumb_height": null,
            "thumb_width": null,
            "user_classification": null,
            "video_clip_filepath": null,
            "video_clip_filename": null
        }
    }
});

module.exports = Alert;
