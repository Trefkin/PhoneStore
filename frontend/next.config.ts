

const nextConfig = {
  
      images: {
     remotePatterns: [
       {
         protocol: "https",
         hostname: "frankfurt.apollo.olxcdn.com",
         pathname: "/**",
        },
        {
         protocol: "https",
         hostname: "images.samsung.com",
         pathname: "/**",
       },
      ]
}
}

module.exports = nextConfig;