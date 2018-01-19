"use strict";

var expect = require("chai").expect;
var supertest = require("supertest");
var api = supertest("http://localhost:3000/api");

describe("Wishlist", function() {
  it("should get all 0 items in wishlist", function(done) {
    api
      .get("/Wishlists")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var clients = res.body;

        expect(clients.length).to.equal(0);
        done();
      });
  });

  it("should give error while posting an item to wishlist with invalid url", function(done) {
    api
      .post("/Wishlists")
      .send({
        name: "An Arbitary Item",
        image: "http://realimageurl.com/img.jpg",
        url: "invalid",
        rating: 2,
        reviews: 20,
        price: "$30",
        subName: "An Arbitary Item Sub Name"
      })
      .expect(422)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var errBody = res.body;
        expect(errBody).to.have.property("error");
        expect(errBody.error).to.have.property("details");
        expect(errBody.error).to.have.property("statusCode", 422);
        expect(errBody.error).to.have.property("name", "ValidationError");
        expect(errBody.error.details).to.have.deep.property("messages", {
          url: ["Bad URL supplied"]
        });
        return done();
      });
  });

  it("should give error while posting an item to wishlist with invalid image url", function(done) {
    api
      .post("/Wishlists")
      .send({
        name: "An Arbitary Item",
        image: "invalid",
        url: "http://realimageurl.com/img.jpg",
        rating: 2,
        reviews: 20,
        price: "$30",
        subName: "An Arbitary Item Sub Name"
      })
      .expect(422)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var errBody = res.body;
        expect(errBody).to.have.property("error");
        expect(errBody.error).to.have.property("details");
        expect(errBody.error).to.have.property("statusCode", 422);
        expect(errBody.error).to.have.property("name", "ValidationError");
        expect(errBody.error.details).to.have.deep.property("messages", {
          image: ["Bad URL supplied"]
        });
        return done();
      });
  });

  it("should give error while posting an item to wishlist without url", function(done) {
    api
      .post("/Wishlists")
      .send({
        name: "An Arbitary Item",
        rating: 2,
        reviews: 20,
        price: "$30",
        subName: "An Arbitary Item Sub Name"
      })
      .expect(422)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var errBody = res.body;
        expect(errBody).to.have.property("error");
        expect(errBody.error).to.have.property("details");
        expect(errBody.error).to.have.property("statusCode", 422);
        expect(errBody.error).to.have.property("name", "ValidationError");
        expect(errBody.error.details).to.have.deep.property("messages", {
          url: ["can't be blank", "can't be blank"]
        });
        return done();
      });
  });

  it("should add 1 item to wishlist successfully", function(done) {
    api
      .post("/Wishlists")
      .send({
        name: "An Arbitary Item",
        rating: 2,
        reviews: 20,
        price: "$30",
        subName: "An Arbitary Item Sub Name",
        url: "http://itsarealurl.com"
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var wishlist = res.body;
        expect(wishlist).to.have.property("name", "An Arbitary Item");
        expect(wishlist).to.have.property("rating", 2);
        expect(wishlist).to.have.property("reviews", 20);
        expect(wishlist).to.have.property("price", "$30");
        expect(wishlist).to.have.property(
          "subName",
          "An Arbitary Item Sub Name"
        );
        expect(wishlist).to.have.property("url", "http://itsarealurl.com");
        expect(wishlist).to.have.property("id");
        return done();
      });
  });

  it('should delete item from wishlist for url "http://itsarealurl.com"', function(done) {
    api
      .delete(
        "/Wishlists/removeFromWishlist?url=" +
          encodeURIComponent("http://itsarealurl.com")
      )
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        var wishlist = res.body;
        expect(wishlist).to.have.property(
          "message",
          "Item deleted successfully"
        );
        return done();
      });
  });
});
