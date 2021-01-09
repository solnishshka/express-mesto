module.exports.handleError = (err, req, res) => {
  const id = req.params.cardId || req.params.id;
  if (err.name === 'CastError') {
    res.status(404).send({
      message: `Объект с id: ${id} не найден`,
    });
    return;
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: err.message });
}
