const formatResponse = (res, type, data) => {
    if (type === "error") {
        res.status(500).json({ msg: data });
    } else if (type === "success") {
        res.status(200).json(data);
    }
};

module.exports = formatResponse;