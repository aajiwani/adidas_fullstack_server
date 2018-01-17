"use strict";

const validUrl = require("valid-url");

module.exports = function(Wishlist) {
  Wishlist.validatesPresenceOf("url");
  Wishlist.validatesUniquenessOf("url", {
    message: "url must be unique, while adding items in the wishlist",
  });
  Wishlist.validate(
    "url",
    function(err) {
      if (this.url && this.url.length > 0) {
        if (!validUrl.isUri(this.url)) {
          err();
        }
      }
    },
    {message: "Bad URL supplied"}
  );
  Wishlist.validate(
    "image",
    function(err) {
      if (this.image && this.image.length > 0) {
        if (!validUrl.isUri(this.image)) {
          err();
        }
      }
    },
    {message: "Bad URL supplied"}
  );

  Wishlist.removeByUrl = function(wishlistUrl, cb) {
    console.log(wishlistUrl);
    Wishlist.find({where: {url: wishlistUrl}}, function(err, instance) {
      if (!instance.length) return cb(new Error("No record found!"));
      if (err) return cb(err);
      instance[0].destroy(function(err2) {
        if (err2) return cb(err2);
        var response = "Item deleted successfully";
        cb(null, response);
      });
    });
  };

  Wishlist.remoteMethod("removeByUrl", {
    http: {path: "/removeFromWishlist", verb: "delete", "errorStatus": 400},
    accepts: {arg: "url", type: "string", http: {source: "query"}},
    returns: {arg: "message", type: "string"},
  });
};
