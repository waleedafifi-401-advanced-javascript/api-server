'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }
    
  /**
     * 
     * @param {String} _id optional for mongo record id
     * @return {*} return record by id if _id !empty else will get all records 
     */
  read(_id) {
    let queryParam = _id ? {
      _id,
    } : {};
    return this.schema.find(queryParam);
  }
    
  create(record) {
    let queryRecord = this.schema(record);
    return queryRecord.save(record);
  }
    
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, {
      new: true,
    });
  }
    
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;