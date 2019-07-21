CREATE TABLE test
(
    id INT PRIMARY KEY,
    messages VARCHAR (50) UNIQUE NOT NULL
);

INSERT INTO test
    (id, messages)
VALUES(1000, 'Youve made a successful query');

CREATE TABLE events
(
    id INT PRIMARY    KEY NOT NULL,
    event_id TEXT,
    image_filepath TEXT NOT NULL,
    image_filename TEXT NOT NULL,
    image_width INT NOT NULL,
    image_height INT NOT NULL,
    bbox_xmin DECIMAL,
    bbox_ymin DECIMAL,
    bbox_width DECIMAL,
    bbox_height DECIMAL,
    camera TEXT,
    inferenced_classification TEXT,
    inferenced_percentage INT,
    user_classification TEXT,
    classification_description TEXT,
    classified_by TEXT,
    modified_date TIMESTAMPTZ,
    thumb_250x250 TEXT
);
