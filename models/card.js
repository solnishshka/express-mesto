const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          const regex = /https?:\/\/w?.?[a-z0-9A-Z_.-]+[a-zA-Z0-9-._~:\/?#[\]@!$&'%()*+,;=]+/gi;
          return regex.test(v);
        },
        message: (props) => `${props.value} - некорректный URL!`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model('card', cardSchema);
