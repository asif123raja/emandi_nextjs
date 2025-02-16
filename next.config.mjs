// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: [ "global.dastgyr.com","images.squarespace-cdn.com","devolas.com.au","www.bigbasket.com" ,"www.fruitsmith.com","www.specialfruit.com","images-prod.healthline.com","www.fitterfly.com","images.immediate.co.uk","www.onceuponachef.com","www.liveorganic.co.in", "www.health.com","nativeindianorganics.com" ,"encrypted-tbn0.gstatic.com", "www.thespruceeats.com","aramgarhorchards.com","blog.lexmed.com","www.veggycation.com.au","upload.wikimedia.org","www.spotlessfruits.com","cdn.shopaccino.com","www.robinage.com","impro.usercontent.one","seed2plant.in","images.everydayhealth.com","nutritionfacts.org","luluindia-prod-assets.s3.ap-south-1.amazonaws.com","www.google.com","res.cloudinary.com",'example.com','resize.indiatvnews.com','www.shutterstock.com','organicbazar.net','t4.ftcdn.net',"images.moneycontrol.com","freerangestock.com","www.jiomart.com","domf5oio6qrcr.cloudfront.net","d3awvtnmmsvyot.cloudfront.net","m.media-amazon.com","www.allthatgrows.in","rukminim2.flixcart.com","organicmandya.com"], // Allow images from this domain
//     },
//   };
  
//   export default nextConfig;
  
/** @type {import('next').NextConfig} */
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "global.dastgyr.com",
      "images.squarespace-cdn.com",
      "devolas.com.au",
      "www.bigbasket.com",
      "www.fruitsmith.com",
      "www.specialfruit.com",
      "images-prod.healthline.com",
      "www.fitterfly.com",
      "images.immediate.co.uk",
      "www.onceuponachef.com",
      "www.liveorganic.co.in",
      "www.health.com",
      "nativeindianorganics.com",
      "encrypted-tbn0.gstatic.com",
      "www.thespruceeats.com",
      "aramgarhorchards.com",
      "blog.lexmed.com",
      "www.veggycation.com.au",
      "upload.wikimedia.org",
      "www.spotlessfruits.com",
      "cdn.shopaccino.com",
      "www.robinage.com",
      "impro.usercontent.one",
      "seed2plant.in",
      "images.everydayhealth.com",
      "nutritionfacts.org",
      "luluindia-prod-assets.s3.ap-south-1.amazonaws.com",
      "www.google.com",
      "res.cloudinary.com",
      "example.com",
      "resize.indiatvnews.com",
      "www.shutterstock.com",
      "organicbazar.net",
      "t4.ftcdn.net",
      "images.moneycontrol.com",
      "freerangestock.com",
      "www.jiomart.com",
      "domf5oio6qrcr.cloudfront.net",
      "d3awvtnmmsvyot.cloudfront.net",
      "m.media-amazon.com",
      "www.allthatgrows.in",
      "rukminim2.flixcart.com",
      "organicmandya.com",
    ],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  output: process.env.VERCEL_ENV ? "standalone" : undefined,
};

export default nextConfig;
