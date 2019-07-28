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
    bbox_xmin TEXT,
    bbox_ymin TEXT,
    bbox_width TEXT,
    bbox_height TEXT,
    camera TEXT,
    inferenced_classification TEXT,
    inferenced_percentage TEXT,
    user_classification TEXT,
    classification_description TEXT,
    classified_by TEXT,
    modified_date TIMESTAMPTZ,
    thumb_250x250 BYTEA,
    thumb_filename TEXT,
    thumb_filepath TEXT
);
