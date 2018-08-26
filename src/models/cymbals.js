'use strict';

import mongoose, {Schema} from 'mongoose';

const schema = new Schema({

  cymbalType: {
    type: String,
    required: true,
  },
  diameter: {
    type: String,
    uppercase: true,
    required: true,
  },
  finish: {
    type: String,
    required: true,
    default: 'Bright',
  },
  drumSet: {type: Schema.Types.ObjectId, ref: 'DrumSet' },
});

export default mongoose.model('Cymbals', schema);
