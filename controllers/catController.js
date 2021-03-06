'use strict';

const catModel = require('../models/catModel');
const thumbNail = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');

// const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  await res.json(cats);
};

const cat_create_post = async (req, res) => {
 try {
      // make thumbnail
      await thumbNail.makeThumbnail(
          req.file.path,
          'thumbnails/' + req.file.filename,
          {width:160, height:160});
      // get coordinates
      const coords = await imageMeta.getCoordinates(req.file.path);
      console.log('coords', coords);
      // add to db
      const params = [
        req.body.name,
        req.body.age,
        req.body.weight,
        req.body.owner,
        req.file.filename,
        coords,
      ];
      const cat = await catModel.addCat(params);
      await res.json(cat);
    }
    catch (e) {
      console.log('exif error', e);
      res.status(400).json({message: 'error'});
    }
  };





const cat_get = async (req, res) => {
  const params = [req.params.id];
  const cat = await catModel.getCat(params);
  await res.json(cat[0]);
};

const update_cat = async (req, res) => {
  const params = [
      req.body.name,
      req.body.age,
      req.body.weight,
      req.body.owner,
      req.body.id,
  ]
  const response = await catModel.updateCat(params);
  await res.json(response);
};
const delete_cat = async (req, res) => {
  const params = [req.params.id];
  const cat = await catModel.deleteCat(params);
  await  res.json(cat);
};
module.exports = {
  cat_list_get,
  cat_create_post,
  cat_get,
  update_cat,
  delete_cat,
};
