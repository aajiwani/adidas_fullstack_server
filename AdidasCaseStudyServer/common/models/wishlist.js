"use strict";

const validUrl = require("valid-url");

module.exports = function(Wishlist) {
  Wishlist.validatesPresenceOf("url");
  Wishlist.validatesUniquenessOf("url", {
    message: "url must be unique, while adding items in the wishlist"
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
    { message: "Bad URL supplied" }
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
    { message: "Bad URL supplied" }
  );
};
