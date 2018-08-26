'use strict';

import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
  name : String,
  drum: {type: Schema.Types.ObjectId, ref: 'Drums' },
  cymbal: {type: Schema.Types.ObjectId, ref: 'Cymbals' },
});

export default mongoose.model('DrumSet', schema);