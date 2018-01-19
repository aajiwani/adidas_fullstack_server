# Adidas Case Study (Server)
Full stack engineer case study

## A simple REST server:
- [x] Uses memory storage
- [x] Adding an article to the wishlist (POST: ```/Wishlists```)
- [x] Removing a article from the wishlist (DELETE: ```/Wishlists/removeFromWishlist?url={url}```)
- [x] Getting the wishlist (GET: ```/Wishlists```)
- [x] Having test cases covered

## Server Notes:
- All the apis fall under ```{host}/api```
- The above mentioned endpoints are in the format of:
    - ```({HTTP_VERB}: {ENDPOINT})```

## Tech stack:
- LoopBack
- Node.js

## Runnig guide
- Go into the subdirectory
    - ```cd AdidasCaseStudyServer```

- To run the solution
    - ```node .```

- To test the solution
    - ```npm run ci```

### Notes
URL field in the data is used to identify an item from wishlist, hence the same is used to delete the item as well